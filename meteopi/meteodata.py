
###################################################
#                                                 #
#     MeteoPI                                     #
#     by F.C. - sn3ik@hotmail.com                 #
#                                                 #
#     Thanks to Sint Wind PI & Tonino Tarsi       #
#                                                 #
###################################################


"""MeteoData class"""

import time
import sqlite3
import datetime
import TTLib
import config
import math
import os
import globalvars
from colorama import Fore, Back, Style
import sun

def log(message) :
    print (datetime.datetime.now().strftime("[%d/%m/%Y-%H:%M:%S] [METEODATA____] -") , message)

def  cloud_base_altitude(temp,dew_point,station_altitude):
    if (temp == None or dew_point == None or station_altitude == None):
        return None
    delta = (((temp-dew_point)*1.8/4.5 ) * 1000 )
    return ( delta + (station_altitude * 3.2808) ) / 3.2808

def dew_point(temp, hum):
    """Compute dew point, using formula from
    http://en.wikipedia.org/wiki/Dew_point.

    """
    if temp == None or hum == None:
        return None
    a = 17.27
    b = 237.7
    if (hum == 0):
        return None
    gamma = ((a * temp) / (b + temp)) + math.log(float(hum) / 100.0)
    return (b * gamma) / (a - gamma)

def wind_chill(temp, wind): 
    """Compute wind chill, using formula from
    http://en.wikipedia.org/wiki/wind_chill
    """
    if temp == None or wind == None:
        return None
    #wind_kph = wind * 3.6
    wind_kph = wind 
    if wind_kph <= 4.8 or temp > 10.0:
        return temp 
    return min(13.12 + (temp * 0.6215) + (((0.3965 * temp) - 11.37) * (wind_kph ** 0.16)), temp)

def metar(): 
    weather = ""
    if (globalvars.meteo_data.cloud_base_altitude != None and globalvars.meteo_data.rain_rate_1h != None):
        if (  globalvars.meteo_data.rain_rate_1h > 0 and globalvars.meteo_data.cloud_base_altitude < 600):
           weather = "RA" 
        elif ( globalvars.meteo_data.cloud_base_altitude < 600):
                 weather = "OVC" 
        elif ( globalvars.meteo_data.cloud_base_altitude > 600 and globalvars.meteo_data.cloud_base_altitude < 900):
                 weather = "FEW" 
        elif ( globalvars.meteo_data.cloud_base_altitude > 900 and globalvars.meteo_data.cloud_base_altitude < 1000): 
                 weather = "SCT"
        else:
           weather = "SKC"
    return weather

def apparent_temp(temp, rh, wind):
    """Compute apparent temperature (real feel), using formula from
    http://www.bom.gov.au/info/thermal_stress/
    """
    if ( temp == None or rh == None or wind == None ):
        return None
    wind_ms = wind / 3.6
    if temp == None or rh == None or wind == None:
        return None
    vap_press = (float(rh) / 100.0) * 6.105 * math.exp(
        17.27 * temp / (237.7 + temp))
    return temp + (0.33 * vap_press) - (0.70 * wind_ms) - 4.00

class MeteoData(object):

    def __init__(self,cfg=None):

        self.cfg = cfg
        self.last_measure_time = None
        self.previous_measure_time = None
        self.wind_trend = None
        self.pressure_trend = None
        self.idx = None
        self.status = -9999
        self.wind_dir = None
        self.wind_ave = None
        self.wind_gust = None
        self.temp_out = None
        self.hum_out = None
        self.abs_pressure = None
        self.rel_pressure = None
        self.rain = None
        self.the_real_rain = None
        self.rain_delta = None
        self.rain_rate = None
        self.rain_rate_24h = None
        self.rain_rate_1h= None
        self.temp_in = None
        self.hum_in = None
        self.uv = None
        self.illuminance = None
        self.lux = None
        self.luxfull = None
        self.ir = None
        self.pm25 = None
        self.pm10 = None
        self.pm25_max = None
        self.pm10_max = None

        if ( cfg != None):
            self.rb_wind_dir = TTLib.RingBuffer(cfg.number_of_measure_for_wind_dir_average)
            self.rb_wind_trend = TTLib.RingBuffer(cfg.number_of_measure_for_wind_trend)
    
        self.wind_dir_code = None
        self.wind_chill = None
        self.temp_apparent = None
        self.dew_point = None
        self.cloud_base_altitude = None
        self.previous_rain = None
        self.wind_dir_ave = None
    
        if ( not self.getLastTodayFromDB() ):
            self.ResetStatistic()
            
        self.timetoupload = None
        self.interval = None

    def newday(self):
        if ( self.previous_measure_time == None ):
            self.previous_measure_time = self.last_measure_time
            return True
        elif (  self.last_measure_time != None and ( datetime.datetime.strftime(self.last_measure_time,'%m/%d/%Y') !=
            datetime.datetime.strftime(self.previous_measure_time,'%m/%d/%Y') ) ) :
            self.previous_rain = self.rain
            return True
        else:
            return False

    def ResetStatistic(self):

        self.winDayMin = None
        self.winDayMax = None
        self.winDayGustMin = None
        self.winDayGustMax = None
        self.TempInMin = None
        self.TempInMax = None
        self.TempOutMin = None
        self.TempOutMax = None
        self.UmInMin = None
        self.UmInMax = None
        self.UmOutMin = None
        self.UmOutMax = None
        self.PressureMin = None
        self.PressureMax = None
        self.previous_measure_time = None
        self.previous_rain = self.rain

    def CalcStatistics(self):

        while globalvars.bAnswering:
            #log("DEBUG ... waiting for Calculating Meteo data and statistics")
            time.sleep(1)

        #log("Calculating Meteo data and statistics")

        ############## Calucelated parameters ##################################

        self.wind_chill = wind_chill(self.temp_out, self.wind_ave)
        self.temp_apparent = apparent_temp(self.temp_out, self.hum_out, self.wind_ave)
        self.dew_point = dew_point(self.temp_out, self.hum_out)
        self.cloud_base_altitude = cloud_base_altitude(self.temp_out,self.dew_point,self.cfg.location_altitude)

        if ( self.cfg.wind_speed_units == "knots"):
            self.wind_ave = self.wind_ave * 0.539956803456
            self.wind_gust = self.wind_gust * 0.539956803456

        self.rb_wind_trend.append(self.wind_ave)
        self.wind_trend = self.rb_wind_trend.getTrend()

        if ( self.cloud_base_altitude != None) :
            self.cloud_base_altitude = self.cloud_base_altitude * self.cfg.cloudbase_calib

        if ( self.abs_pressure != None and self.abs_pressure != 0.0):
            if ( self.cfg.location_altitude != 0 ):
                p0 = (self.abs_pressure*100) / pow( 1 - (0.225577000e-4*self.cfg.location_altitude ),5.25588 )
            else:
                p0 = self.abs_pressure*100
            self.rel_pressure = float(p0/100 )

        if ( self.rain != None and self.previous_rain != None and self.previous_measure_time != None ):
            self.rain_rate = self.rain - self.previous_rain

        ########################################################################

        if ( self.newday() ):
            self.ResetStatistic()
        else:
            if ( self.winDayMin is None or self.wind_ave is None or self.wind_ave < self.winDayMin ):
                self.winDayMin  = self.wind_ave
            if ( self.winDayMax is None or self.wind_ave is None or self.wind_ave > self.winDayMax ) :
                self.winDayMax  = self.wind_ave
            if ( self.winDayGustMin is None or self.wind_gust is None or self.wind_gust < self.winDayGustMin ) :
                self.winDayGustMin  = self.wind_gust
            if ( self.winDayGustMax is None or self.wind_gust is None or self.wind_gust > self.winDayGustMax ) :
                self.winDayGustMax  = self.wind_gust
            if ( self.TempOutMin is None or self.temp_out is None or self.temp_out < self.TempOutMin ) :
                self.TempOutMin  = self.temp_out
            if ( self.TempOutMax is None or self.temp_out is None or self.temp_out > self.TempOutMax ) :
                self.TempOutMax  = self.temp_out
            if ( self.TempInMin is None or self.temp_in is None or self.temp_in < self.TempInMin ) :
                self.TempInMin  = self.temp_in
            if ( self.TempInMax is None or self.temp_in is None or self.temp_in > self.TempInMax ) :
                self.TempInMax  = self.temp_in
            if ( self.UmInMin is None or self.hum_in is None or self.hum_in < self.UmInMin ) :
                self.UmInMin  = self.hum_in
            if ( self.UmInMax is None or self.hum_in is None or self.hum_in > self.UmInMax ) :
                self.UmInMax  = self.hum_in
            if ( self.UmOutMin is None or self.hum_out is None or self.hum_out < self.UmOutMin ) :
                self.UmOutMin  = self.hum_out
            if ( self.UmOutMax is None or self.hum_out is None or self.hum_out > self.UmOutMax ) :
                self.UmOutMax  = self.hum_out
            if ( self.rel_pressure != None ) :
                if ( self.PressureMin is None or self.rel_pressure is None or self.rel_pressure < self.PressureMin ) :
                    if ( self.rel_pressure > 940) :
                        self.PressureMin  = self.rel_pressure
                if ( self.PressureMax is None or self.rel_pressure is None or self.rel_pressure > self.PressureMax ) :
                    self.PressureMax  = self.rel_pressure
            if ( self.pm25_max is None or self.pm25 is None or self.pm25 > self.pm25_max ) :
                self.pm25_max = self.pm25
            if ( self.pm10_max is None or self.pm10 is None or self.pm10 > self.pm10_max ) :
                self.pm10_max = self.pm10

        self.rb_wind_dir.append(self.wind_dir)
        self.wind_dir_ave = self.rb_wind_dir.getMeanDir()
        self.previous_measure_time = self.last_measure_time
        self.rain_now = "No"

        # Rain 24h - rain 1h - pressure_trend
        if ( self.rain != None or self.rel_pressure != None):
            conn = sqlite3.connect('db/meteopi.s3db',200)    
            dbCursor = conn.cursor()
            dbCursor.execute("SELECT * FROM METEO where datetime(TIMESTAMP_LOCAL) > datetime('now','-1 day','localtime') order by rowid asc limit 1")
            data = dbCursor.fetchall()
            if ( len(data) == 1):
                therain = (data[0][9])
                self.the_real_rain = therain
                if (therain != None ) :    
                    self.rain_rate_24h = self.rain - therain
                    #log("Rain24h :" + str(datetime.datetime.strptime(data[0][0],"%Y-%m-%d %H:%M:%S.%f")) + " " + str(therain) + " Current " +  str(self.rain))
            
            dbCursor.execute("SELECT * FROM METEO where datetime(TIMESTAMP_LOCAL) > datetime('now','-1 hour','localtime') order by rowid asc limit 1")
            data = dbCursor.fetchall()
            if ( len(data) == 1):
                therain = (data[0][9])  
                if (therain != None and self.rain != None) : 
                    self.rain_rate_1h = self.rain - therain  
                thepress= (data[0][7]) 
                if ( thepress != None and self.rel_pressure != None):
                    self.pressure_trend = self.rel_pressure - thepress
                #log("Rain1h :" + str(datetime.datetime.strptime(data[0][0],"%Y-%m-%d %H:%M:%S.%f")) + " " + str(therain) + " Current " +  str(self.rain))

            dbCursor.execute("SELECT * FROM METEO where date(TIMESTAMP_LOCAL) = date('now','localtime') order by rowid desc limit 1")
            data = dbCursor.fetchall()
            if ( len(data) == 1):
                therain = (data[0][9])  
                self.rain_delta = therain
                #log("Rain: %.1f" % self.rain + " Delta: %.1f" % self.rain_delta)
                if (self.rain_delta != self.rain) : 
                    self.rain_now = "Yes"
                
            if conn:        
                conn.close()
                

    def LogDataToDB(self):

            while globalvars.bAnswering:
                time.sleep(1)

            log("Update Database")
            if ( self.last_measure_time == None ):
                return

            conn = sqlite3.connect('db/meteopi.s3db',200)
            dbCursor = conn.cursor()
            dbCursor.execute("insert into METEO(TIMESTAMP_LOCAL,TIMESTAMP_IDX,WINDIR_CODE,WIND_DIR,WIND_AVE,WIND_GUST,TEMP,PRESSURE,HUM,RAIN,RAIN_RATE,TEMPINT,HUMINT,WIND_CHILL,TEMP_APPARENT,DEW_POINT,UV_INDEX,SOLAR_RAD,WIND_DAY_MIN,WIND_DAY_MAX,WIND_DAY_GUST_MIN ,WIND_DAY_GUST_MAX ,TEMP_OUT_DAY_MIN ,TEMP_OUT_DAY_MAX,TEMP_IN_DAY_MIN ,TEMP_IN_DAY_MAX ,HUM_OUT_DAY_MIN ,HUM_OUT_DAY_MAX ,HUM_IN_DAY_MIN ,HUM_IN_DAY_MAX ,PRESSURE_DAY_MIN ,PRESSURE_DAY_MAX,WIND_DIR_AVE,PM2,PM10,RAIN_TOT,RAIN_1H,RAIN_24H) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", (self.last_measure_time,self.last_measure_time,self.wind_dir_code,self.wind_dir,self.wind_ave,self.wind_gust,self.temp_out,self.rel_pressure,self.hum_out,self.rain,self.rain_rate,self.temp_in,self.hum_in,self.wind_chill,self.temp_apparent,self.dew_point,self.uv,self.illuminance,self.winDayMin,self.winDayMax,self.winDayGustMin,self.winDayGustMax,self.TempOutMin,self.TempOutMax,self.TempInMin,self.TempInMax,self.UmOutMin,self.UmOutMax,self.UmInMin,self.UmInMax,self.PressureMin,self.PressureMax,self.wind_dir_ave, self.pm25, self.pm10, self.the_real_rain, self.rain_rate_1h, self.rain_rate_24h))
            conn.commit()
            conn.close()

            #usa il datbase interno
            if ( self.cfg.logdata_internal == False ):
                #log("Delete old data to Database")
                conn_del = sqlite3.connect('db/meteopi.s3db',200)
                dbCursor_del = conn_del.cursor()
                dbCursor_del.execute("DELETE FROM METEO where datetime(TIMESTAMP_LOCAL) < datetime('now','-2 day','localtime')")
                conn_del.commit()
                conn_del.close()
    
            toupload = globalvars.meteo_data.interval-(datetime.datetime.now()-globalvars.meteo_data.timetoupload).seconds
            log("Upload data to server in %s seconds" % toupload)
            
            s=sun.sun(lat=self.cfg.location_latitude,long=self.cfg.location_longitude)
            log('Sunrise: '+str(s.sunrise())+' Solarnoon: '+str(s.solarnoon())+' Sunset: '+str(s.sunset()))
        
            output = ""
            output = output + "Processed data:\n"
            output = output + "-----------------------------------------------------------------------------------------------------------\n"
            
            #output = output + "{:<15} {:<18} {:<18} {:<18}".format('Ephemeris','Sunrise: '+str(s.sunrise()),'Max: '+str(s.solarnoon()),'Sunset: '+str(s.sunset()))
            #output = output + "\n"
            
            output = output + "{:<15} {:<18} {:<18} {:<18} {:<18} {:<18}".format('Wind',str(self.wind_dir_code) +
            ' - ' + str(self.wind_ave) + ' km','Gust: ' + str(self.wind_gust) + ' km',
            'Min: ' + str(self.winDayMin) + ' km','Max: '+str(self.winDayMax) + ' km', 'Trend: '+str(self.wind_trend))
            output = output + "\n"
            
            if( self.temp_out != None and self.temp_in != None and self.TempOutMin != None and self.TempInMin != None):
                output = output + "{:<15} {:<18} {:<18} {:<18} {:<18}".format('Temperature','Out: %.1f' % self.temp_out + ' C',
                'In: %.1f' % self.temp_in + ' C','Min: %.1f' % self.TempOutMin + ' C','Max: %.1f' % self.TempOutMax + ' C')
                output = output + "\n"

            elif( self.temp_out != None and self.TempOutMin != None and self.TempOutMax != None):
                output = output + "{:<15} {:<18} {:<18} {:<18}".format('Temperature','Out: %.1f' % self.temp_out + ' C',
                'Min: %.1f' % self.TempOutMin + ' C','Max: %.1f' % self.TempOutMax + ' C')
                output = output + "\n"
            
            if( self.hum_out != None and self.hum_in != None and self.UmOutMin != None and self.UmOutMax != None ):
                output = output + "{:<15} {:<18} {:<18} {:<18} {:<18}".format('Humidity','Out: %.1f' % self.hum_out + ' %',
                'In: %.1f' % self.hum_in + ' %','Min: %.1f' % self.UmOutMin + ' %','Max: %.1f' % self.UmOutMax + ' %')
                output = output + "\n"
            
            if( self.rel_pressure != None and self.PressureMin != None and self.PressureMax != None  ):
                output = output + "{:<15} {:<18} {:<18} {:<18} {:<18}".format('Pressure','Rel: %d' % self.rel_pressure + ' hPa','Abs: %d' % self.abs_pressure + ' hPa',
                'Min: %d' % self.PressureMin + ' hPa','Max: %d' % self.PressureMax + ' hPa')
                output = output + "\n"
            
            if( self.rain_rate_1h != None and self.rain_rate_24h != None and self.rain_rate != None and self.rain != None ):
                output = output + "{:<15} {:<18} {:<18} {:<18} {:<18} {:<18}".format('Rain','Now: ' + str(self.rain_now),'1h: %.1f' % self.rain_rate_1h + ' mm','24h: %.1f' % self.rain_rate_24h + ' mm',
                'Day: %.1f' % self.rain_rate + ' mm','Tot: %.1f' % self.rain + ' mm')
                output = output + "\n"
            
            if( self.cloud_base_altitude != None ):
                output = output + "{:<15} {:<18} {:<18}".format('Cloud','Base: %d' % self.cloud_base_altitude + ' meter',
                'Cond: ' + str(metar()))
                output = output + "\n"        
            
            if( self.uv != None and  self.illuminance != None):
                output = output + "{:<15} {:<18} {:<18} {:<18}".format('Light','UV: %d' % self.uv,'Lux: %.1f' % self.illuminance,
                'Watts/m: %.1f' % (self.illuminance*0.0079))
                output = output + "\n"  
            
            if( self.pm25 != None and self.pm10 != None and self.pm25_max != None and self.pm10_max != None ):
                output = output + "{:<15} {:<18} {:<18} {:<18} {:<18}".format('PM','2.5: %.1f' % self.pm25 + ' um','10: %.1f' % self.pm10  + ' um',
                '2.5 Max: %.1f' % self.pm25_max  + ' um','10 Max: %.1f' % self.pm10_max  + ' um')
                output = output + "\n"  
            
            output = output + "-----------------------------------------------------------------------------------------------------------\n"

            log(output)


    def getLastTodayFromDB(self):
        conn = sqlite3.connect('db/meteopi.s3db',200)

        dbCursor = conn.cursor()
        try:
            dbCursor.execute("SELECT * FROM METEO where date(TIMESTAMP_LOCAL) = date('now','localtime') order by rowid desc limit 1")
        except sqlite3.Error:
            log("Ripristino Database")
            os.system( "sudo cp -f db/meteopiori.s3db db/meteopi.s3db" )
            os.system("sudo reboot")
        data = dbCursor.fetchall()
        if ( len(data) != 1):
            if conn:
                conn.close()
            return False

        self.previous_measure_time = datetime.datetime.strptime(data[0][0],"%Y-%m-%d %H:%M:%S.%f")
        self.rain = (data[0][9])
        self.rain_rate = (data[0][10])
        self.the_real_rain = (data[0][33])
        self.winDayMin = (data[0][18])
        self.winDayMax = (data[0][19])
        self.winDayGustMin = (data[0][20])
        self.winDayGustMax = (data[0][21])
        self.TempOutMin = (data[0][22])
        self.TempOutMax = (data[0][23])
        self.TempInMin = (data[0][24])
        self.TempInMax = (data[0][25])
        self.UmOutMin = (data[0][26])
        self.UmOutMax = (data[0][27])
        self.UmInMin = (data[0][28])
        self.UmInMax = (data[0][29])
        self.PressureMin = (data[0][30])
        self.PressureMax = (data[0][31])

        dbCursor.execute("SELECT * FROM METEO where date(TIMESTAMP_LOCAL) = date('now','localtime') order by rowid asc limit 1")
        data = dbCursor.fetchall()
        if ( len(data) == 1):
            self.previous_rain = (data[0][9])
        else:
            self.previous_rain = None

        if conn:
            conn.close()

        return True

class CameraFiles(object):

    def __init__(self):
        self.img1FileName = None
        self.img2FileName = None
        self.fotos = None
        self.img1IPFileName = None
        self.img2IPFileName = None
        self.cPIFilemane = None

    def reset(self):
        self.img1FileName = None
        self.img2FileName = None
        self.fotos = None
        self.img1IPFileName = None
        self.img2IPFileName = None
        self.cPIFilemane = None

