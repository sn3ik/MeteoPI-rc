#! /bin/bash

cd /home/pi/meteopi
logfile=./log/log`date '+%d%m%Y'`.log
sudo python3 -u meteopi.py | sudo tee -a $logfile

