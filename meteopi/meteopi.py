#!/usr/bin/env python
# -*- coding: utf-8 -*-
###################################################
#                                                 #
#     MeteoPI                                     #
#     by F.C. - sn3ik@hotmail.com                 #
#                                                 #
#     Thanks to Sint Wind PI & Tonino Tarsi       #
#                                                 #
###################################################

"""     Main program """

import time
import sqlite3
import os
#import humod 
import config
import webcam
import sys
import urllib
import datetime
import camera
from TTLib import *
from TTLib import log
import version
import sensors.sensor_thread
import globalvars
import ntplib
import meteodata
import math
import service
import tarfile
import signal
import _thread
import database
#import web_server
import socket
import pluginmanager
import importlib
import subprocess
import cameraPI
import IPCam
import traceback
import threading

socket.setdefaulttimeout(30)

dictModel = {}
dictModel[ '0002' ] = 'Raspberry Model B PCB 1.0'
dictModel[ '0003' ] = 'Raspberry Model B(ECN0001) PCB 1.0'
dictModel[ '0004' ] = 'Raspberry Model B PCB 2.0'
dictModel[ '0005' ] = 'Raspberry Model B PCB 2.0'
dictModel[ '0006' ] = 'Raspberry Model B PCB 2.0'
dictModel[ '0007' ] = 'Raspberry Model A PCB 2.0'
dictModel[ '0008' ] = 'Raspberry Model A PCB 2.0'
dictModel[ '0009' ] = 'Raspberry Model A PCB 2.0'
dictModel[ '000d' ] = 'Raspberry Model B PCB 2.0'
dictModel[ '000e' ] = 'Raspberry Model B PCB 2.0'
dictModel[ '000f' ] = 'Raspberry Model B PCB 2.0'
dictModel[ '0010' ] = 'Raspberry Model B+ PCB 1.0'
dictModel[ '0011' ] = 'Raspberry Model ComputeModule1 PCB 1.0'
dictModel[ '0012' ] = 'Raspberry Model A+ PCB 1.1'
dictModel[ '0013' ] = 'Raspberry Model B+ PCB 1.2'
dictModel[ '0014' ] = 'Raspberry Model ComputeModule1 PCB 1.0'
dictModel[ '0015' ] = 'Raspberry Model A+ PCB 1.1'
dictModel[ 'a01040' ] = 'Raspberry Model 2ModelB PCB 1.0'
dictModel[ 'a01041' ] = 'Raspberry Model 2ModelB PCB 1.1'
dictModel[ 'a21041' ] = 'Raspberry Model 2ModelB PCB 1.1'
dictModel[ 'a22042' ] = 'Raspberry Model 2ModelB(withBCM2837) PCB 1.2'
dictModel[ '900021' ] = 'Raspberry Model A+ PCB 1.1'
dictModel[ '900032' ] = 'Raspberry Model B+ PCB 1.2'
dictModel[ '900092' ] = 'Raspberry Model Zero PCB 1.2'
dictModel[ '900093' ] = 'Raspberry Model Zero PCB 1.3'
dictModel[ '920093' ] = 'Raspberry Model Zero PCB 1.3'
dictModel[ '9000c1' ] = 'Raspberry Model ZeroW PCB 1.1'
dictModel[ 'a02082' ] = 'Raspberry Model 3ModelB PCB 1.2'
dictModel[ 'a020a0' ] = 'Raspberry Model ComputeModule3(andCM3Lite) PCB 1.0'
dictModel[ 'a22082' ] = 'Raspberry Model 3ModelB PCB 1.2'
dictModel[ 'a020d3' ] = 'Raspberry Model 3ModelB+ PCB 1.3'
dictModel[ '9020e0' ] = 'Raspberry Model 3ModelA+ PCB 1.0'
dictModel[ 'a02100' ] = 'Raspberry Compute Module 3+ PCB 1.0'
dictModel[ 'a03111' ] = 'Raspberry Model 4ModelB PCB 1.1 1GB'
dictModel[ 'b03111' ] = 'Raspberry Model 4ModelB PCB 1.1 2GB'
dictModel[ 'c03111' ] = 'Raspberry Model 4ModelB PCB 1.1 4GB'
dictModel[ 'b04170' ] = 'Raspberry Model 5 PCB 1.0 2GB'
dictModel[ 'c04170' ] = 'Raspberry Model 5 PCB 1.0 4GB'
dictModel[ 'd04170' ] = 'Raspberry Model 5 PCB 1.0 8GB'


# Load Configuration
configfile = 'meteopi.cfg'
if not os.path.isfile(configfile):
    cfg = config.config(configfile,False)
    os.system( "sudo chown pi meteopi.cfg" )

    log("Configurantion file created with default option. Now edit the file :  %s and restart with command  : meteopi "  % (configfile))
    #exit(0)
else:
    cfg = config.config(configfile,False)
    

def log(message) :
    print (datetime.datetime.now().strftime("[%d/%m/%Y-%H:%M:%S] [METEOPI______] -") , message)


##################################################################################
v = version.Version("VERSION").getVersion()
log( "Starting METEO PI ... v" + v)
############################ MAIN ###############################################
print ("\033[01;34m***********************************************************************")
print ("*                                                                     *")
print ("*       ███╗   ███╗███████╗████████╗███████╗ ██████╗ ██████╗ ██╗      *")
print ("*       ████╗ ████║██╔════╝╚══██╔══╝██╔════╝██╔═══██╗██╔══██╗██║      *")
print ("*       ██╔████╔██║█████╗     ██║   █████╗  ██║   ██║██████╔╝██║      *")
print ("*       ██║╚██╔╝██║██╔══╝     ██║   ██╔══╝  ██║   ██║██╔═══╝ ██║      *")
print ("*       ██║ ╚═╝ ██║███████╗   ██║   ███████╗╚██████╔╝██║     ██║      *")
print ("*       ╚═╝     ╚═╝╚══════╝   ╚═╝   ╚══════╝ ╚═════╝ ╚═╝     ╚═╝      *")
print ("*                                                                     *")
print ("*                                                                     *")
print ("*                        Press Ctrl+C to abort                        *")
print ("***********************************************************************\033[00;37m")
# Get curret log file
globalvars.TimeSetFromNTP = False
globalvars.logFileDate = datetime.datetime.now().strftime("%d%m%Y")
logFileDate = datetime.datetime.now().strftime("%d%m%Y")

SecondsToWait = 10
# give 10 seconds for interrupt the application
try:
    if not ( '-i' in sys.argv ) :
        for i in range(0,SecondsToWait):         
            sys.stdout.write(str(SecondsToWait-i) + ".... ")
            sys.stdout.flush()
            time.sleep(1)
        print ("")
    
except KeyboardInterrupt:
    #print  "Stopping MeteoPI"
    exit(0)

myrevision = getrevision()
mymodel = ''
try:
    mymodel = dictModel[myrevision]
except:
    pass
log("System revision (" + myrevision + ") : " + mymodel)

os.system( "sudo chown -R pi:root /home/pi/meteopi" )

#Make sure every executable is executable
#os.system( "sudo chmod +x ./dwcfg.sh" )
os.system( "sudo chmod +x ./usbreset" )
os.system( "sudo chmod +x ./wifi_reset.sh" )
os.system( "sudo chmod +x ./meteopi.sh" )
#os.system( "sudo chmod +x ./swpi-update.sh" )
os.system( "sudo chmod +x ./killmeteopi.sh" )
#os.system( "sudo chmod +x ./DHT/DHT" )
#os.system( "sudo chmod +x ./DHT/DHT_rf" )
#os.system( "sudo chmod +x ./wh1080_rf/wh1080_rf" )
#os.system( "sudo chmod +x ./wh1080_rf/spi_init" )

os.system( "sudo chown  pi ./DHT" )
#os.system( "sudo chown  pi ./mcp3002" )
#os.system( "sudo chown  pi ./TX23" )
#os.system( "sudo chown  pi ./wh1080_rf" )
#os.system( "sudo chown -R pi ./jscolor" )
#os.system( "sudo chmod -R 777 ./jscolor" )

#os.system( "sudo kill -9 `ps aux | grep webshell.py | grep -v grep | awk '{print $2}'`" )
#os.system( "sudo ./webshell.sh" )

if(os.path.isfile("webcamtmp")):
    os.system( "sudo rm ./webcamtmp")
if(os.path.isfile("wget-log")):
    os.system( "sudo rm ./wget-log")

# Some Globasl :-(
globalvars.bAnswering = False
globalvars.bCapturingCamera = False
globalvars.meteo_data = meteodata.MeteoData(cfg)
globalvars.takenPicture = meteodata.CameraFiles()

IP = None
publicIP = None

# Start sensors thread ##
if ( cfg.use_wind_sensor ):
    sensor_thread = sensors.sensor_thread.SensorThread(cfg)
    sensor_thread.start()

# load plugins
#pl = pluginmanager.PluginLoader("./plugins",cfg)
#pl.loadAll()
#if os.path.exists('./plugins/sync_plugin.py'):
#   log("Loading sync plugin")
#   from plugins.sync_plugin import *
#   plugin_sync = swpi_sync_plugin(cfg)
#else:
    plugin_sync = None

# Set Time from NTP ( using a thread to avoid strange freezing )
if ( cfg.set_system_time_from_ntp_server_at_startup ):
    _thread.start_new_thread(SetTimeFromNTP, (cfg.ntp_server,)) 

# Get network IP
if (internet_on() ):
    IP = getIP()
    publicIP = getPublicIP()
    if publicIP != None:
        log("Connected with IP :" + publicIP)
else:
    log("Running without internet connection")

if ( cfg.set_time_at_boot.upper() != "NONE"):
    hours=int((cfg.set_time_at_boot.split(":")[0]))
    minutes=int((cfg.set_time_at_boot.split(":")[1]))
    seconds="00"
    date_file = "/home/pi/meteopi/date.txt"
    if os.path.exists(date_file):
        in_file = open(date_file,"r")
        text = in_file.readline().split("\n")[0]
        print (text)
        in_file.close()
        now = datetime.datetime.strptime(text, "%Y-%m-%d")
    else:
        now = datetime.datetime.now()
        
    new_date = now + datetime.timedelta(days=1)
    
    d = new_date.replace( hour=hours )
    new_date =  d.replace( minute=minutes )
    os.system("sudo date -s '%s'" %  new_date)
    in_file = open(date_file,"w")
    in_file.write(new_date.strftime("%Y-%m-%d")+"\n")
    in_file.close()
    
    
# Set Time from NTP ( using a thread to avoid strange freezing )
#if ( cfg.set_system_time_from_ntp_server_at_startup ):
#    _thread.start_new_thread(SetTimeFromNTP, (cfg.ntp_server,)) 

# Send mail with IP information ( using a thread to avoid strange freezing )
if ( publicIP != None and cfg.use_mail and cfg.mail_ip ):
    log("Local IP :" + IP + " Public IP : " + publicIP)
    _thread.start_new_thread(SendMail,(cfg, cfg.station_name + " - My IP has changed","Local IP :" + IP + " Public IP : " + publicIP,"")) 
    
if ( publicIP != None and cfg.use_DNSExit) :
    DNSExit(cfg.DNSExit_uname,cfg.DNSExit_pwd,cfg.DNSExit_hname)
    
    
# Send mail with IP information
#if ( IP != None and cfg.use_mail and cfg.mail_ip ):
#   if ( SendMail(cfg,"IP","My IP today is : " + IP ,"") ):
#       log ("Mail sent to :" + cfg.mail_to )
#   else:
#       log ("ERROR sending mail" )

   
# Start service thread if necessary
service.run_all_service_thread(cfg)
    
# Wait for valid data
maxwait = 0
if ( cfg.use_wind_sensor ) :
    while ( globalvars.meteo_data.last_measure_time == None and maxwait < 120) :
        maxwait = maxwait + 1 
        time.sleep(1)

# clear all sd cards at startup
if ( cfg.usecameradivice ):
    cameras = camera.PhotoCamera(cfg)
    if ( cfg.clear_all_sd_cards_at_startup):
        camera.ClearAllCameraSDCards(cfg)       

if ( cfg.delete_images_on_sd ):
    filelist = [ f for f in os.listdir("./img") if f.endswith(".jpg") ]
    for f in filelist:
        file_to_delete = "./img/" + f
        os.remove(file_to_delete)    

# Start main thread
############################ MAIN  LOOP###############################################

while 1:
    
    bipcam2 = False;
    last_data_time = datetime.datetime.now()
    globalvars.meteo_data.timetoupload = last_data_time
    globalvars.meteo_data.interval = cfg.WebCamInterval
    
    log("wait")

    
    if ( plugin_sync != None ):
        plugin_sync.run_before()
           
    try:
        #if ( cfg.usedongle ):  log("Signal quality : " + str(modem.get_rssi()))

        if ( cfg.wifi_reset_if_down ) :
            os.system("sudo ./wifi_reset.sh")
        
        # Wait till 45 seconds in case of PCE-FWS20 to avoid USB overload
        if (cfg.use_wind_sensor and cfg.sensor_type == "PCE-FWS20"):
            seconds = datetime.datetime.now().second
            if ( seconds < 45 ):
                time.sleep(45-seconds)
        
        waitForHandUP()  # do to replace with lock object
        # WebCam 1
        if ( cfg.webcamDevice1.upper() != "NONE" ):
            webcam1 =  webcam.webcam(1,cfg)
            img1FileName = "./img/webcam1_" + datetime.datetime.now().strftime("%d%m%Y-%H%M%S.jpg") 
            globalvars.takenPicture.img1FileName = img1FileName
            waitForHandUP()
            bwebcam1 = webcam1.capture(img1FileName)
            if ( bwebcam1 ):
                log( "Webcam 1 Captured : ok : "  + img1FileName )
                addTextandResizePhoto(img1FileName,cfg.webcamdevice1finalresolutionX,cfg.webcamdevice1finalresolutionY,cfg,v)
        # WebCam 2
        if ( cfg.webcamDevice2.upper() != "NONE" ):
            webcam2 =  webcam.webcam(2,cfg)
            img2FileName = "./img/webcam2_" + datetime.datetime.now().strftime("%d%m%Y-%H%M%S.jpg")
            globalvars.takenPicture.img2FileName = img2FileName
            waitForHandUP()
            bwebcam2 = webcam2.capture(img2FileName)
            if ( bwebcam2):
                log( "Webcam 2 Captured : ok : "  + img2FileName    )   
                addTextandResizePhoto(img2FileName,cfg.webcamdevice2finalresolutionX,cfg.webcamdevice2finalresolutionY,cfg,v)   
                
        # Cameras           
        if ( cfg.usecameradivice ):
            waitForHandUP()
            fotos = cameras.take_pictures()
            globalvars.takenPicture.fotos = fotos
            for foto in fotos:
                addTextandResizePhoto(foto,cfg.cameradivicefinalresolutionX,cfg.cameradivicefinalresolutionY,cfg,v)

        # IPCam 1
        if ( cfg.IPCamIP1.upper() != "NONE" ):
            #if (cfg.IPCamCfg.upper() == "IPCAM1" or cfg.IPCamCfg.upper() == "COMBINED"):
            IPCam1 =  IPCam.IPCam(1,cfg)
            img1IPFileName = "./img/webcam1_" + datetime.datetime.now().strftime("%d%m%Y-%H%M%S.jpg") 
            globalvars.takenPicture.img1IPFileName = img1IPFileName
            waitForHandUP()
            bipcam1 = IPCam1.IPCamCapture(img1IPFileName,1)
            if ( bipcam1 ):
                log( "IPcam 1 Captured : ok : "  + img1IPFileName )
                addTextandResizePhoto(img1IPFileName,cfg.webcamdevice1finalresolutionX,cfg.webcamdevice1finalresolutionY,cfg,v)
        #else:      
        # IPCam 2
        if (cfg.IPCamCfg.upper() == "IPCAM2"):
            IPCam2 =  IPCam.IPCam(2,cfg)
            img2IPFileName = "./img/webcam2_" + datetime.datetime.now().strftime("%d%m%Y-%H%M%S.jpg")
            globalvars.takenPicture.img2IPFileName = img2IPFileName
            waitForHandUP()
            bipcam2 = IPCam2.IPCamCapture(img2IPFileName,2)
            if ( bipcam2 ):
                log( "IPcam 2 Captured : ok : "  + img2IPFileName   )   
                addTextandResizePhoto(img2IPFileName,cfg.webcamdevice2finalresolutionX,cfg.webcamdevice2finalresolutionY,cfg,v) 
        #cameraPI
        bcPI = False
        cPIFilemane =""
        if ( cfg.use_cameraPI):
            cPI = cameraPI.cameraPI(cfg)
            if ( cfg.cameraPI_timelapse ):
                log("Start sequence timelapse images...")
                bcPI = cPI.timelapse()
                cPIFilename = "/home/pi/meteopi/timelapse/tl_animate.gif"
                globalvars.takenPicture.cPIFilemane = cPIFilemane 
            else:
                
                cPIFilemane = "/home/pi/meteopi/img/raspi_" + datetime.datetime.now().strftime("%d%m%Y-%H%M%S.jpg")
                globalvars.takenPicture.cPIFilemane = cPIFilemane           
                bcPI = cPI.capture(cPIFilemane) 
            
            if bcPI:
                globalvars.takenPicture.cPIFilemane = cPIFilemane
                #addTextandResizePhoto(cPIFilemane,cfg.cameradivicefinalresolutionX,cfg.cameradivicefinalresolutionY,cfg,v)
            else:
                globalvars.takenPicture.cPIFilemane = None
        bConnected = False
        
        if ( cfg.sendImagesToServer or cfg.logdata or cfg.upload_data or cfg.WeatherUnderground_logdata or cfg.PWS_logdata):
            waitForHandUP()
            
            if (  internet_on() ):
                #log("Sending to server ...")
                waitForHandUP()
                if ( cfg.webcamDevice1.upper() != "NONE" and bwebcam1 ):
                    if (cfg.sendallimagestoserver ):
                        waitForHandUP()
                        log("\033[01;34mSending to server\033[00;37m "+ img1FileName)
                        sendFileToServer(img1FileName,getFileName(img1FileName),cfg.ftpserver,cfg.ftpserverDestFolder,cfg.ftpserverLogin,cfg.ftpserverPassowd,False,cfg.use_thread_for_sending_to_server)
                    else:
                        waitForHandUP()
                        sendFileToServer(img1FileName,"current1.jpg",cfg.ftpserver,cfg.ftpserverDestFolder,cfg.ftpserverLogin,cfg.ftpserverPassowd,False,cfg.use_thread_for_sending_to_server)

                if ( cfg.webcamDevice2.upper() != "NONE" and bwebcam2 ):
                    if (cfg.sendallimagestoserver ):
                        waitForHandUP()
                        sendFileToServer(img2FileName,getFileName(img2FileName),cfg.ftpserver,cfg.ftpserverDestFolder,cfg.ftpserverLogin,cfg.ftpserverPassowd,False,cfg.use_thread_for_sending_to_server)
                    else:
                        waitForHandUP()
                        sendFileToServer(img2FileName,"current2.jpg",cfg.ftpserver,cfg.ftpserverDestFolder,cfg.ftpserverLogin,cfg.ftpserverPassowd,False,cfg.use_thread_for_sending_to_server)
                
                if ( cfg.IPCamCfg.upper() != "NONE" and bipcam1 ):
                    if (cfg.sendallimagestoserver ):
                        waitForHandUP()
                        log("Sending to server "+ img1IPFileName)
                        sendFileToServer(img1IPFileName,getFileName(img1IPFileName),cfg.ftpserver,cfg.ftpserverDestFolder,cfg.ftpserverLogin,cfg.ftpserverPassowd,False,cfg.use_thread_for_sending_to_server)
                    else:
                        waitForHandUP()
                        sendFileToServer(img1IPFileName,"current1.jpg",cfg.ftpserver,cfg.ftpserverDestFolder,cfg.ftpserverLogin,cfg.ftpserverPassowd,False,cfg.use_thread_for_sending_to_server)

                if (cfg.IPCamCfg.upper() == "IPCAM2" and bipcam2 ):
                    if (cfg.sendallimagestoserver ):
                        waitForHandUP()
                        sendFileToServer(img2IPFileName,getFileName(img2IPFileName),cfg.ftpserver,cfg.ftpserverDestFolder,cfg.ftpserverLogin,cfg.ftpserverPassowd,False,cfg.use_thread_for_sending_to_server)
                    else:
                        waitForHandUP()
                        sendFileToServer(img2IPFileName,"current2.jpg",cfg.ftpserver,cfg.ftpserverDestFolder,cfg.ftpserverLogin,cfg.ftpserverPassowd,False,cfg.use_thread_for_sending_to_server)

                
                if ( cfg.use_cameraPI and bcPI ): 
                    if (cfg.sendallimagestoserver ):
                        waitForHandUP()
                        sendFileToServer(cPIFilemane,getFileName(cPIFilemane),cfg.ftpserver,cfg.ftpserverDestFolder,cfg.ftpserverLogin,cfg.ftpserverPassowd,False,cfg.use_thread_for_sending_to_server)
                    else:
                        waitForHandUP()
                        if (cfg.cameraPI_timelapse):
                            #log(cPIFilename)
                            log("\033[01;34mSending to server\033[00;37m")
                            sendFileToServer("/home/pi/meteopi/timelapse/tl_animate.gif","tl_animate.gif",cfg.ftpserver,cfg.ftpserverDestFolder,cfg.ftpserverLogin,cfg.ftpserverPassowd,False,cfg.use_thread_for_sending_to_server)
                        else:
                            sendFileToServer(cPIFilemane,"raspi.jpg",cfg.ftpserver,cfg.ftpserverDestFolder,cfg.ftpserverLogin,cfg.ftpserverPassowd,False,cfg.use_thread_for_sending_to_server)
    
                if ( cfg.usecameradivice   ):
                    nCamera = 0
                    for foto in fotos:
                        nCamera = nCamera + 1
                        if (cfg.sendallimagestoserver ):
                            waitForHandUP()
                            log("Sending :" + getFileName(foto))
                            sendFileToServer(foto,getFileName(foto),cfg.ftpserver,cfg.ftpserverDestFolder,cfg.ftpserverLogin,cfg.ftpserverPassowd,False,cfg.use_thread_for_sending_to_server)
                        else:
                            waitForHandUP()
                            log("Sending :" + "camera" + str(nCamera+cfg.start_camera_number-1) + ".jpg")
                            sendFileToServer(foto,"camera"+str(nCamera+cfg.start_camera_number-1)+".jpg",cfg.ftpserver,cfg.ftpserverDestFolder,cfg.ftpserverLogin,cfg.ftpserverPassowd,False,cfg.use_thread_for_sending_to_server)              
                        
                if ( cfg.logdata and  globalvars.meteo_data.last_measure_time != None and  globalvars.meteo_data.status == 0 ) :
                    log("\033[01;34mLogging data to webserver\033[00;37m")
                    logData(cfg.serverfile,cfg.SMSPwd)
                    
                if ( cfg.WeatherUnderground_logdata and  globalvars.meteo_data.last_measure_time != None and  globalvars.meteo_data.status == 0 ) :
                    log("Logging data to Wunderground ...")
                    logDataToWunderground(cfg.WeatherUnderground_ID,cfg.WeatherUnderground_password,cfg.wind_speed_units)   
                    

                if ( cfg.upload_data and  globalvars.meteo_data.last_measure_time != None and  globalvars.meteo_data.status == 0 ) :
                    log("Uploading data ...")
                    UploadData(cfg)     
                    
                if ( cfg.CWOP_logdata and  globalvars.meteo_data.last_measure_time != None and  globalvars.meteo_data.status == 0 ) : 
                    logDataToCWOP(cfg.CWOP_ID,cfg.CWOP_password,cfg.location_latitude,cfg.location_longitude,v)
            
                if ( cfg.PWS_logdata and  globalvars.meteo_data.last_measure_time != None and  globalvars.meteo_data.status == 0 ) :
                    log("Logging data to PWS ...")
                    logDataToPWS(cfg.PWS_ID,cfg.PWS_password,cfg.wind_speed_units)  
                    
                if ( cfg.WindFinder_logdata and  globalvars.meteo_data.last_measure_time != None and  globalvars.meteo_data.status == 0 ) : 
                    sentToWindFinder(cfg.WindFinder_ID,cfg.WindFinder_password)
            
                thenewIP = getPublicIP()
                if ( thenewIP != None and publicIP != thenewIP ):
                    publicIP = thenewIP
                    publicIP = getPublicIP()
                    log("Public IP : " + publicIP)
                    if ( cfg.use_mail and cfg.mail_ip ):
                        if ( IP == None ):
                            IP = "None" 
                        SendMail(cfg,"My IP has changed","Local IP :" + IP + " Public IP : " + publicIP,"")
                    if ( cfg.use_DNSExit):
                        DNSExit(cfg.DNSExit_uname,cfg.DNSExit_pwd,cfg.DNSExit_hname)
                
                # Set Time from NTP ( using a thread to avoid strange freezing )
                if ( cfg.set_system_time_from_ntp_server_at_startup ):
                    _thread.start_new_thread(SetTimeFromNTP, (cfg.ntp_server,)) 

            else:
                log("Error. Non internet connection available")

        #if cfg.use_wind_sensor:
        #    if ( not sensor_thread.isAlive()):
        #        log("Error : Something wrong with sensors .. restarting ws")
        #        systemRestart()     


        disk_space = disk_free()/1000000
        log("Disk space left = %d Mb" % disk_space)
        
        globalvars.WatchDogTime = datetime.datetime.now()
        
        if ( plugin_sync != None ):
            plugin_sync.run_after()
            
        if ( cfg.WebCamInterval != 0):
            tosleep = cfg.WebCamInterval-(datetime.datetime.now()-last_data_time).seconds
            #globalvars.meteo_data.timetoupload = tosleep
            if ( tosleep > 30):
                log("Sleeping %s seconds" % tosleep)
                time.sleep(tosleep)
        
        else:
            log("Sleeping 1000 seconds")
            time.sleep(30)  
            
        # Delete pictures
        if ( cfg.delete_images_on_sd ) :
            if  globalvars.takenPicture.img1FileName != None  :
                deleteFile(globalvars.takenPicture.img1FileName)
            if  globalvars.takenPicture.img2FileName != None  :
                deleteFile(globalvars.takenPicture.img2FileName)
            if (  globalvars.takenPicture.fotos != None  ):
                for foto in globalvars.takenPicture.fotos :
                    deleteFile(foto)
            if  globalvars.takenPicture.cPIFilemane != None  :
                log("delete img")
                #deleteFile(globalvars.takenPicture.cPIFilemane)
            if ( globalvars.takenPicture.img1IPFileName != None ) :
                deleteFile(globalvars.takenPicture.img1IPFileName)
            if ( globalvars.takenPicture.img2IPFileName != None ) :
                deleteFile(globalvars.takenPicture.img2IPFileName)
                
    except KeyboardInterrupt:
        if cfg.usedongle and dongle_detected:
            modem.prober.stop()
        if ( cfg.useradio):
            radio.stop()
        sensor_thread.stop()
        exit(0)
    
    except Exception as e:
        print (e)
        print (e.__class__.__name__)
