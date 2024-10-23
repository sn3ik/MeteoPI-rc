#! /bin/bash
#sudo chmod 755 /home/pi/meteopi/meteopi.sh
#sudo /home/pi/meteopi/meteopi.sh

cd /home/pi/meteopi
logfile=./log/log`date '+%d%m%Y'`.log
sudo python3 -u meteopi.py | sudo tee -a $logfile
