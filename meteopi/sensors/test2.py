#!/usr/bin/env python3

""" Simple Example """

import serial
import time
from sds011 import SDS011


def run() -> None:
    """Simple example to read, decode and print data from SDS011 sensor."""
    while True:
        sensor = SDS011("/dev/ttyUSB0", use_query_mode=True)
        #print(sensor.query())  # Gets (pm25, pm10)
        #sensor.sleep()  # Turn off fan and diode
        sensor.sleep(sleep=False)  # Turn on fan and diode
        #time.sleep(2)  # Allow time for the sensor to measure properly
        pm25,pm10 = sensor.query()
        print("PM2.5: "+str(pm25) + " - PM10: "+ str(pm10))

if __name__ == '__main__':
    run()
