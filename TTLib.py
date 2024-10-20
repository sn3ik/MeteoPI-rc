###################################################
#                                                 #
#     MeteoPI                                     #
#     by F.C. - sn3ik@hotmail.com                 #
#                                                 #
#     Thanks to Sint Wind PI & Tonino Tarsi       #
#                                                 #
###################################################
#                      Generic function Library

import ftplib
#import urllib2
import os
import datetime
import socket
from PIL import Image
from PIL import ImageFont
from PIL import ImageDraw
import time
import datetime
import config
import globalvars
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.base import MIMEBase
from email.mime.text import MIMEText
from email import encoders
import urllib
import cmath ,math
import json
import tempfile
#import sensors.sensor_simulator
import ntplib
import tarfile
import _thread
import os
import requests
import subprocess
import version
import base64
import re
import sensors.sensor_thread
import threading
import json


socket.setdefaulttimeout(30)

def encode(key, clear):
    enc = []
    for i in range(len(clear)):
        key_c = key[i % len(key)]
        enc_c = chr((ord(clear[i]) + ord(key_c)) % 256)
        enc.append(enc_c)
    return base64.urlsafe_b64encode("".join(enc))

def decode(key, enc):
    dec = []
    enc = base64.urlsafe_b64decode(enc)
    for i in range(len(enc)):
        key_c = key[i % len(key)]
        dec_c = chr((256 + ord(enc[i]) - ord(key_c)) % 256)
        dec.append(dec_c)
    return "".join(dec)

def get_cpu_temperature():
    process = subprocess.Popen(['vcgencmd', 'measure_temp'], stdout=subprocess.PIPE)
    output, _error = process.communicate()
    return float(output[output.index('=') + 1:output.rindex("'")])

def getfiles_bydate(dirpath):
    a = [s for s in os.listdir(dirpath)
         if os.path.isfile(os.path.join(dirpath, s))]
    a.sort(key=lambda s: os.path.getmtime(os.path.join(dirpath, s)))
    return a

def isMountReadonly(mnt):
    with open('/proc/mounts') as f:
        for line in f:
            device, mount_point, filesystem, flags, __, __ = line.split()
            flags = flags.split(',')
            if mount_point == mnt:
                return 'ro' in flags
        raise ValueError('mount "%s" doesn\'t exist' % mnt)


def disk_free():
    """Return disk usage statistics about the given path.

    Returned valus is a named tuple with attributes 'total', 'used' and
    'free', which are the amount of total, used and free space, in bytes.
    """
    #print "read only: %s" % isMountReadonly('/mnt')
    if ( os.path.isdir("/meteopi") ):
        path = "/meteopi"
    else:
        path = "/"
    st = os.statvfs(path)
    free = st.f_bavail * st.f_frsize
    #total = st.f_blocks * st.f_frsize
    #used = (st.f_blocks - st.f_bfree) * st.f_frsize
    return free

def linreg(X, Y):
    N = len(X)
    Sx = Sy = Sxx = Syy = Sxy = 0.0
    for x, y in zip(X, Y):
        Sx = Sx + x
        Sy = Sy + y
        Sxx = Sxx + x*x
        #Syy = Syy + y*y
        Sxy = Sxy + x*y
    det = Sxx * N - Sx * Sx
    return (Sxy * N - Sy * Sx)/det


class RingBuffer(object):
    def __init__(self, size):
        self.data = [None for i in range(size)]

    def append(self, x):
        self.data.pop(0)
        self.data.append(x)

    def get(self):
        return self.data

    def getMean(self):
        i = 0
        s = 0
        for val in self.data:
            if val != None:
                #print val
                i = i+1
                s = s+val
        if ( i == 0 ):
            return None
        else:
            return (s/float(i))

    def getMeanDir(self):
        s = 0
        for val in self.data:
            if val != None:
                s = s + cmath.rect(1, math.radians(val))
        return math.degrees(cmath.phase(s))


    def getMeanMax(self):
        i = 0
        s = 0
        maxval = None
        for val in self.data:
            if val != None:
                #print val
                i = i+1
                s = s+val
                if ( maxval == None ):
                    maxval = val
                else:
                    maxval = max(maxval,val)
        if ( i == 0 ):
            return None,None
        else:
            return (s/float(i)),maxval

    def getTrend(self):
        if self.get()[0] == None:
            return None
        reg = linreg(range(len(self.get())),self.get())
        #print self.get()
        #print reg
        if ( reg != None):
            return reg * 60
        else:
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



def deleteFile(file):
    try:
        os.remove(file)
        log("Deleted file : " + file )
    except:
        log("File not found : " + file )
        pass

def SetTimeFromNTP(ntp_server):
    try:
        c = ntplib.NTPClient()
        date_str = c.request(ntp_server, version=3,timeout=10)
        if (date_str != None ):
            os.system("sudo date -s '%s' 1> /dev/null" %  time.ctime(date_str.tx_time))
            log("System time adjusted from NTP server : " + ntp_server + ": " + time.ctime(date_str.tx_time))
            globalvars.TimeSetFromNTP = True
            return True
        return False
    except:
        log("ERROR - Failed to set time system from ntp server")
        cfg = config.config('meteopi.cfg')
        if (cfg.ntp_url!='None'):
                date_str = requests.get(cfg.ntp_url,timeout=10).text
                if (date_str != None ):
                    log("Date : " + date_str)
                    os.system("sudo date -s '%s'" % date_str)
                    log("adjusted from : " + cfg.ntp_url)
                    return True
        return False

def DNSExit(uname,pwd,hname):
    ip = getPublicIP()
    if ( ip == None):
        return
    params = {
        'login':uname,
        'password':pwd,
        'host':hname,
        'myip':ip}
    posturl = "http://update.dnsexit.com/RemoteUpdate.sv"

    try:
        r = requests.get(posturl, params=params,timeout=10)
        log("DNS Exit -: " +  r.text)
        return True
    except:
        log("Error DNS Exit"  )
        return False

    return True

def logDataToCWOP(CWOP_ID,CWOP_password,location_latitude,location_longitude,swpi_version=""):
    # http://pond1.gladstonefamily.net:8080/aprswxnet.html
    log("Logging to CWOP server ...")
    if ( globalvars.meteo_data.last_measure_time == None):
        return False

    delay = (datetime.datetime.now() - globalvars.meteo_data.last_measure_time)
    delay_seconds = int(delay.total_seconds())

    if ( delay_seconds > 120 ):
        return False

    send = ""
    send += CWOP_ID
    send += ">APRS,TCPXX*:"

    d = (datetime.datetime.utcnow())
    aprs_time = d.strftime("%d%H%M")
    send += "/" + aprs_time + "z"

    lat = abs(location_latitude)
    d = int(lat)
    p = (lat-d)*60
    location = "%2d%5.2f" % (d,p)
    if (location_latitude) > 0:
        location += "N"
    else:
        location += "S"

    location += "/"

    lon = abs(location_longitude)
    d = int(lon)
    p = (lon-d)*60
    location += "%03d%5.2f" % (d,p)
    if (location_longitude) > 0:
        location += "E"
    else:
        location += "W"

    send += location

    if ( globalvars.meteo_data.wind_dir != None):
        direction = "%03.0f" % float(globalvars.meteo_data.wind_dir)
        send += "_"+direction

    # average wind speed
    if (globalvars.meteo_data.wind_ave != None):
        wind_speed =  globalvars.meteo_data.wind_ave *  0.621371192
        wind_str = '/' + "%03.0f" % wind_speed
        send += wind_str

    # wind gust
    if (globalvars.meteo_data.wind_gust != None ):
        wind_gust= globalvars.meteo_data.wind_gust * 0.621371192
        wind_gust_str = 'g' + "%03.0f" % wind_gust
        send += wind_gust_str

    # temp
    if ( globalvars.meteo_data.temp_out != None):
        temp_in_f = ( globalvars.meteo_data.temp_out * 1.8 ) + 32
        temp_str = "t" + "%03.0f" % temp_in_f
        send += temp_str

    # rain last hour -- each count is 0.0204"
    if (globalvars.meteo_data.rain_rate_1h != None):
        rain_hr_hundredth_inches = float(globalvars.meteo_data.rain_rate_1h * 3.9370078)
        rain_hr_str = "r" + "%03d" % rain_hr_hundredth_inches
        send += rain_hr_str

    # rain last 24 hours -- each count is 0.0204"
    # so the math accidentally scales perfect -- report in hundreths of inches
    if (globalvars.meteo_data.rain_rate_24h != None) :
        rain_24_hrs_hundredth_inches = float(globalvars.meteo_data.rain_rate_24h * 3.9370078)
        rain_24_hrs_str = "p" + "%03d" % rain_24_hrs_hundredth_inches
        send += rain_24_hrs_str

    # skip rain since midnight
    if (globalvars.meteo_data.rain_rate != None ) :
        rain_today_hundredth_inches = float(globalvars.meteo_data.rain_rate * 3.9370078)
        rain_midnight_str = "P" + "%03d" % rain_today_hundredth_inches
        send += rain_midnight_str

    # humidity
    if (globalvars.meteo_data.hum_out != None):
        rh = float(globalvars.meteo_data.hum_out / 100 )
        if rh >= 0.995:
            humid_str = "h00"
        else:
            humid_str = "h" + "%02.0f" % (globalvars.meteo_data.hum_out)
        send += humid_str

    # barometric pressure (in tenths of millibars)
    if (globalvars.meteo_data.rel_pressure != None ) :
        baro = float(globalvars.meteo_data.rel_pressure  *    10)
        baro_str = "b" + "%05.0f"%baro
        send += baro_str

    # equipment used
    equip_str = ".Meteo PI - "+swpi_version
    send += equip_str

    #log(send)

    # Don't send errors in the case that connect fails...
    try:
        HOST = 'cwop.aprs.net'
        PORT = 14580
        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        s.connect((HOST,PORT))
        s.send('user '+ CWOP_ID +' pass ' + CWOP_password + ' vers linux-1wire 1.00\r\n')
        time.sleep(3)
        s.send(send+'\r\n')
        s.close()
        log(CWOP_ID + " Ok")
    except:
        log(CWOP_ID + " ERROR")
        s.close()
        return False

    return True


def logDataToWunderground(ID,password,wind_speed_units="kmh"):

    if ( globalvars.meteo_data.last_measure_time == None):
        return

    delay = (datetime.datetime.now() - globalvars.meteo_data.last_measure_time)
    delay_seconds = int(delay.total_seconds())

    if ( delay_seconds > 120 ):
        return

    serverfile = "http://weatherstation.wunderground.com/weatherstation/updateweatherstation.php"

    parameters = {}
    parameters['action'] = "updateraw"
    parameters['ID'] = ID
    parameters['PASSWORD'] = password
    parameters['dateutc'] = str(datetime.datetime.utcnow())

    if globalvars.meteo_data.wind_dir != None :  parameters['winddir'] = int(globalvars.meteo_data.wind_dir)
    if ( wind_speed_units == "kmh" ):
        if globalvars.meteo_data.wind_ave != None :  parameters['windspeedmph'] = "{:.2f}".format(globalvars.meteo_data.wind_ave *  0.621371192)
        if globalvars.meteo_data.wind_gust != None :  parameters['windgustmph'] = "{:.2f}".format(globalvars.meteo_data.wind_gust * 0.621371192)
    else:
        if globalvars.meteo_data.wind_ave != None :  parameters['windspeedmph'] = "{:.2f}".format((globalvars.meteo_data.wind_ave / 0.539956803456  ) *  0.621371192)
        if globalvars.meteo_data.wind_gust != None :  parameters['windgustmph'] = "{:.2f}".format((globalvars.meteo_data.wind_gust / 0.539956803456  ) * 0.621371192)
    if globalvars.meteo_data.hum_out != None :  parameters['humidity'] = "{:.1f}".format(globalvars.meteo_data.hum_out )
    if globalvars.meteo_data.temp_out != None :  parameters['tempf'] = "{:.2f}".format(( globalvars.meteo_data.temp_out * 1.8 ) + 32)
    if globalvars.meteo_data.rel_pressure != None :  parameters['baromin'] = "{:.4f}".format(globalvars.meteo_data.rel_pressure  *    0.0295299830714) #new
    if globalvars.meteo_data.dew_point != None :  parameters['dewptf'] = "{:.2f}".format(( globalvars.meteo_data.dew_point * 1.8 ) + 32)
    if globalvars.meteo_data.rain_rate != None :  parameters['dailyrainin'] = "{:.4f}".format(globalvars.meteo_data.rain_rate  * 0.0393700787)
    if globalvars.meteo_data.rain_rate_1h != None :  parameters['rainin'] = "{:.4f}".format(globalvars.meteo_data.rain_rate_1h  * 0.0393700787)
    cfg = config.config('swpi.cfg')
    if ( cfg.solarsensor == True ):
        if globalvars.meteo_data.illuminance != None :  parameters['solarradiation'] = globalvars.meteo_data.illuminance
    if ( cfg.uvsensor == True ):
        if globalvars.meteo_data.uv != None :  parameters['UV'] = globalvars.meteo_data.uv

    parameters['softwaretype'] = "Sint Wind PI"

    #print  parameters
    try:
        r = requests.get(serverfile, params=parameters,timeout=10)
        msg = r.text.splitlines()
        log("Log to Wunderground : " +  msg[0])
    except:
        log(  "Error Logging to Wunderground : "  )



def logDataToPWS(ID,password,wind_speed_units="kmh"):

    if ( globalvars.meteo_data.last_measure_time == None):
        return

    delay = (datetime.datetime.now() - globalvars.meteo_data.last_measure_time)
    delay_seconds = int(delay.total_seconds())

    #if ( delay_seconds > 120 ):
    #    return

    weather = ""
    
    if (globalvars.meteo_data.rain_rate_1h != None and globalvars.meteo_data.cloud_base_altitude != None):
        if ( globalvars.meteo_data.rain_rate_1h > 0 and globalvars.meteo_data.cloud_base_altitude < 600):
           weather = "RA"
        elif ( globalvars.meteo_data.cloud_base_altitude < 600):
                 weather = "OVC"
        elif ( globalvars.meteo_data.cloud_base_altitude > 600 and globalvars.meteo_data.cloud_base_altitude < 900):
                 weather = "FEW" 
        elif ( globalvars.meteo_data.cloud_base_altitude > 900 and globalvars.meteo_data.cloud_base_altitude < 1000):
                 weather = "SCT"
        else:
           weather = "SKC"

    serverfile = "https://pwsupdate.pwsweather.com/api/v1/submitwx"

    url = serverfile
    url = url  + "?ID=" + ID
    url = url  + "&PASSWORD=" + password

    date = str(datetime.datetime.utcnow())
    date = date.replace(" ", "+");
    #date = date.replace(":", "%3A");
    date = date[:date.index('.')]

    url = url  + "&dateutc=" + date

    if globalvars.meteo_data.wind_dir != None :
        url = url  + "&winddir=" + str(int(globalvars.meteo_data.wind_dir))
    if ( wind_speed_units == "kmh" ):
        if globalvars.meteo_data.wind_ave != None :
            url = url  + "&windspeedmph=" + "{:.2f}".format(globalvars.meteo_data.wind_ave *  0.621371192)
        if globalvars.meteo_data.wind_gust != None :
            url = url  + "&windgustmph=" + "{:.2f}".format(globalvars.meteo_data.wind_gust * 0.621371192)
    else:
        if globalvars.meteo_data.wind_ave != None :
            url = url  + "&windspeedmph=" + "{:.2f}".format((globalvars.meteo_data.wind_ave / 0.539956803456  ) *  0.621371192)
        if globalvars.meteo_data.wind_gust != None :
            url = url  + "&windgustmph=" + "{:.2f}".format((globalvars.meteo_data.wind_gust / 0.539956803456  ) * 0.621371192)
    if globalvars.meteo_data.temp_out != None :
        url = url  + "&tempf=" + "{:.2f}".format(( globalvars.meteo_data.temp_out * 1.8 ) + 32)
    if globalvars.meteo_data.rain_rate_1h != None :
        url = url  + "&rainin=" + "{:.4f}".format(globalvars.meteo_data.rain_rate_1h  * 0.0393700787)
    if globalvars.meteo_data.rain_rate != None :
        url = url  + "&dailyrainin=" + "{:.4f}".format(globalvars.meteo_data.rain_rate  * 0.0393700787)
    if globalvars.meteo_data.rel_pressure != None :
        url = url  + "&baromin=" + "{:.4f}".format(globalvars.meteo_data.rel_pressure  *    0.0295299830714)
    if globalvars.meteo_data.dew_point != None :
        url = url  + "&dewptf=" + "{:.2f}".format(( globalvars.meteo_data.dew_point * 1.8 ) + 32)
    if globalvars.meteo_data.hum_out != None :
        url = url  + "&humidity=" + "{:.1f}".format(globalvars.meteo_data.hum_out )
    url = url + "&weather=" + weather 
    if globalvars.meteo_data.illuminance != None :
        url = url + "&solarradiation=" + "{:.1f}".format(globalvars.meteo_data.illuminance * 0.0079) 
    if globalvars.meteo_data.uv != None :
        url = url  + "&uv=" + "{:.1f}".format(globalvars.meteo_data.uv )    
    url = url + "&softwaretype=" + "MeteoPI"
    url = url + "&action=updateraw"
    #log(url)

    try:
        #r = requests.get(serverfile, params=parameters,timeout=10)
        r = requests.get(url)
        #print r.text
        msg = r.text
        #data = json.loads(msg)
        #value = data.get("success")
        log("Log to PWS success!")
    except:
        log("Error Logging to PWS " + msg)



def logData(serverfile,SMSPwd):

    if ( globalvars.meteo_data.last_measure_time == None):
        return

    delay = (datetime.datetime.now() - globalvars.meteo_data.last_measure_time)
    delay_seconds = int(delay.total_seconds())
    #log( "Delay second : %.1f" % delay )

    #if ( delay_seconds > 120 ):
    #    return

    mydata = {}
    mydata['pwd'] = SMSPwd
    mydata['last_measure_time'] = NoneToNull(globalvars.meteo_data.last_measure_time)
    mydata['idx'] = NoneToNull(globalvars.meteo_data.idx)
    mydata['wind_dir_code'] = NoneToNull(globalvars.meteo_data.wind_dir_code)
    mydata['wind_dir'] = NoneToNull(globalvars.meteo_data.wind_dir)
    mydata['wind_ave'] = NoneToNull(globalvars.meteo_data.wind_ave)
    mydata['wind_gust'] = NoneToNull(globalvars.meteo_data.wind_gust)
    mydata['temp_out'] = NoneToNull(globalvars.meteo_data.temp_out)
    mydata['abs_pressure'] = NoneToNull(globalvars.meteo_data.abs_pressure)
    mydata['rel_pressure'] = NoneToNull(globalvars.meteo_data.rel_pressure)
    mydata['hum_out'] = NoneToNull(globalvars.meteo_data.hum_out)
    mydata['rain'] = NoneToNull(globalvars.meteo_data.rain)
    mydata['rain_rate'] = NoneToNull(globalvars.meteo_data.rain_rate)
    mydata['temp_in'] = NoneToNull(globalvars.meteo_data.temp_in)
    mydata['hum_in'] = NoneToNull(globalvars.meteo_data.hum_in)
    mydata['wind_chill'] = NoneToNull(globalvars.meteo_data.wind_chill)
    mydata['temp_apparent'] = NoneToNull(globalvars.meteo_data.temp_apparent)
    mydata['dew_point'] = NoneToNull(globalvars.meteo_data.dew_point)
    mydata['uv'] = NoneToNull(globalvars.meteo_data.uv)
    mydata['illuminance'] = NoneToNull(globalvars.meteo_data.illuminance)
    mydata['winDayMin'] = NoneToNull(globalvars.meteo_data.winDayMin)
    mydata['winDayMax'] = NoneToNull(globalvars.meteo_data.winDayMax)
    mydata['winDayGustMin'] = NoneToNull(globalvars.meteo_data.winDayGustMin)
    mydata['winDayGustMax'] = NoneToNull(globalvars.meteo_data.winDayGustMax)
    mydata['TempOutMin'] = NoneToNull(globalvars.meteo_data.TempOutMin)
    mydata['TempOutMax'] = NoneToNull(globalvars.meteo_data.TempOutMax)
    mydata['TempInMin'] = NoneToNull(globalvars.meteo_data.TempInMin)
    mydata['TempInMax'] = NoneToNull(globalvars.meteo_data.TempInMax)
    mydata['UmOutMin'] = NoneToNull(globalvars.meteo_data.UmOutMin)
    mydata['UmOutMax'] = NoneToNull(globalvars.meteo_data.UmOutMax)
    mydata['UmInMin'] = NoneToNull(globalvars.meteo_data.UmInMin)
    mydata['UmInMax'] = NoneToNull(globalvars.meteo_data.UmInMax)
    mydata['PressureMin'] = NoneToNull(globalvars.meteo_data.PressureMin)
    mydata['PressureMax'] = NoneToNull(globalvars.meteo_data.PressureMax)
    mydata['wind_dir_ave'] = NoneToNull(globalvars.meteo_data.wind_dir_ave)
    mydata['rain_rate_24h'] = NoneToNull(globalvars.meteo_data.rain_rate_24h)
    mydata['rain_rate_1h'] = NoneToNull(globalvars.meteo_data.rain_rate_1h)
    mydata['lux'] = NoneToNull(globalvars.meteo_data.lux)
    mydata['luxfull'] = NoneToNull(globalvars.meteo_data.luxfull)
    mydata['ir'] = NoneToNull(globalvars.meteo_data.ir)
    mydata['pm25'] = NoneToNull(globalvars.meteo_data.pm25_max)
    mydata['pm10'] = NoneToNull(globalvars.meteo_data.pm10_max)

    #now = globalvars.meteo_data.last_measure_time
    
    url = serverfile + "?" + "pwd=" + SMSPwd
    url+= "&last_measure_time=" + globalvars.meteo_data.last_measure_time.strftime("[%d/%m/%Y-%H:%M:%S]")
    url+= "&idx=" + globalvars.meteo_data.last_measure_time.strftime("[%d/%m/%Y-%H:%M:%S]")
    url+= "&wind_dir_code=" + str(globalvars.meteo_data.wind_dir_code)
    url+= "&wind_dir=" + str(globalvars.meteo_data.wind_dir)
    url+= "&wind_ave=" + str(globalvars.meteo_data.wind_ave)
    url+= "&wind_gust=" + str(globalvars.meteo_data.wind_gust)
    url+= "&temp_out=" + str(globalvars.meteo_data.temp_out)
    url+= "&abs_pressure=" + str(globalvars.meteo_data.abs_pressure)
    url+= "&rel_pressure=" + str(globalvars.meteo_data.rel_pressure)
    url+= "&hum_out=" + str(globalvars.meteo_data.hum_out)
    url+= "&rain=" + str(globalvars.meteo_data.rain)
    url+= "&rain_rate=" + str(globalvars.meteo_data.rain_rate)
    url+= "&temp_in=" + str(globalvars.meteo_data.temp_in)
    url+= "&hum_in=" + str(globalvars.meteo_data.hum_in)
    url+= "&wind_chill=" + str(globalvars.meteo_data.wind_chill)
    url+= "&temp_apparent=" + str(globalvars.meteo_data.temp_apparent)
    url+= "&dew_point=" + str(globalvars.meteo_data.dew_point)
    url+= "&uv=" + str(globalvars.meteo_data.uv)
    url+= "&illuminance=" + str(globalvars.meteo_data.illuminance)
    url+= "&winDayMin=" + str(globalvars.meteo_data.winDayMin)
    url+= "&winDayMax=" + str(globalvars.meteo_data.winDayMax)
    url+= "&winDayGustMin=" + str(globalvars.meteo_data.winDayGustMin)
    url+= "&winDayGustMax=" + str(globalvars.meteo_data.winDayGustMax)
    url+= "&TempOutMin=" + str(globalvars.meteo_data.TempOutMin)
    url+= "&TempOutMax=" + str(globalvars.meteo_data.TempOutMax)
    url+= "&TempInMin=" + str(globalvars.meteo_data.TempInMin)
    url+= "&TempInMax=" + str(globalvars.meteo_data.TempInMax)
    url+= "&UmOutMin=" + str(globalvars.meteo_data.UmOutMin)
    url+= "&UmOutMax=" + str(globalvars.meteo_data.UmOutMax)
    url+= "&UmInMin=" + str(globalvars.meteo_data.UmInMin)
    url+= "&UmInMax=" + str(globalvars.meteo_data.UmInMax)
    url+= "&PressureMin=" + str(globalvars.meteo_data.PressureMin)
    url+= "&PressureMax=" + str(globalvars.meteo_data.PressureMax)
    url+= "&wind_dir_ave=" + str(globalvars.meteo_data.wind_dir_ave)
    url+= "&rain_rate_24h=" + str(globalvars.meteo_data.rain_rate_24h)
    url+= "&rain_rate_1h=" + str(globalvars.meteo_data.rain_rate_1h)
    url+= "&lux=" + NoneToNull(globalvars.meteo_data.lux)
    url+= "&luxfull=" + NoneToNull(globalvars.meteo_data.luxfull)
    url+= "&ir=" + NoneToNull(globalvars.meteo_data.ir)
    url+= "&pm25=" + NoneToNull(str(globalvars.meteo_data.pm25_max))
    url+= "&pm10=" + NoneToNull(str(globalvars.meteo_data.pm10_max))
    #log(url)    
    
        
    try:
        #log(mydata)
        
        
        r = requests.get(url,timeout=10)
        if ( "OK" in r.text.upper() ):
            log( "\033[0;31mData sent to server :\033[00;37m " + r.text )
        else:
            log( "\033[0;31mData sent to server :\033[00;37m Error" )

        #r = requests.post(serverfile, json=mydata)
        #log(r)
        #log( "\033[0;31mData sent to server :\033[00;37m " + r.text )
        globalvars.meteo_data.pm25_max = None
        globalvars.meteo_data.pm10_max = None
    except:
        log(  "Error connecting to server : " + serverfile )



def sentToWindFinder(WindFinder_ID,WindFinder_password):

    if ( globalvars.meteo_data.last_measure_time == None):
        return

    delay = (datetime.datetime.now() - globalvars.meteo_data.last_measure_time)
    delay_seconds = int(delay.total_seconds())

    if ( delay_seconds > 200 ):
        return

    url = "http://www.windfinder.com/wind-cgi/httpload.pl?"
    url+= "sender_id=" + WindFinder_ID
    url+= "&password=" + WindFinder_password
    url+= "&date=" + globalvars.meteo_data.last_measure_time.strftime("%d.%m.%Y")
    url+= "time=" + globalvars.meteo_data.last_measure_time.strftime("%H:%M")
    if ( globalvars.meteo_data.wind_ave ) != None :
        url+= "&windspeed=" +  str( float(globalvars.meteo_data.wind_ave)* 0.539957 )
    if ( globalvars.meteo_data.wind_gust ) != None :
        url+= "&gust==" +  str( float(globalvars.meteo_data.wind_gust)* 0.539957 )
    if ( globalvars.meteo_data.wind_dir ) != None :
        url+= "&winddir==" +  str(globalvars.meteo_data.wind_dir)
    if ( globalvars.meteo_data.temp_out ) != None :
        url+= "&airtemp==" +  str(globalvars.meteo_data.temp_out)
    if ( globalvars.meteo_data.rel_pressure ) != None :
        url+= "&pressure==" +  str(globalvars.meteo_data.rel_pressure  )


        #print  parameters
    try:
        #log(url)
        r = requests.get(url,timeout=10)
        msg = r.text.splitlines()
        #log(r.text)
        if ( "OK" in r.text.upper() ):
            log("Log to WindFinder : OK" )
        else:
            log("Log to WindFinder ERROR "  + r.text)
    except:
        log(  "Error Logging to WindFinder : "   )



def CreateMeteoJson(cfg):

    ver = version.Version("VERSION").getVersion()

    mydata = {}
    mydata['version'] = ver
    mydata['last_measure_time'] = (globalvars.meteo_data.last_measure_time.strftime("[%d/%m/%Y-%H:%M:%S]"))
    mydata['idx'] = (globalvars.meteo_data.idx.strftime("[%d/%m/%Y-%H:%M:%S]"))

    mydata['wind_dir_code'] = (globalvars.meteo_data.wind_dir_code)
    mydata['wind_dir'] = None if (globalvars.meteo_data.wind_dir == None) else float( "%.1f" %  (globalvars.meteo_data.wind_dir) )
    mydata['wind_dir_ave'] = None if (globalvars.meteo_data.wind_dir_ave == None) else float( "%.1f" %  (globalvars.meteo_data.wind_dir_ave) )
    mydata['wind_ave'] = None if (globalvars.meteo_data.wind_ave == None) else int(globalvars.meteo_data.wind_ave)
    mydata['wind_gust'] = None if (globalvars.meteo_data.wind_gust == None) else int(globalvars.meteo_data.wind_gust)

    mydata['temp_out'] = None if (globalvars.meteo_data.temp_out == None) else float( "%.1f" %  (globalvars.meteo_data.temp_out) )
    mydata['temp_in'] = None if (globalvars.meteo_data.temp_in == None) else float( "%.1f" %  (globalvars.meteo_data.temp_in) )
    mydata['hum_out'] = None if (globalvars.meteo_data.hum_out == None) else int(globalvars.meteo_data.hum_out)
    mydata['hum_in'] = None if (globalvars.meteo_data.hum_in == None) else int(globalvars.meteo_data.hum_in)
    mydata['abs_pressure'] = None if (globalvars.meteo_data.abs_pressure == None) else float( "%.1f" %  (globalvars.meteo_data.abs_pressure) )
    mydata['rel_pressure'] = None if (globalvars.meteo_data.rel_pressure == None) else float( "%.1f" %  (globalvars.meteo_data.rel_pressure) )

    mydata['rain'] = None if (globalvars.meteo_data.rain == None) else float( "%.1f" %  (globalvars.meteo_data.rain) )
    mydata['rain_rate'] = None if (globalvars.meteo_data.rain_rate == None) else float( "%.1f" %  (globalvars.meteo_data.rain_rate) )

    mydata['wind_chill'] = None if (globalvars.meteo_data.wind_chill == None) else float( "%.1f" %  (globalvars.meteo_data.wind_chill) )
    mydata['temp_apparent'] = None if (globalvars.meteo_data.temp_apparent == None) else float( "%.1f" %  (globalvars.meteo_data.temp_apparent) )
    mydata['dew_point'] = None if (globalvars.meteo_data.dew_point == None) else float( "%.1f" %  (globalvars.meteo_data.dew_point) )

    mydata['cloud_base_altitude'] = None if (globalvars.meteo_data.cloud_base_altitude == None) else int(globalvars.meteo_data.cloud_base_altitude)

    mydata['uv'] = None if (globalvars.meteo_data.uv == None) else float( "%.1f" %  (globalvars.meteo_data.uv) )
    mydata['illuminance'] = None if (globalvars.meteo_data.illuminance == None) else float( "%.1f" %  (globalvars.meteo_data.illuminance) )

    mydata['winDayMin'] = None if (globalvars.meteo_data.winDayMin == None) else int(globalvars.meteo_data.winDayMin)
    mydata['winDayMax'] = None if (globalvars.meteo_data.winDayMax == None) else int(globalvars.meteo_data.winDayMax)
    mydata['winDayGustMin'] = None if (globalvars.meteo_data.winDayGustMin == None) else int(globalvars.meteo_data.winDayGustMin)
    mydata['winDayGustMax'] = None if (globalvars.meteo_data.winDayGustMax == None) else int(globalvars.meteo_data.winDayGustMax)

    mydata['TempOutMin'] = None if (globalvars.meteo_data.TempOutMin == None) else float( "%.1f" %  (globalvars.meteo_data.TempOutMin) )
    mydata['TempOutMax'] = None if (globalvars.meteo_data.TempOutMax == None) else float( "%.1f" %  (globalvars.meteo_data.TempOutMax) )
    mydata['TempInMin'] = None if (globalvars.meteo_data.TempInMin == None) else float( "%.1f" %  (globalvars.meteo_data.TempInMin) )
    mydata['TempInMax'] = None if (globalvars.meteo_data.TempInMax == None) else float( "%.1f" %  (globalvars.meteo_data.TempInMax) )

    mydata['UmOutMin'] = None if (globalvars.meteo_data.UmOutMin == None) else int(globalvars.meteo_data.UmOutMin)
    mydata['UmOutMax'] = None if (globalvars.meteo_data.UmOutMax == None) else int(globalvars.meteo_data.UmOutMax)
    mydata['UmInMin'] = None if (globalvars.meteo_data.UmInMin == None) else int(globalvars.meteo_data.UmInMin)
    mydata['UmInMax'] = None if (globalvars.meteo_data.UmInMax == None) else int(globalvars.meteo_data.UmInMax)

    mydata['PressureMin'] = None if (globalvars.meteo_data.PressureMin == None) else int(globalvars.meteo_data.PressureMin)
    mydata['PressureMax'] = None if (globalvars.meteo_data.PressureMax == None) else int(globalvars.meteo_data.PressureMax)

    mydata['rain_rate_24h'] = None if (globalvars.meteo_data.rain_rate_24h == None) else float( "%.1f" %  (globalvars.meteo_data.rain_rate_24h) )
    mydata['rain_rate_1h'] = None if (globalvars.meteo_data.rain_rate_1h == None) else float( "%.1f" %  (globalvars.meteo_data.rain_rate_1h)  )

    if ( globalvars.meteo_data.wind_trend != None):
        mydata['wind_trend'] = int((globalvars.meteo_data.wind_trend))
    else:
        mydata['wind_trend'] = 0
    mydata['station_name'] = (cfg.station_name)
    mydata['location_longitude'] = (cfg.location_longitude)
    mydata['location_latitude'] = (cfg.location_latitude)
    mydata['location_altitude'] = (cfg.location_altitude)
    mydata['wind_speed_units'] = (cfg.wind_speed_units)
    mydata['wind_trend_limit'] = (cfg.wind_trend_limit)
    mydata['pressure_trend'] = (globalvars.meteo_data.pressure_trend)
    mydata['TempCPU'] =  get_cpu_temperature()
    mydata['freedisk'] = disk_free()
    if ( cfg.sensor_type == "DAVIS-VANTAGE-PRO2"):
        mydata['RainStorm'] = (globalvars.meteo_data.RainStorm)
        mydata['RainMonth'] = (globalvars.meteo_data.RainMonth)
        mydata['RainYear'] = (globalvars.meteo_data.RainYear)
        mydata['StormStartDate'] = (globalvars.meteo_data.StormStartDate)
        mydata['BatteryVolts'] = (globalvars.meteo_data.BatteryVolts)

    if ( globalvars.offline  ):
        mydata['offline'] = 1
    else:
        mydata['offline'] = 0

    if ( globalvars.meteo_data.last_capture != None ):
        mydata['last_capture'] = globalvars.meteo_data.last_capture.strftime("[%d/%m/%Y-%H:%M:%S]")
    else:
        mydata['last_capture'] = None

    #print mydata

    j = json.dumps(mydata)
    return j

def degToCompass(num):
    val=int((num/22.5)+.5)
    arr=["N","NNE","NE","ENE","E","ESE", "SE", "SSE","S","SSW","SW","WSW","W","WNW","NW","NNW"]
    return  arr[(val % 16)]

def CheckKeyInDictionary(d,key):
    if key in d:
        return d[key]
    else:
        None

def CreateLoRaJson(cfg):
#     ['StationID'] =    1
#     ['wind_dir'] =     2
#     ['wind_ave'] =     3
#     ['wind_gust'] =    4
#     ['temp_out'] =     5
#     ['hum_out'] =      6
#     ['abs_pressure'] = 7
#     ['offiline'] =     8


    if ( globalvars.offline  ):
#         mydata[9] = 1
        ol = "1"
    else:
#         mydata[9] = 0
        ol = "0"

    str_out = ",".join(("$SW",
                        cfg.LoRa_ID,
                        "" if (globalvars.meteo_data.wind_dir == None) else str(globalvars.meteo_data.wind_dir),
                        "" if (globalvars.meteo_data.wind_ave == None) else str(int(globalvars.meteo_data.wind_ave)),
                        "" if (globalvars.meteo_data.wind_gust == None) else str(int(globalvars.meteo_data.wind_gust)),
                        "" if (globalvars.meteo_data.temp_out == None) else "%.1f" %  (globalvars.meteo_data.temp_out),
                        "" if (globalvars.meteo_data.hum_out == None) else str(int(globalvars.meteo_data.hum_out)),
                        "" if (globalvars.meteo_data.abs_pressure == None) else str(int(globalvars.meteo_data.abs_pressure)),
                       ol))

    return addchecksum(str_out)

def addchecksum(sentence):

    """ Remove any newlines """
    if re.search("\n$", sentence):
        sentence = sentence[:-1]

    nmeadata = sentence

    calc_cksum = 0
    for s in nmeadata:
        calc_cksum ^= ord(s)

    """ Return the nmeadata, the checksum from
        sentence, and the calculated checksum
    """
    return nmeadata + "*" + hex(calc_cksum)[2:]


def getLoRaBWCode(c):
    options = {  "7.8"  : 0x00,
                "10.4"  : 0x10,
                "15.6"  : 0x20,
                "20.8"  : 0x30,
                "31.25" : 0x40,
                "41.7"  : 0x50,
                "62.5"  : 0x60,
                "125"   : 0x70,
                "250"   : 0x80,
                "500"   : 0x90
                }
    if ( c in options.keys()):
        return options[c]
    else:
        return 0x70


def getLoRaCRCode(c):
    options = {"4/5"  : 0x02,
               "4/6"  : 0x04,
               "4/7"  : 0x06,
               "4/8"  : 0x08
                }
    if ( c in options.keys()):
        return options[c]
    else:
        return 0x02


def getLoRaSFCode(c):
    options = { "6"   : 0x60,
                "7"   : 0x70,
                "8"   : 0x80,
                "9"   : 0x90,
                "10"  : 0xa0,
                "11"  : 0xb0,
                "12"  : 0xc0
                }
    if ( c in options.keys()):
        return options[c]
    else:
        return 0x70


def checksum(sentence):

    """ Remove any newlines """
    if re.search("\n$", sentence):
        sentence = sentence[:-1]

    nmeadata,cksum = re.split('\*', sentence)

    calc_cksum = 0
    for s in nmeadata:
        calc_cksum ^= ord(s)

    """ Return the nmeadata, the checksum from
        sentence, and the calculated checksum
    """
    return nmeadata,'0x'+cksum,hex(calc_cksum)

def UploadData(cfg):

    if ( globalvars.meteo_data.last_measure_time == None):
        return

    delay = (datetime.datetime.now() - globalvars.meteo_data.last_measure_time)
    delay_seconds = int(delay.total_seconds())

    if ( delay_seconds > 120 ):
        return


    objects_file = '/dev/shm/meteo.txt'

    j = CreateMeteoJson(cfg)
    f = open(objects_file,'w')
    f.write(j + "\n")
    f.close()


    sendFileToServer(objects_file,'meteo.txt',cfg.ftpserver,cfg.upload_folder,cfg.ftpserverLogin,cfg.ftpserverPassowd,True,cfg.use_thread_for_sending_to_server)


def NoneToNull(var):
    if ( var == None ):
        return "0"
    else:
        return var

def DBFielsToNumbet(var):
    if ( var == None ):
        return None
    else:
        return var


def waitForHandUP():
    if ( not globalvars.bAnswering):
        return
    else:
        log("Waiting for HangUP ...")
        for i in range (1,100):
            if (  globalvars.bAnswering):
                time.sleep(1)
            else:
                globalvars.bAnswering = False
                return

def waitForCameraCapture():
    if ( not globalvars.bCapturingCamera):
        return
    else:
        log("Waiting cameras to capture ...")
        for i in range (1,100):
            if (  globalvars.bCapturingCamera):
                time.sleep(1)
            else:
                globalvars.bCapturingCamera = False
                return


def log(message) :
    print (datetime.datetime.now().strftime("[%d/%m/%Y-%H:%M:%S] [UTILS________] -") , message)

def getFileName(path):
    return os.path.basename(path)

def addTextandResizePhoto(filename,finalresolutionX,finalresolutionY,cfg,version=None):
    log("Processing image :" + filename )
    textColor = (255,255,0)
    offsetUpper = 20
    offsetBottom = 32
    marginLeft = 10
    MarginRight = 10
    bgrColor = (50, 30, 255)

    #font_path = "./fonts/arial.ttf"
    font_path = "./fonts/LucidaBrightDemiItalic.ttf"
    font = ImageFont.truetype(font_path, 15, encoding='unic')

    img1 = Image.open(filename)
    w, h = img1.size

    if ( w != finalresolutionX or h != finalresolutionY ):
        new_size=[finalresolutionX, finalresolutionY]
        img2 = img1.resize(new_size)
        img1 = img2.copy()

    img = Image.new("RGB", (finalresolutionX,finalresolutionY+offsetUpper+offsetBottom), bgrColor)
    img.paste(img1, (0,offsetUpper,finalresolutionX,finalresolutionY+offsetUpper))

    w, h = img.size
    draw = ImageDraw.Draw(img)

    text =  cfg.webcamLogo
    draw.text((marginLeft, 0),text,textColor,font=font)

    text =   datetime.datetime.now().strftime("Data : %d/%m/%Y - %H:%M:%S ")
    width, height = font.getsize(text)
    draw.text((w-width-MarginRight-10, 0),text,textColor,font=font)

    font = ImageFont.truetype(font_path, 13, encoding='unic')

    # Adding Meteo information
    if ( cfg.use_wind_sensor ):
        if (  globalvars.meteo_data.status == 0 ):

            delay = (datetime.datetime.now() - globalvars.meteo_data.last_measure_time)
            delay_seconds = int(delay.total_seconds())

            text = ""
            if (globalvars.meteo_data.wind_dir_code != None and globalvars.meteo_data.wind_ave != None and globalvars.meteo_data.wind_gust != None):

                if ( len(globalvars.meteo_data.wind_dir_code) == 3 ):
                    dir = globalvars.meteo_data.wind_dir_code
                elif ( len(globalvars.meteo_data.wind_dir_code) == 2 ):
                    dir = " " + globalvars.meteo_data.wind_dir_code
                else:
                    dir = "  " + globalvars.meteo_data.wind_dir_code
                text = "Direzione del vento: " + dir + " - Intensita:%5.1f" % globalvars.meteo_data.wind_ave + " km/h  - Raffica:%5.1f" % globalvars.meteo_data.wind_gust  + " km/h"

            if (globalvars.meteo_data.temp_out  != None) :
                text = text + " - Temperatura:%4.1f" % globalvars.meteo_data.temp_out + " C"
            if (globalvars.meteo_data.rel_pressure != None ) :
                text = text + " - Pressione:%6.1f" % globalvars.meteo_data.rel_pressure + " hpa"
            if (globalvars.meteo_data.cloud_base_altitude != None ) :
                text = text + " - Base cumulo:%d" % globalvars.meteo_data.cloud_base_altitude + " m"

            width, height = font.getsize(text)
            draw.text((32+marginLeft, h-offsetBottom),text,textColor,font=font)

            text = ""
            if (globalvars.meteo_data.hum_out  != None) :
                text = text + "Umidita: %d" % (globalvars.meteo_data.hum_out) + " % - "

            if (globalvars.meteo_data.rain_rate != None) :
                text = text + "Pioggia oggi: %3.1f" % (globalvars.meteo_data.rain_rate) + " mm - "

            if ( globalvars.meteo_data.last_measure_time != None ):
                #text = text + "Ult.Ril:" + str(globalvars.meteo_data.last_measure_time)
                text = text + globalvars.meteo_data.last_measure_time.strftime("Ult.Ril:%d/%m/%Y-%H:%M:%S")

                width, height = font.getsize(text)
                draw.text((32+marginLeft, h-height),text,textColor,font=font)

        else:
            text = "Nessun dato meteo - status = " + str(globalvars.meteo_data.status)
            width, height = font.getsize(text)
            draw.text((marginLeft, h-offsetBottom),text,textColor,font=font)

    if ( version != None):
        font = ImageFont.truetype(font_path, 11, encoding='unic')
        text = "(Sint Wind PI:" + version + ")"
        width, height = font.getsize(text)
        draw.text((w-width-MarginRight, h-height),text,textColor,font=font)


    if ( os.path.isfile("./fonts/windsock.png") ):
        im_windsock = Image.open("./fonts/windsock.png")
        # Box for paste is (left, upper, right, lower).
        img.paste(im_windsock,(int(marginLeft/2),h-offsetBottom+2),im_windsock)

    if ( os.path.isfile("./fonts/rpi_logo.png") ):
        im_logo = Image.open("./fonts/rpi_logo.png")
        # Box for paste is (left, upper, right, lower).
        img.paste(im_logo,(w-17,0),im_logo)

    img.save(filename)

    if ( not os.path.isfile(filename)):
        log("Problem processing image :" + filename )
        return False

    log("Processed image :" + filename )
    return True


wind_rose = {
    0:  "N",
    22.5:  "NNE",
    45: "NE",
    67.5 :"ENE",
    90: "E",
    112.5: "ESE",
    127:"SE",
    149.5: "SSE",
    180:"S",
    202.5: "SSW",
    225:"SW",
    247.5: "WSW",
    270:"W",
    295.5:"WNW",
    315:"NW",
    337.5:"NNW"}


def angle2direction(angle):
    return wind_rose[angle]



def direction2angle(direction):
    return [item[0] for item in wind_rose() if item[1] == direction]



def mean(numberList):
    if len(numberList) == 0:
        return 0
    floatNums = [float(x) for x in numberList]
    return sum(floatNums) / len(numberList)

def isnumeric(s):
    try:
        float(s)
        return True
    except ValueError:
        return False

def sendFileToFTPServer(filename,name,server,destFolder,login,password,delete):
    msg = "\033[0;31mSending file to server : \033[00;37m" + name
    try:
        s = ftplib.FTP(server,login,password,timeout=30)    # Connect
        f = open(filename,'rb')                # file to send
        s.cwd(destFolder)
        s.storbinary('STOR ' + name, f)         # Send the file
        f.close()                                # Close file and FTP
        s.quit()
        msg = msg + " OK"
        if delete :
            os.remove(filename)
            log("Deleted file : " + filename )
            msg = msg + " Deleted"
        log(msg)
        return True
    except Exception as e:
        #print "Exception"
        #print '%s' % str(err)
        log("Error sending  file to server : " + name + "error: " +str(e))
        if delete :
            deleteFile(filename)
        return False

def sendFileToServer(filename,name,server,destFolder,login,password,delete,usethread):
    if ( not usethread ):
        sendFileToFTPServer(filename,name,server,destFolder,login,password,delete)
    else:
        _thread.start_new_thread(sendFileToFTPServer, (filename,name,server,destFolder,login,password,delete))


def internet_on():
    #log("Checking internet connection ...")
    ret = os.system("ping -c 1 8.8.8.8 > /dev/null")
    if ( ret >= 1 ):
        log("Internet connection ---> No ")
        return False
    else:
        log("Internet connection ---> ok")
        return True



def internet_on1():
    try:
        log("Checking internet connection ...")
        #urllib2.urlopen('http://74.125.113.99',timeout=10)
        requests.get('http://74.125.113.99',timeout=10)
        log("Internet ok n2")
        return True
    except :
        log("No Internet n2")
        return False

def systemRestart():
    if os.name != 'nt':
        log("Rebooting system ..")
        os.system("sudo reboot")
    else:
        print (" Sorry, cannot reboot Windows")

def systemHalt():
    if os.name != 'nt':
        log("Halting system ..")
        os.system("sudo halt")
    else:
        print (" Sorry, cannot reboot Windows"   )

def getIP():
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    try:
        s.connect(("gmail.com", 80))
    except Exception. e:
        #log("something wrong in get IP. Exception type is %s" % ( e))
        return None
    ip = (s.getsockname()[0])
    s.close()
    return ip


def getPublicIP():
    try:
        ip = requests.get("http://myexternalip.com/raw",timeout=10).text
        return ip
    except Exception. e:
        return None

def waitForIP():
    # wait maximum 2 minute for a valid IP
    log("Waiting for a valid IP ...")
    n = 60
    cfg = config.config('swpi.cfg')
    for i in range(1,n):
        theIP = getIP()
        #log(cfg.ntp_url)
        if ( theIP != None):
            if (cfg.ntp_url != 'None'):
                date_str = requests.get(cfg.ntp_url,timeout=10).text
                log(date_str)
                os.system("sudo date -s '%s'" % date_str)
            return theIP
        log("No IP yet. Retrying ..%d" % (n-i) )
        time.sleep(2)
    return None

def SendMail(cfg, subject, text, attach):
    try:
        msg = MIMEMultipart()

        msg['From'] = "MeteoPI"
        msg['To'] = cfg.mail_to
        msg['Subject'] = subject

        #cfg.gmail_user.encode('utf-8')
        #cfg.gmail_pwd.encode('utf-8')

        gmail_user = cfg.gmail_user
        gmail_pwd = cfg.gmail_pwd

        msg.attach(MIMEText(text))
        if (attach != "" ):
            part = MIMEBase('application', 'octet-stream')
            part.set_payload(open(attach, 'rb').read())
            Encoders.encode_base64(part)
            part.add_header('Content-Disposition',
                'attachment; filename="%s"' % os.path.basename(attach))
            msg.attach(part)

        mailServer = smtplib.SMTP("smtp.gmail.com", 587)
        mailServer.ehlo()
        mailServer.starttls()
        mailServer.ehlo()
        mailServer.login(gmail_user, gmail_pwd)
        mailServer.sendmail(cfg.gmail_user, cfg.mail_to, msg.as_string())
        # Should be mailServer.quit(), but that crashes...
        mailServer.close()
        log("Mail sent to :" + cfg.mail_to)
        return True
    except Exception as e:
        log ("ERROR sending mail" )
        print ("Exeption", e)
        return False


def getCurrentMeteoData():
    mydata = {}
    mydata['last_measure_time'] = (globalvars.meteo_data.last_measure_time.strftime("[%d/%m/%Y-%H:%M:%S]"))
    mydata['idx'] = (globalvars.meteo_data.idx.strftime("[%d/%m/%Y-%H:%M:%S]"))
    mydata['wind_dir_code'] = (globalvars.meteo_data.wind_dir_code)
    mydata['wind_dir'] = (globalvars.meteo_data.wind_dir)
    mydata['wind_ave'] = (globalvars.meteo_data.wind_ave)
    mydata['wind_gust'] = (globalvars.meteo_data.wind_gust)
    mydata['temp_out'] = (globalvars.meteo_data.temp_out)
    mydata['abs_pressure'] = (globalvars.meteo_data.abs_pressure)
    mydata['rel_pressure'] = (globalvars.meteo_data.rel_pressure)
    mydata['hum_out'] = (globalvars.meteo_data.hum_out)
    mydata['rain'] = (globalvars.meteo_data.rain)
    mydata['rain_rate'] = (globalvars.meteo_data.rain_rate)
    mydata['temp_in'] = (globalvars.meteo_data.temp_in)
    mydata['hum_in'] = (globalvars.meteo_data.hum_in)
    mydata['wind_chill'] = (globalvars.meteo_data.wind_chill)
    mydata['temp_apparent'] = (globalvars.meteo_data.temp_apparent)
    mydata['dew_point'] = (globalvars.meteo_data.dew_point)
    mydata['cloud_base_altitude'] = (globalvars.meteo_data.cloud_base_altitude)
    mydata['uv'] = (globalvars.meteo_data.uv)
    mydata['illuminance'] = (globalvars.meteo_data.illuminance)
    mydata['winDayMin'] = (globalvars.meteo_data.winDayMin)
    mydata['winDayMax'] = (globalvars.meteo_data.winDayMax)
    mydata['winDayGustMin'] = (globalvars.meteo_data.winDayGustMin)
    mydata['winDayGustMax'] = (globalvars.meteo_data.winDayGustMax)
    mydata['TempOutMin'] = (globalvars.meteo_data.TempOutMin)
    mydata['TempOutMax'] = (globalvars.meteo_data.TempOutMax)
    mydata['TempInMin'] = (globalvars.meteo_data.TempInMin)
    mydata['TempInMax'] = (globalvars.meteo_data.TempInMax)
    mydata['UmOutMin'] = (globalvars.meteo_data.UmOutMin)
    mydata['UmOutMax'] = (globalvars.meteo_data.UmOutMax)
    mydata['UmInMin'] = (globalvars.meteo_data.UmInMin)
    mydata['UmInMax'] = (globalvars.meteo_data.UmInMax)
    mydata['PressureMin'] = (globalvars.meteo_data.PressureMin)
    mydata['PressureMax'] = (globalvars.meteo_data.PressureMax)
    mydata['wind_dir_ave'] = (globalvars.meteo_data.wind_dir_ave)
    mydata['rain_rate_24h'] = (globalvars.meteo_data.rain_rate_24h)
    mydata['rain_rate_1h'] = (globalvars.meteo_data.rain_rate_1h)
    mydata['lux'] = (globalvars.meteo_data.lux)
    mydata['luxfull'] = (globalvars.meteo_data.luxfull)
    mydata['ir'] = (globalvars.meteo_data.ir)
    return mydata

def getCurrentMeteoDataFromUrl(url):
    try:
        data = urllib2.urlopen(url)
        return json.load(data)
    except Exception as e:
        log ("ERROR getCurrentMeteoDataFromUrl" )
        return None


if __name__ == '__main__':

    configfile = 'meteopi.cfg'
    if not os.path.isfile(configfile):
        "Configuration file not found"
        exit(1)
    cfg = config.config(configfile)


    print (logDataToCWOP(cfg))
