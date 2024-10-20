# ~/.bashrc:

sudo kill -9 `ps aux | grep meteopi.py | grep -v grep | awk '{print $2}'`
sudo pkill wh1080_rf
sudo pkill rtl_check


