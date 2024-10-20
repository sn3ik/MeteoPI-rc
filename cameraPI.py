###################################################
#                                                 #
#     MeteoPI                                     #
#     by F.C. - sn3ik@hotmail.com                 #
#                                                 #
#     Thanks to Sint Wind PI & Tonino Tarsi       #
#                                                 #
###################################################
"""Classes and methods for handling cameraPI commands."""

import sqlite3
from PIL import Image
from PIL import ImageFont
from PIL import ImageDraw
import time
import os
from TTLib  import *
import sun
import math
import subprocess

class cameraPI(object):
    """Class defining generic webcams."""
    
    def log(message) :
        print (datetime.datetime.now().strftime("[%d/%m/%Y-%H:%M:%S] [CAMERAPI_____] -") , message)

    def __init__(self, cfg):
        self.cfg = cfg
        self.god=sun.sun(lat=cfg.location_latitude,long=cfg.location_longitude)
    
    def detect_cameraPI(self):
        #cmd = ['vcgencmd', 'get_camera']
        #p = subprocess.Popen(cmd, stdout=subprocess.PIPE,stderr=subprocess.PIPE,stdin=subprocess.PIPE)
        #out, err = p.communicate('foo\nfoofoo\n')
        #if ( out.find("detected=1") == -1  ) :
        #    return False
        #else:
        #    return True
        return True

    def timelapse(self):
        if ( not self.detect_cameraPI() ) :
            log("ERROR CameraPI not detected")
            return False        
        try:
            if ( self.god.daylight() ):
                log("Using Dayligth settings")
                option = self.cfg.cameraPI_timelapse_settings
                #os.system( "sudo rm timelapse/tl_*" )
                os.system( "sudo python3 timelapse.py 0 " + option)
                return True
            else:
                log("Using Nigth settings")
                option = self.cfg.cameraPI_timelapse_settings
                os.system( "sudo python3 timelapse.py 1 " + option)
                return True
        except ValueError:
                log( "ERROR in capturing cameraPI image on : " + self.device )
                return False

    def capture(self,filename):
        if ( not self.detect_cameraPI() ) :
            log("ERROR CameraPI not detected")
            return False
        if ( self.god.daylight() ):
            options = self.cfg.cameraPI_day_settings
            log("Using Dayligth settings" + options)
        else:
            options = self.cfg.cameraPI_night_settings
            log("Using Nigth settings" + options)
        try:
            if options.upper() == "NONE":
                log("CameraPI not active")
                return False
            snapCommand = "raspistill  %s -o %s" %  (options,filename)
            #log( "Getting images with command : " + snapCommand)
            os.system(snapCommand )

            if ( not os.path.isfile(filename)):
                log( "ERROR in capturing webcam image on : " + self.device )
                return False
                    
            return True
        except ValueError:
            log( " ERROR in capturing cameraPI image on : " + self.device )
            return False

