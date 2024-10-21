MeteoPi for Raspberry 

1. Clone repository
- git clone https://github.com/sn3ik/MeteoPI.git
  
2. Install Rtl
   cd rtl-sdr
   mkdir build
   cd build
   cmake ../ -DDETACH_KERNEL_DRIVER=ON -DINSTALL_UDEV_RULES=ON
   make
   sudo make install

   cd rtl_433
   mkdir build
   cd build
   cmake ../
   make
   sudo make install

3. Launch main program
   sudo python3 meteopi.py
