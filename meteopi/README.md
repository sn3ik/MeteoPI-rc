MeteoPi for Raspberry 


1. Clone repository
    - git clone https://github.com/sn3ik/MeteoPI.git
  

2. Install Rtl-sdr
    - cd rtl-sdr
    - mkdir build
    - cd build
    - cmake ../ -DDETACH_KERNEL_DRIVER=ON -DINSTALL_UDEV_RULES=ON
    - make
    - sudo make install
      

3. Install Rtl_433
    - cd rtl_433
    - mkdir build
    - cd build
    - cmake ../
    - make
    - sudo make install
  

4. Launch main program
    - sudo python3 meteopi.py
