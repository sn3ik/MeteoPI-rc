###################################################
#                                                 #
#     MeteoPI                                     #
#     by F.C. - sn3ik@hotmail.com                 #
#                                                 #
#     Thanks to Sint Wind PI & Tonino Tarsi       #
#                                                 #
###################################################

"""This module defines the base sensors Thread class."""


import threading
import time
import config
import random
import datetime
import sqlite3
from TTLib import *
import WeatherStation
import sys
import subprocess
import globalvars
import meteodata
import sensors.sensor_external
import sensors.sensor_simulator
#import sensor_wh1080rf importare i sensori qui
import sensors.sensor_wh1080rtlsdr
import sensors.sensor_wh4000rtlsdr
import sensors.sensor_ws90rtlsdr
import sensors.sensor_ws2300
#import sensors.BME280
#from sensors.TSL2591 import *


def log(message) :
    print (datetime.datetime.now().strftime("[%d/%m/%Y-%H:%M:%S] [SENSOR THREAD] -") , message)

class SensorThread(threading.Thread):
    """WindSensors thread."""
    def __init__(self,  cfg ):
        
        self.cfg = cfg
                
        self.date = datetime.datetime.now()
        self.day = datetime.datetime.now().strftime("%d%m%Y")
        
        self._stop = threading.Event()
        threading.Thread.__init__(self)

    def stop(self):
        self._stop.set()

    def stopped(self):
        return self._stop.isSet()    

    def run(self):

        log ("Starting sensor reading - Sensor type is : " + self.cfg.sensor_type)
        
        sensor = None
        
        if ( self.cfg.sensor_type.upper() == "SIMULATE"):             
            sensor = sensors.sensor_simulator.Sensor_Simulator(self.cfg)
            
        elif ( self.cfg.sensor_type.upper() == "NEVIO8" or self.cfg.sensor_type.upper() == "NEVIO16" or self.cfg.sensor_type.upper() == "NEVIO16S"  or self.cfg.sensor_type.upper() == "NEVIO4" or self.cfg.sensor_type.upper() == "NEVIO2" or self.cfg.sensor_type.upper() == "NEVIO16W" or self.cfg.sensor_type.upper() == "NEVIO16TT"  ):
            sensor = sensors.sensor_nevio.Sensor_Nevio(self.cfg)
            
        elif ( self.cfg.sensor_type.upper()  == "PCE-FWS20"):
            sensor = sensors.sensor_wh1080.Sensor_WH1080(self.cfg)
            if self.cfg.set_system_time_from_WeatherStation :
                sensors.sensor.SetTimeFromWeatherStation()
                
        elif ( self.cfg.sensor_type.upper()  == "PCE-SENSOR" or self.cfg.sensor_type.upper()  == "PCE-SENSOR-C" ):
            sensor = sensors.sensor_argent80422.Sensor_Argent80422(self.cfg)
            
        elif ( self.cfg.sensor_type.upper()  == "DAVIS-SENSOR" ):
            sensor = sensors.sensor_davis.Sensor_Davis(self.cfg)           
             
        elif ( self.cfg.sensor_type.upper()  == "LACROSS-TX23" ):
            sensor = sensors.sensor_lacrossTX23.Sensor_LacrossTX23(self.cfg)     
                              
        elif ( self.cfg.sensor_type.upper()  == "WMR100" ):
            sensor = sensors.sensor_wmr100.Sensor_WMR100(self.cfg)       
            
        elif ( self.cfg.sensor_type.upper()  == "WMR200" ):
            sensor = sensors.sensor_wmr200.Sensor_WMR200(self.cfg)             
                        
        elif ( self.cfg.sensor_type.upper()  == "WMR918" ):
            sensor = sensors.sensor_wmr918.Sensor_WMR918(self.cfg)     
                               
        elif ( self.cfg.sensor_type.upper()  == "WM918" ):
            sensor = sensors.sensor_wm918.Sensor_WM918(self.cfg)   
            
        elif ( self.cfg.sensor_type.upper()  == "WH1080-RFM01" ):
            sensor = sensors.sensor_wh1080rf.Sensor_WH1080RF(self.cfg)

        elif ( self.cfg.sensor_type.upper()  == "WH1080_RTL-SDR" ):
            sensor = sensors.sensor_wh1080rtlsdr.Sensor_WH1080RTLSDR(self.cfg)
            
        elif ( self.cfg.sensor_type.upper()  == "WH4000_RTL-SDR" ):
            sensor = sensors.sensor_wh4000rtlsdr.Sensor_WH4000RTLSDR(self.cfg)

        elif ( self.cfg.sensor_type.upper()  == "WS90_RTL-SDR" ):
            sensor = sensors.sensor_ws90rtlsdr.Sensor_WS90RTLSDR(self.cfg)

        elif ( self.cfg.sensor_type.upper()  == "WS23XX" ):
            sensor = sensors.sensor_ws2300.Sensor_WS2300(self.cfg)     
            
        elif ( self.cfg.sensor_type.upper()  == "W831" ):
            sensor = sensors.sensor_W831.Sensor_W831(self.cfg)                                         
                       
        elif ( self.cfg.sensor_type.upper()  == "DAVIS-VANTAGE-PRO2" ):
            sensor = sensors.sensor_vantage_pro2.Sensor_VantagePro2(self.cfg)  
                
        elif ( self.cfg.sensor_type.upper()  == "NONE" ):
            sensor = sensors.sensor_none.Sensor_None(self.cfg)           
                                              
        else:
            log("Sensor type not implemented. Exiting ...")
            os.system("sudo ./killmeteopi.sh")
         
        # mail loop    
        while not self._stop.isSet():
            sensor.GetData()
                    
