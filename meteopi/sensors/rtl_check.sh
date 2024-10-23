#!/bin/bash

while true
do
	if pgrep -x "rtl_433" > /dev/null
	then
    		echo "Running"
	else
    		echo "Stopped"
		sudo rtl_433 -f 868200000 -R 78 -p 0 > /dev/null
	fi
sleep 15
done
