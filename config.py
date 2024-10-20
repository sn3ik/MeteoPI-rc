###################################################
#                                                 #
#     MeteoPI v1.0                                #
#     by F.C. - sn3ik@hotmail.com                 #
#                                                 #
#     Thanks to Sint Wind PI & Tonino Tarsi       #
#                                                 #
###################################################
"""Classes and methods for handling configurationn file."""

import sys
import struct
import configparser
import sqlite3
import os
import ftplib
from PIL import Image
from PIL import ImageFont, ImageDraw, ImageOps
#import urllib2
import time

def str2bool(v):
    return str(v).lower() in ("yes", "true", "t", "1")

class config(object):
    """Class defining software configuration."""
    def __init__(self, filename,verbose=False):
        
        self.cfgName = filename
        self.readCfg(verbose)
        
    def readCfg(self,verbose=False):
        
        #config = myconfigparser(verbose)
        config = configparser.ConfigParser()
        
        if (  os.path.isfile(self.cfgName) ):
            config.read(self.cfgName)
            
        #print(config.get('General','station_name'))
            
        #[General]
        self.station_name = config.get('General', 'station_name')
        self.set_system_time_from_ntp_server_at_startup = config.getboolean('General', 'set_sistem_time_from_ntp_server_at_startup')
        self.ntp_server = config.get('General', 'ntp_server')
        self.reboot_at = config.get('General', 'reboot_at')
        self.shutdown_at = config.get('General', 'shutdown_at')
        self.shutdown_hour_before_sunset = config.get('General', 'shutdown_hour_before_sunset')
        self.location_latitude = config.getfloat('General', 'location_latitude')
        self.location_longitude = config.getfloat('General', 'location_longitude')
        self.location_altitude = config.getfloat('General', 'location_altitude')
        self.wifi_reset_if_down = config.getboolean('General', 'wifi_reset_if_down')
        self.cloudbase_calib = config.getfloat('General', 'cloudbase_calib')
        self.set_time_at_boot = config.get('General', 'set_time_at_boot')
        self.wind_speed_units = config.get('General', 'wind_speed_units')
        self.ntp_url=config.get('General', 'ntp_url')
        #self.seconds_after_sunset_for_night = config.getint('General', 'seconds_after_sunset_for_night',3600)

        #[Security]
        self.SMSPwd = config.get('Security', 'web_pwd')

        #[DataLogging]
        self.logdata_internal = config.getboolean('DataLogging', 'logdata_internal')
        self.logdata = config.getboolean('DataLogging', 'logdata_external')
        self.serverfile = config.get('DataLogging', 'serverfile')

        #[Upload]
        self.upload_data = config.getboolean('Upload', 'upload_data')
        self.upload_folder = config.get('Upload', 'upload_folder')

        # [Sensors]
        self.sensor_type = config.get('Sensors', 'sensor_type')
        #self.davis_error= config.getint('Sensors', 'davis_error')
        self.use_wind_sensor = config.getboolean('Sensors', 'use_wind_sensor')
        self.number_of_measure_for_wind_dir_average =  config.getint('Sensors', 'number_of_measure_for_wind_dir_average')
        self.windspeed_offset = config.getfloat('Sensors', 'windspeed_offset')
        self.windspeed_gain = config.getfloat('Sensors', 'windspeed_gain')
        self.windmeasureinterval = config.getint('Sensors', 'windmeasureinterval')
        self.use_bmp085 = config.getboolean('Sensors', 'use_bmp085')
        self.use_bme280 = config.getboolean('Sensors', 'use_bme280')
        self.use_tsl2591 = config.getboolean('Sensors', 'use_tsl2591')
        self.use_sds011 = config.getboolean('Sensors', 'use_sds011')
        self.use_tmp36 = config.getboolean('Sensors', 'use_tmp36')
        self.use_dht = config.getboolean('Sensors', 'use_dht')
        self.dht_type = config.get('Sensors', 'dht_type')
        self.number_of_measure_for_wind_trend = config.getint('Sensors', 'number_of_measure_for_wind_trend')
        self.wind_trend_limit = config.getfloat('Sensors', 'wind_trend_limit')
        self.number_of_measure_for_wind_average_gust_calculation =  config.getint('Sensors', 'number_of_measure_for_wind_average_gust_calculation')
        self.sensor_temp_out =   config.get('Sensors', 'sensor_temp_out')
        self.sensor_temp_in =   config.get('Sensors', 'sensor_temp_in')
        self.solarsensor =   config.getboolean('Sensors', 'solarsensor')
        self.uvsensor =   config.getboolean('Sensors', 'uvsensor')

        # [Sensor_PCE-FWS20]
        self.set_system_time_from_WeatherStation = config.getboolean('Sensor_PCE-FWS20', 'set_system_time_from_WeatherStation')

        # [Sensor_serial]
        self.sensor_serial_port = config.get('Sensor_serial', 'sensor_serial_port')

        # [Sensor_NEVIO8-16]
        
        # [RTL-SDR]
        self.rtlsdr_frequency = config.getint('RTL-SDR', 'rtlsdr_frequency')
        self.rtlsdr_bdl = config.getint('RTL-SDR', 'rtlsdr_bdl')
        self.rtlsdr_ppm = config.getint('RTL-SDR', 'rtlsdr_ppm')
        self.rtlsdr_timesync = config.getboolean('RTL-SDR', 'rtlsdr_timesync')

        #[WebCam]
        self.webcamDevice1 = config.get('WebCam', 'webcamDevice1')
        self.webcamDevice2 = config.get('WebCam', 'webcamDevice2')
        self.webcamLogo = config.get('WebCam', 'webcamLogo')
        self.sendImagesToServer = config.getboolean('WebCam', 'sendImagesToServer')
        self.WebCamInterval = config.getint('WebCam', 'WebCamInterval')
        self.webcamdevice1captureresolution = config.get('WebCam', 'webcamdevice1captureresolution')
        self.webcamdevice2captureresolution = config.get('WebCam', 'webcamdevice2captureresolution')
        self.webcamdevice1finalresolution = config.get('WebCam', 'webcamdevice1finalresolution')
        self.webcamdevice2finalresolution = config.get('WebCam', 'webcamdevice2finalresolution')
        self.sendallimagestoserver = config.getboolean('WebCam', 'sendallimagestoserver')
        self.delete_images_on_sd = config.getboolean('WebCam', 'delete_images_on_sd')
        self.captureprogram = config.get('WebCam', 'captureprogram')

        #[Camera]
        self.usecameradivice = config.getboolean('Camera', 'usecameradivice')
        self.cameradivicefinalresolution = config.get('Camera', 'cameradivicefinalresolution')
        self.gphoto2options = config.get('Camera', 'gphoto2options')
        self.gphoto2options_Night = config.get('Camera', 'gphoto2options_Night')
        self.reset_usb = config.getboolean('Camera', 'reset_usb')
        self.clear_all_sd_cards_at_startup = config.getboolean('Camera', 'clear_all_sd_cards_at_startup')
        self.start_camera_number = config.getint('Camera', 'start_camera_number')
        self.gphoto2_capture_image_and_download = config.getboolean('Camera', 'gphoto2_capture_image_and_download')
        self.use_camera_resetter = config.getboolean('Camera', 'use_camera_resetter')
        self.camera_resetter_normaly_on = config.getboolean('Camera', 'camera_resetter_normaly_on')
        self.on_off_camera = config.getboolean('Camera', 'on_off_camera')

        self.webcamdevice1captureresolutionX = int(self.webcamdevice1captureresolution.split('x')[0])
        self.webcamdevice1captureresolutionY = int(self.webcamdevice1captureresolution.split('x')[1])
        self.webcamdevice1finalresolutionX = int(self.webcamdevice1finalresolution.split('x')[0])
        self.webcamdevice1finalresolutionY = int(self.webcamdevice1finalresolution.split('x')[1])       
        self.webcamdevice2captureresolutionX = int(self.webcamdevice2captureresolution.split('x')[0])
        self.webcamdevice2captureresolutionY = int(self.webcamdevice2captureresolution.split('x')[1])
        self.webcamdevice2finalresolutionX = int(self.webcamdevice2finalresolution.split('x')[0])
        self.webcamdevice2finalresolutionY = int(self.webcamdevice2finalresolution.split('x')[1])
        self.cameradivicefinalresolutionX = int(self.cameradivicefinalresolution.split('x')[0])
        self.cameradivicefinalresolutionY = int(self.cameradivicefinalresolution.split('x')[1])
        
        #[CameraPI]
        self.use_cameraPI = config.getboolean('CameraPI', 'use_cameraPI')
        self.cameraPI_day_settings = config.get('CameraPI', 'cameraPI_day_settings')
        self.cameraPI_night_settings = config.get('CameraPI', 'cameraPI_night_settings')
        self.cameraPI_timelapse = config.getboolean('CameraPI', 'cameraPI_timelapse')
        self.cameraPI_timelapse_settings = config.get('CameraPI', 'cameraPI_timelapse_settings')
                        
        self.cameradivicefinalresolutionX = int(self.cameradivicefinalresolution.split('x')[0])
        self.cameradivicefinalresolutionY = int(self.cameradivicefinalresolution.split('x')[1])

        # [ftp]
        self.ftpserver = config.get('ftp', 'ftpserver')
        self.ftpserverDestFolder = config.get('ftp', 'ftpserverDestFolder')
        self.ftpserverLogin = config.get('ftp', 'ftpserverLogin')
        self.ftpserverPassowd = config.get('ftp', 'ftpserverPassowd')
        self.use_thread_for_sending_to_server = config.getboolean('ftp', 'use_thread_for_sending_to_server')

        # [Mail]
        self.gmail_user = config.get('Mail', 'gmail_user')
        self.gmail_pwd = config.get('Mail', 'gmail_pwd')
        self.mail_to = config.get('Mail', 'mail_to')
        self.use_mail = config.getboolean('Mail', 'use_mail')
        self.mail_ip = config.getboolean('Mail', 'mail_ip')

        #[WeatherUnderground]
        self.WeatherUnderground_logdata = config.getboolean('WeatherUnderground', 'WeatherUnderground_logdata')
        self.WeatherUnderground_ID = config.get('WeatherUnderground', 'WeatherUnderground_ID')
        self.WeatherUnderground_password = config.get('WeatherUnderground', 'WeatherUnderground_password')

        #[CWOP]
        self.CWOP_logdata = config.getboolean('CWOP', 'CWOP_logdata')
        self.CWOP_ID = config.get('CWOP', 'CWOP_ID')
        self.CWOP_password = config.get('CWOP', 'CWOP_password')
    
        #[WindFinder]
        self.WindFinder_logdata = config.getboolean('WindFinder', 'WindFinder_logdata')
        self.WindFinder_ID = config.get('WindFinder', 'WindFinder_ID')
        self.WindFinder_password = config.get('WindFinder', 'WindFinder_password')
        
        #[PWS]
        self.PWS_logdata = config.getboolean('PWS', 'PWS_logdata')
        self.PWS_ID = config.get('PWS', 'PWS_ID')
        self.PWS_password = config.get('PWS', 'PWS_password')

        #[DNS Exit]
        self.use_DNSExit = config.getboolean('DNSExit', 'use_DNSExit')
        self.DNSExit_uname = config.get('DNSExit', 'DNSExit_uname')
        self.DNSExit_pwd = config.get('DNSExit', 'DNSExit_pwd')
        self.DNSExit_hname = config.get('DNSExit', 'DNSExit_hname')       

        #[IP CAM]
        self.IPCamInterval = config.getint('IPCam', 'IPCamInterval')
        self.IPCamCfg = config.get('IPCam', 'IPCamCfg')
        self.IPCamIP1 = config.get('IPCam', 'IPCamIP1')
        self.IPCamUS1 = config.get('IPCam', 'IPCamUS1')
        self.IPCamPW1 = config.get('IPCam', 'IPCamPW1')
        self.IPCamSN1 = config.get('IPCam', 'IPCamSN1')
        self.IPCamIP2 = config.get('IPCam', 'IPCamIP2')      
        self.IPCamUS2 = config.get('IPCam', 'IPCamUS2')
        self.IPCamPW2 = config.get('IPCam', 'IPCamPW2')
        self.IPCamSN2 = config.get('IPCam', 'IPCamSN2')
        self.IPCamZZZ = config.getint('IPCam', 'IPCamZZZ')                
        self.IPCamPosN = config.get('IPCam', 'IPCamPosN')
        self.IPCamPosNE = config.get('IPCam', 'IPCamPosNE')  
        self.IPCamPosE = config.get('IPCam', 'IPCamPosE')    
        self.IPCamPosSE = config.get('IPCam', 'IPCamPosSE')  
        self.IPCamPosS = config.get('IPCam', 'IPCamPosS')    
        self.IPCamPosSW = config.get('IPCam', 'IPCamPosSW')  
        self.IPCamPosW = config.get('IPCam', 'IPCamPosW')    
        self.IPCamPosNW = config.get('IPCam', 'IPCamPosNW')                 
        
if __name__ == '__main__':
    #configfile = 'meteopi.cfg'
    #cfg = config(configfile,False)
    pass
