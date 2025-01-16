#!/bin/sh

sudo pkill -9 -f meteopi.py
sudo killall rtl_433
sudo pkill -9 -f timelapse.py
return 0
