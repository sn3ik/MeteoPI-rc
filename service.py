###################################################
#                                                 #
#     MeteoPI                                     #
#     by F.C. - sn3ik@hotmail.com                 #
#                                                 #
#     Thanks to Sint Wind PI & Tonino Tarsi       #
#                                                 #
###################################################
"""Classes and methods for service operation"""

import threading
import time
import config
import random
import datetime
import sqlite3
#from TTLib import  *
import sys
import globalvars
import sun
import math
import os

def log(message) :
    print (datetime.datetime.now().strftime("[%d/%m/%Y-%H:%M:%S] [SERVICE______] -") , message)

def run_all_service_thread(cfg):
        
    Rebooter_thread = Rebooter(cfg)
    Rebooter_thread.start()
    
    SunHalter_thread = SunHalter(cfg)
    SunHalter_thread.start()

    Halter_thread = Halter(cfg)
    Halter_thread.start()    
    
    WatchDog_thread = WatchDog(cfg)
    WatchDog_thread.start()
     
class WatchDog(threading.Thread):
    
    def __init__(self,cfg):
        self.cfg = cfg
        threading.Thread.__init__(self)
        
    def run(self):
        log("Starting MeteoPi Listener")
        time.sleep(300)
        while 1:
            time.sleep(self.cfg.WebCamInterval )
            seconds_elapsed = (datetime.datetime.now() - globalvars.WatchDogTime  ).total_seconds()
            if (self.cfg.WebCamInterval > 60):
                log("Last main Thread delay ratio: %.1f" % (seconds_elapsed/self.cfg.WebCamInterval))
                #os.system("meteopi restart")
                if (seconds_elapsed > (2 * self.cfg.WebCamInterval)):
                    log("MeteoPI Listener : System will Reboot")
                    time.sleep(10)
                    #systemRestart()             

class SunHalter(threading.Thread):
    
    def __init__(self,cfg):
        self.cfg = cfg
        threading.Thread.__init__(self)
        
    def run(self):
        #try:
        #shutdown_hour_before_sunset
        time.sleep(300)
        if ( self.cfg.set_system_time_from_ntp_server_at_startup ):
            while (  not globalvars.TimeSetFromNTP ) :
                time.sleep(60)
        if ( self.cfg.shutdown_hour_before_sunset.upper() != "NONE" ):
            s=sun.sun(lat=self.cfg.location_latitude,long=self.cfg.location_longitude)
            sh = float(self.cfg.shutdown_hour_before_sunset)
            h = math.floor(sh)
            m = math.floor( ( sh-h) * 60 )
            sunset = s.sunset()
            time_todo = datetime.timedelta(hours=sunset.hour-h, minutes=sunset.minute-m, seconds=sunset.second)
            time_now = datetime.timedelta(hours=datetime.datetime.now().hour, minutes=datetime.datetime.now().minute, seconds=datetime.datetime.now().second)
 
            seconds_todo = (time_todo - time_now  ).total_seconds()
  
            if (seconds_todo < 0  ) : seconds_todo = seconds_todo + 86400                    
            
            log("SunHalter: System will Halt in %s seconds" % str(seconds_todo))
            time.sleep(seconds_todo)
            systemHalt()
#        except:
#            pass

class Rebooter(threading.Thread):
    
    def __init__(self,cfg):
        self.cfg = cfg
        threading.Thread.__init__(self)
        
    def run(self):
        #try:
        time.sleep(300)
        if ( self.cfg.set_system_time_from_ntp_server_at_startup ):
            while (  not globalvars.TimeSetFromNTP ) :
                time.sleep(60)
        if ( self.cfg.reboot_at.upper() != "NONE" ):
            time_todo = datetime.timedelta(hours=int(self.cfg.reboot_at.split(":")[0]), minutes=int(self.cfg.reboot_at.split(":")[1]), seconds=00)
            time_now = datetime.timedelta(hours=datetime.datetime.now().hour, minutes=datetime.datetime.now().minute, seconds=datetime.datetime.now().second)
            
            seconds_todo = (time_todo - time_now  ).total_seconds()
            if (seconds_todo < 0  ) : seconds_todo = seconds_todo + 86400                    

            log("Rebooter: System will Reboot in %s seconds" % str(seconds_todo))

            time.sleep(seconds_todo)
            systemRestart()
#        except:
#            pass

class Halter(threading.Thread):
    
    def __init__(self,cfg):
        self.cfg = cfg
        threading.Thread.__init__(self)
        
    def run(self):
        #try:
        time.sleep(300)
        if ( self.cfg.set_system_time_from_ntp_server_at_startup ):
            while (  not globalvars.TimeSetFromNTP ) :
                time.sleep(60)
        if ( self.cfg.shutdown_at.upper() != "NONE" ):
            time_todo = datetime.timedelta(hours=int(self.cfg.shutdown_at.split(":")[0]), minutes=int(self.cfg.shutdown_at.split(":")[1]), seconds=00)
            time_now = datetime.timedelta(hours=datetime.datetime.now().hour, minutes=datetime.datetime.now().minute, seconds=datetime.datetime.now().second)
           
            seconds_todo = (time_todo - time_now  ).total_seconds()
            if (seconds_todo < 0  ) : seconds_todo = seconds_todo + 86400       
                         
            log("Halter: System will Halt in %s seconds" % str(seconds_todo))
                
            time.sleep(seconds_todo)
            systemHalt()
