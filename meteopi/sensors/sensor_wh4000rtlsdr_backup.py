###################################################
#                                                 #
#     MeteoPI                                     #
#     by F.C. - sn3ik@hotmail.com                 #
#                                                 #
#     Thanks to Sint Wind PI & Tonino Tarsi       #
#                                                 #
###################################################

"""This module defines the WH4000_RTL-SDR sensor."""

import threading
import time
import config
import random
import datetime
import sqlite3
from TTLib import *
import TTLib
import sys
import subprocess
import globalvars
import meteodata
import sensors.sensor_thread
import sensors.sensor_external 
import RPi.GPIO as GPIO
import TTLib
import _thread
import os
import json

DEBUG = False

def log(message) :
    print (datetime.datetime.now().strftime("[%d/%m/%Y-%H:%M:%S] [WH4000RTLSDR_] -") , message)
    
def get_wind_dir_text(wind_dir):
    """Return an array to convert wind direction integer to a string."""
    wind_dir_degr = [0, 23, 45, 68, 90, 113, 135, 158, 180, 203, 225, 248, 270, 293, 315, 338]
    wind_dir_s = ['N','NNE','NE','ENE','E','ESE','SE','SSE','S','SSW','SW','WSW','W','WNW','NW','NNW','N']
    wind_dir_index = 0
    while wind_dir_index < 16 and wind_dir_degr[wind_dir_index] < wind_dir: wind_dir_index += 1
    return wind_dir_s[wind_dir_index]

def get_datetime():
    try:
        #t = os.path.getmtime(filename)
        return datetime.datetime.now()#.strftime("[%Y/%m/%d-%H:%M:%S]")
    except:
        return None

def getrevision():
    # Extract board revision from cpuinfo file
    myrevision = "0000"
    try:
        f = open('/proc/cpuinfo','r')
        for line in f:
            if line[0:8]=='Revision':
                myrevision = line[11:-1]
        f.close()
    except:
        myrevision = "0000"
    
    return myrevision


class Sensor_WH4000RTLSDR(sensors.sensor_external.Sensor):
    
    def __init__(self,cfg ):
    
        ret = self.Detect()
        if ( not ret ):
            log("*************************************************************")
            log("*                                                           *")
            log("*   ERROR : No RTL-SDR compatible USB DVB-T dongle found!   *")
            log("*                METEOPI execution aborted.                 *")
            log("*                                                           *")
            log("*************************************************************")
            os.system("sudo ./killmeteopi.sh")
        else:
            log("RTL-SDR-compatible USB DVB-T dongle detected." )
            time.sleep(5)
            
        threading.Thread.__init__(self)
        sensors.sensor_external.Sensor.__init__(self,cfg )
        self.cfg = cfg
        
        try:
            os.remove('/dev/shm/wh4000-rtl_433.txt')            
        except:
            log("Warning could not delete wh4000-rtl_433.txt file")

        self.active = True
        self.start()
        
    def readfreq(self):
        if self.cfg.rtlsdr_frequency == 433:
            return '433920000'
        elif self.cfg.rtlsdr_frequency == 868:
            return '868200000'
        elif self.cfg.rtlsdr_frequency == 915:
            return '915000000'  
    
    def startRFListenig(self):
        freq = (self.readfreq())
        bdl = str(self.cfg.rtlsdr_bdl)
        ppm = str(self.cfg.rtlsdr_ppm)
        cmd = "sudo /usr/local/bin/rtl_433 -f %s -R 78 -p %s > /dev/null" % (freq,ppm)
        #cmd = "sudo /usr/local/bin/rtl_433 -f %s -R 78 -Y level=0 -p %s > /dev/null" % (freq,ppm)
        #cmd = "/home/pi/meteopi/sensors/./rtl_check.sh > /dev/null"
        os.system(cmd)
    
    def run(self):
        freq = (self.readfreq())
        bdl = str(self.cfg.rtlsdr_bdl)
        ppm = str(self.cfg.rtlsdr_ppm)
        myrevision = getrevision()
        if myrevision == "0002" or myrevision == "0003" :
            s = 1
        else:
            s = 2
        log("Starting RF listening")
        cmd = "sudo /usr/local/bin/rtl_433 -f %s -R 78 -p %s > /dev/null" % (freq,ppm)
        #cmd = "sudo /usr/local/bin/rtl_433 -f %s -R 78 -Y level=0 -p %s > /dev/null" % (freq,ppm)
        #cmd = "/home/pi/meteopi/sensors/./rtl_check.sh > /dev/null"


        #cmd = "/usr/local/bin/rtlsdr -q -r '/swpi/gfile001.data' -R 32 -l 0  > /dev/null" 
        os.system(cmd)
        #log("Something went wrong with RF ... restarting")


    def Detect(self):
        p = subprocess.Popen("/usr/local/bin/rtl_eeprom",shell=True,stdout=subprocess.PIPE,stderr=subprocess.PIPE)
        (stdout, stderr) = p.communicate()
        x = str(stderr)
        #print(x)
        if  x.find('Found') != -1:
            return True
        else:
            return False

    
    def ReadData(self):
        with open('/dev/shm/wh4000-rtl_433.txt', 'r') as f:
            data_file = f.read()

            try:
                line = json.loads(data_file)
                station_id = (line['id'])
                if ( station_id  == "None" ):
                    return "None",0,0,0,0,"",0,0,0,0
                temp = float(line['temperature_C'])
                hum = (line['humidity'])
                dire = float(line['wind_dir_deg'])
                dir_code = get_wind_dir_text(dire)
                Wind_speed = (round((line['wind_avg_m_s'])*self.cfg.windspeed_gain + self.cfg.windspeed_offset,1))*3.6
                Gust_Speed  = (round((line['wind_max_m_s'])*self.cfg.windspeed_gain + self.cfg.windspeed_offset,1))*3.6
                #dir_code = 'N'
                #dire = float(line['wind_dir_deg'])
                rain = (round(line['rain_mm'],2))
                uv_index = (line['uvi'])
                watts_sqmeter = float(line['light_lux'])

            except Exception as e:
                    print(e)
                    log("Received data are not in json format. Dropped...")
                    log(data_file)
                    #os.system("meteopi stop")
                    #freq = (self.readfreq())
                    #bdl = str(self.cfg.rtlsdr_bdl)
                    #ppm = str(self.cfg.rtlsdr_ppm)
                    #cmd = "sudo /usr/local/bin/rtl_433 -f %s -R 78 -p %s > /dev/null" % (freq,ppm)
                    return "None",0,0,0,0,"",0,0,0,0
            return station_id,temp,hum,Wind_speed,Gust_Speed,dir_code,dire,rain,uv_index,watts_sqmeter 


    def GetData(self):

        # get first good data
        good_data = False
        while ( not os.path.exists('/dev/shm/wh4000-rtl_433.txt')  ):
            if DEBUG: print ("DEBUG - /dev/shm/wh4000-rtl_433.txt does not exist.")
            time.sleep(5)
        while ( not good_data ):
            station_id,temp,hum,Wind_speed,Gust_Speed,dir_code,dire,rain, uv_index, watts_sqmeter =  self.ReadData()
            if ( station_id != "None" and station_id != "Time"):
                good_data = True
            #elif ( station_id == "Time"):
            #    log("Datetime data received from WH4000_RTL-SDR. Waiting for weather data...")
            #    time.sleep(48)
            else:
                log("Bad data received from WH4000_RTL-SDR")
                time.sleep(48)
        log("First data received from WH4000_RTL-SDR, station %s. Processing..." % station_id)
        last_data_time = get_datetime()       
        
        while 1:
            if ( station_id != "None" and station_id != "Time" ):
                globalvars.meteo_data.status = 0
                globalvars.meteo_data.last_measure_time = last_data_time
                globalvars.meteo_data.idx = globalvars.meteo_data.last_measure_time
                globalvars.meteo_data.hum_out = hum
                globalvars.meteo_data.temp_out = temp
                globalvars.meteo_data.wind_ave   = Wind_speed
                globalvars.meteo_data.wind_gust = Gust_Speed
                globalvars.meteo_data.wind_dir = dire #*22.5
                globalvars.meteo_data.wind_dir_code = dir_code
                globalvars.meteo_data.rain = round(rain,1)
                globalvars.meteo_data.uv = uv_index
                globalvars.meteo_data.illuminance = watts_sqmeter
    
                sensors.sensor_external.Sensor.GetData(self)
            
            
            tosleep = 50-(datetime.datetime.now()-last_data_time).seconds
            if DEBUG: print ("Sleeping  ", tosleep)
            if (tosleep > 0 and tosleep < 50 ): 
                time.sleep(tosleep)
            else:
                time.sleep(50)
            
            new_last_data_time = get_datetime()
            while ( new_last_data_time == None or new_last_data_time == last_data_time):
                time.sleep(10)
                new_last_data_time = get_datetime()
                
            if station_id != "Time":
                log("New data received from station %s. Processing..." % station_id)
            else:
                log("Datetime signal received from WH4000_RTL-SDR station. Processing...")
            last_data_time = new_last_data_time
                        
            station_id,temp,hum,Wind_speed,Gust_Speed,dir_code,dire,rain, uv_index, watts_sqmeter =  self.ReadData()
            
            if ( station_id == "Time"):
                log("Sleeping while waiting for weather data...")
                tosleep = 50-(datetime.datetime.now()-last_data_time).seconds
                if DEBUG: print ("Sleeping  ", tosleep)
                if (tosleep > 0 and tosleep < 50 ): 
                    time.sleep(tosleep)
                else:
                    time.sleep(50)
            
            if ( station_id == "None"):
                log("Bad data received from WH4000_RTL-SDR")



if __name__ == '__main__':

    configfile = 'meteopi.cfg'
    
    cfg = config.config(configfile)
    
    globalvars.meteo_data = meteodata.MeteoData(cfg)

    ss = Sensor_WH4000RTLSDR
    
    while 1:
        ss.GetData()
    
