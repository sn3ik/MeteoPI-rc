###################################################
#                                                 #
#     MeteoPI                                     #
#     by F.C. - sn3ik@hotmail.com                 #
#                                                 #
###################################################

from picamera import PiCamera
from os import system
from time import sleep
import sys
from fractions import Fraction
#print (sys.argv[1], sys.argv[2])
sn = int(sys.argv[1])
height = int(sys.argv[2])
width = int(sys.argv[3])
imgq = int(sys.argv[4])
rng = int(sys.argv[5])
interval = int(sys.argv[6])

#height = 1920
#width = 1080
#imgq = 100
#rng = 10
#interval = 60
def log(message) :
    print (datetime.datetime.now().strftime("[%d/%m/%Y-%H:%M:%S] [TIMELAPSE____] -") , message)

camera = PiCamera()
#picamera.CAPTURE_TIMEOUT = 60
camera.resolution = (height, width)
if (sn == 0):
    #sun
    camera.exposure_mode = 'auto'

else:
    #night
    #camera.exposure_mode = 'night'
    camera.iso = 800
    camera.framerate = Fraction(1, 10)
    camera.shutter_speed = 9000000
    #camera.framerate = Fraction(1, 6)
    #camera.sensor_mode = 3
    #camera.shutter_speed = 6000000
    #camera.iso = 1600 #100-1600
    #camera.exposure_mode = 'off'
    

for i in range(rng):
        camera.capture('timelapse/tl_{0:04d}.jpg'.format(i),quality=imgq)
        #log(str(i) + " of " + str(rng))
        sleep(interval)
        #print(camera.exposure_mode)
        #print(camera.shutter_speed)
        #print(camera.iso)

system('sudo rm timelapse/tl_0000.jpg')
system('convert -delay 10 -loop 0 timelapse/tl_*.jpg timelapse/tl_animate.gif')
system('sudo rm timelapse/*.jpg')
