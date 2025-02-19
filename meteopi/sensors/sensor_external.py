###################################################
#                                                 #
#     MeteoPI                                     #
#     by F.C. - sn3ik@hotmail.com                 #
#                                                 #
#     Thanks to Sint Wind PI & Tonino Tarsi       #
#                                                 #
###################################################


"""This module defines the base sensors on raspberry ."""


import threading
import serial
import time
import config
import random
import datetime
import sqlite3
from TTLib import  *
import WeatherStation
import sys
import subprocess
import globalvars
import meteodata
import sensors.TSL2591
from sensors.BMP085 import BMP085
from sensors.BME280 import *
import re
#import Adafruit_DHT
from sensors.sds011 import SDS011

def log(message) :
    print (datetime.datetime.now().strftime("[%d/%m/%Y-%H:%M:%S] [SENSORS______] -" ) , message)

class Sensor(threading.Thread):

    def __init__(self ,cfg):
        self.cfg = cfg
        self.implementedStations = ["WH1080-RFM01","WH1080_RTL-SDR","WH4000_RTL-SDR"]
        #self.implementedStations = ["SIMULATE","PCE-FWS20","NEVIO8","NEVIO16","PCE-SENSOR","DAVIS-SENSOR","LACROSS-TX23","WMR100","WMR200","WMR918","WM918","WH1080-RFM01"]

#       if ( self.cfg.sensor_type not in self.implementedStations  ):
#           log("Unknown sensor type %s can not continue" % self.cfg.sensor_type)
#           log("Implemented sensors are :")
#           print self.implementedStations
        #if (self.cfg.use_sds011 ):
        #    self.sds011 = SDS011.SDS011()

        if ( self.cfg.use_tsl2591 ):
            self.tsl2591 = sensors.TSL2591.Tsl2591()

        if ( self.cfg.use_bmp085 ):
            self.bmp085 = BMP085(0x77,3)
        else:
            self.bmp085 = None

        object.__init__(self)

    def GetData(self):
        #print "GetData"

        if ( self.cfg.use_tsl2591 ):
            self.ReadTSL2591()
        if ( self.cfg.use_sds011 ):
            self.ReadSDS011()
        if ( self.cfg.use_bmp085 and self.bmp085 != None ):
            self.ReadBMP085()
        if ( self.cfg.use_dht ):
            self.ReadDHT()
        if ( self.cfg.use_bme280):
            self.ReadBME280()
        globalvars.meteo_data.CalcStatistics()
        #time.sleep(3)
        globalvars.meteo_data.LogDataToDB()

    def ReadTSL2591(self):
        #tsl = TSL2591.Tsl2591()
        full, ir = self.tsl2591.get_full_luminosity()  # read raw values (full spectrum and ir spectrum)
        lux = self.tsl2591.calculate_lux(full, ir)  # convert raw values to lux
        globalvars.meteo_data.lux = lux
        globalvars.meteo_data.luxfull = full
        globalvars.meteo_data.ir = ir
        log("TSL2591 - Lux: %.1f Full: %.1f IR: %.1f" % (lux, full, ir) )
        #log("[TSL2591] - test")

    def ReadSDS011(self):
        sensor = SDS011("/dev/ttyUSB0", use_query_mode=True)
        sensor.sleep(sleep=False)
        pm25 = 0
        pm10 = 0
        pm25,pm10 = sensor.query()
        globalvars.meteo_data.pm25 = pm25
        globalvars.meteo_data.pm10 = pm10
        #log("SDS011 - PM 2.5: %.1f PM 10: %.1f" % (pm25, pm10))
        log("New data received from sensor SDS011. Processing...")

    def ReadDHT(self):

        if ( self.cfg.sensor_type not in self.implementedStations):
            globalvars.meteo_data.hum_out = None
        else:
            globalvars.meteo_data.hum_in = None

        try:
            if ( self.cfg.dht_type == "DHT11" ) :
                humidity, temperature = Adafruit_DHT.read_retry(Adafruit_DHT.DHT11, 4)
                    #log('Temp={0:0.1f}  Humidity={1:0.1f}'.format(temperature, humidity))
            elif ( self.cfg.dht_type == "DHT22" ):
                humidity, temperature = Adafruit_DHT.read_retry(Adafruit_DHT.DHT22, 4)
                    #log('Temp={0:0.1f}  Humidity={1:0.1f}'.format(temperature, humidity))
            else :
                humidity, temperature = Adafruit_DHT.read_retry(Adafruit_DHT.AM2302, 4)
                    #log('Temp={0:0.1f}  Humidity={1:0.1f}'.format(temperature, humidity))

            temp = "{0:0.1f}".format(temperature)
            hum = "{0:0.1f}".format(humidity)

                #matches = re.search("Temp =\s+([0-9.]+)", output)
                #matches = re.search("Temp\s*=\s*(-?[\d.]+)", output) # Alessandro
            if (temp is not None):
                dht_temp = float(temp)
                if ( self.cfg.sensor_type not in self.implementedStations ):
                    if ( self.cfg.use_bmp085 ):
                          if ( self.cfg.sensor_temp_in == "Default"):
                            globalvars.meteo_data.temp_in = dht_temp
                    else:
                        if ( self.cfg.sensor_temp_out == "Default"):
                               globalvars.meteo_data.temp_out = dht_temp
                else:
                    if ( not self.cfg.use_bmp085 ):
                        if ( self.cfg.sensor_temp_in == "Default"):
                              globalvars.meteo_data.temp_in = dht_temp

                if ( self.cfg.sensor_temp_out == "DHT"):
                        globalvars.meteo_data.temp_out = dht_temp
                if ( self.cfg.sensor_temp_in == "DHT"):
                    globalvars.meteo_data.temp_in = dht_temp

                # search for humidity printout
                #matches = re.search("Hum =\s+([0-9.]+)", output)
            if (hum is not None):
                dht_hum = float(hum)
                if ( self.cfg.sensor_type not in self.implementedStations):
                    globalvars.meteo_data.hum_out = dht_hum
                else:
                    globalvars.meteo_data.hum_in = dht_hum

            log("DHT - Temp: %.1f C Hum: %.1f " % (dht_temp, dht_hum) )

        except:
            log("ERROR reading DHT sensor")

    def ReadBMP085(self):
        try:
            p=0.0
            temp = None
            i = 0
            while ( p==0.0 and i < 10):
                i = i+1
                p,temp = self.bmp085.readPressureTemperature()
                if p == 0.0 :
                    time.sleep(0.5)

            if ( p != None )  :
                abs_pressure = float(p / 100.0)
                globalvars.meteo_data.abs_pressure =  abs_pressure


                if ( self.cfg.sensor_type in self.implementedStations):
                    if ( self.cfg.sensor_temp_in == "Default"):
                        globalvars.meteo_data.temp_in = temp
                else:
                    if ( self.cfg.sensor_temp_out == "Default"):
                        globalvars.meteo_data.temp_out = temp

                if ( self.cfg.sensor_temp_out == "BMP085"):
                        globalvars.meteo_data.temp_out = temp
                if ( self.cfg.sensor_temp_in == "BMP085"):
                        globalvars.meteo_data.temp_in = temp

                log("BMP085 - Temperature: %.1f C Pressure:    %.1f " % (temp, abs_pressure) )

            else:
                globalvars.meteo_data.abs_pressure = None

                if ( self.cfg.sensor_type in self.implementedStations):
                    globalvars.meteo_data.temp_in = None
                else:
                    globalvars.meteo_data.temp_out = None
                return

        except:
            globalvars.meteo_data.abs_pressure = None
            if ( self.cfg.sensor_type in self.implementedStations):
                globalvars.meteo_data.temp_in = None
            else:
                globalvars.meteo_data.temp_out = None
            log("ERROR reading BMP085 sensor")

    def ReadBMP085_temp_in(self):
        p=0.0
        temp = None
        i = 0
        while ( p==0.0 and i < 10):
            p,temp = self.bmp085.readPressureTemperature()
            i = i+1
            time.sleep(0.02)

        if ( p != None )  :
            globalvars.meteo_data.abs_pressure =  float(p / 100.0)
        else:
            globalvars.meteo_data.abs_pressure = None


        globalvars.meteo_data.temp_in = temp

    def ReadBME280(self):
        try:
            p=0.0
            temp = None
            i = 0
            #sensor = BME280(mode=BME280_OSAMPLE_8)
            sensor = BME280()
            while ( p==0.0 and i < 10):
                i = i+1
                temp = sensor.read_temperature()
                p = sensor.read_pressure()
                #p = pascals / 100
                humidity = sensor.read_humidity()
                #globalvars.meteo_data.hum_in = humidity

                #p,temp = self.bmp085.readPressureTemperature()
                if p == 0.0 :
                    time.sleep(0.5)

            if ( p != None )  :
                abs_pressure = float(p / 100.0)
                globalvars.meteo_data.abs_pressure =  abs_pressure


                if ( self.cfg.sensor_type in self.implementedStations):
                    if ( self.cfg.sensor_temp_in == "Default"):
                        globalvars.meteo_data.temp_in = temp
                        globalvars.meteo_data.hum_in = humidity

                else:
                    if ( self.cfg.sensor_temp_out == "Default"):
                        globalvars.meteo_data.temp_out = temp
                        globalvars.meteo_data.hum_out = humidity


                if ( self.cfg.sensor_temp_out == "BMP085"):
                        globalvars.meteo_data.temp_out = temp
                if ( self.cfg.sensor_temp_in == "BMP085"):
                        globalvars.meteo_data.temp_in = temp

                #log("BME280 - Temp: %.1f C Press: %.1f Hum: %.0f" % (temp, abs_pressure,humidity) )
                log("New data received from sensor BME280. Processing...")


            else:
                globalvars.meteo_data.abs_pressure = 0

                if ( self.cfg.sensor_type in self.implementedStations):
                    globalvars.meteo_data.temp_in = 0
                else:
                    globalvars.meteo_data.temp_out = 0
                return

        except:
            globalvars.meteo_data.abs_pressure = 0
            if ( self.cfg.sensor_type in self.implementedStations):
                globalvars.meteo_data.temp_in = None
            else:
                globalvars.meteo_data.temp_out = None
            log("ERROR reading BMP280 sensor")

    def ReadBME280_temp_in(self):
        p=0.0
        temp = None
        i = 0
        #sensor = BME280(mode=BME280_OSAMPLE_8)
        sensor = BME280()
        while ( p==0.0 and i < 10):
            temp = sensor.read_temperature()
            p = sensor.read_pressure()
            #p = pascals / 100
            humidity = sensor.read_humidity()
            globalvars.meteo_data.hum_in = humidity
            #p,temp = self.bmp085.readPressureTemperature()
            i = i+1
            time.sleep(0.02)

        if ( p != None )  :
            globalvars.meteo_data.abs_pressure =  float(p / 100.0)
        else:
            globalvars.meteo_data.abs_pressure = None


        globalvars.meteo_data.temp_in = temp

    def _report_rain(self,total, rate):
        #print "report_rain",total, rate
        globalvars.meteo_data.rain = total



    def _report_wind(self,dir, dirDeg, dirStr, gustSpeed, avgSpeed):
        #print "report_wind",dirDeg, avgSpeed, gustSpeed
        globalvars.meteo_data.wind_ave   = avgSpeed
        globalvars.meteo_data.wind_gust = gustSpeed
        globalvars.meteo_data.wind_dir   = dirDeg
        globalvars.meteo_data.wind_dir_code = dirStr

#       globalvars.meteo_data.CalcStatistics()
#       globalvars.meteo_data.LogDataToDB()

    def _report_barometer_absolute(self,pressure):
        globalvars.meteo_data.abs_pressure = pressure

    def _report_temperature(self,temp, humidity, sensor):
        if ( sensor == 1 ) :
            globalvars.meteo_data.hum_out  = humidity
            globalvars.meteo_data.temp_out   = temp
        elif( sensor == 0 ):
            globalvars.meteo_data.hum_in  = humidity
            globalvars.meteo_data.temp_in   = temp

    def _report_temperature_inout(self,temp_in, temp_out):
        globalvars.meteo_data.temp_out   = temp_out
        globalvars.meteo_data.temp_in   = temp_in

    def _report_humidity(self, hum_in, hum_out):
        globalvars.meteo_data.hum_out  = hum_out
        globalvars.meteo_data.hum_in  = hum_in


    def _report_uv(self,uv):
        globalvars.meteo_data.uv = uv


    def _logData(self):
        #print "_logData"
#       if ( globalvars.meteo_data.last_measure_time != None):
#           print (datetime.datetime.now()-globalvars.meteo_data.last_measure_time).seconds
        if ( globalvars.meteo_data.last_measure_time == None or (datetime.datetime.now()-globalvars.meteo_data.last_measure_time).seconds >= 60 ) :
            globalvars.meteo_data.status = 0
            globalvars.meteo_data.last_measure_time = datetime.datetime.now()
            globalvars.meteo_data.idx = globalvars.meteo_data.last_measure_time
            print ("_logData1")
            super().GetData()
