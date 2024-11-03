import csv
import sys
import os
import pwd



def main():
    menu()

def menu():
    print()
    print("*******************************************")
    print("*                                         *")
    print("*            MeteoPI Installer            *")
    print("*                                         *")
    print("*******************************************")

    try:
        pwd.getpwnam('pi')
    except KeyError:
        print('Attenzione l\'utente pi non esiste.')

    print()
    current_directory = os.getcwd()
    print("Directory: ",current_directory)
    
    print("Software disponibili:")
    choice = input("""
       1: Lighttpd
       2: MeteoPI
       Q: Esci

       Digita la tua scelta: """)
    
    if choice=="1":
        lighttpd()
        menu()
    elif choice=="2":
        meteopi()
        menu()    
    elif choice=="Q" or choice=="q":
        sys.exit
    else:
        print("Opzione non valida")
        print("Riprova")
        menu()

def lighttpd():
    os.system("git clone https://github.com/sn3ik/MeteoPI.git")
    os.system("sudo apt update && sudo apt upgrade")
    os.system("sudo apt-get install php-ssh2")
    
    os.system("sudo apt install lighttpd -y")
    os.system("sudo apt-get install php-sqlite3")
    print('\033[92m'"Lightttpd installato con successo'\033[0m'")
    os.system("sudo apt install php8.2-fpm php8.2-mbstring php8.2-mysql php8.2-curl php8.2-gd php8.2-curl php8.2-zip php8.2-xml -y")
    os.system("sudo lighttpd-enable-mod fastcgi")
    os.system("sudo lighttpd-enable-mod fastcgi-php")
    print('\033[92m'"PHP installato con successo'\033[0m'")

    os.chdir("MeteoPI-rc")
    os.chdir("www")
    os.chdir("lighttpd")
    os.system("sudo mv 15-fastcgi-php.conf /etc/lighttpd/conf-available/")

    os.chdir("..")
    #os.system("sudo rm -r /var/www/html/*")

    os.system("sudo mv * /var/www/html")
    os.system("sudo chmod 755 /var/www/html/")
    os.system("sudo chmod 755 /var/www/html/")
    os.system("sudo chmod 0777 /var/log/lighttpd/")
    # permessi per accedere ai file
    os.system("sudo chown -R root:root /var/www/html/")
    os.system("sudo chown -R pi:pi /var/www/html/*")


    os.system("sudo service lighttpd force-reload")
    os.chdir("..")
    os.system("sudo ln -s /var/www/ /home/")

    os.system("git clone https://github.com/WiringPi/WiringPi.git")
    os.chdir("WiringPi")
    os.system("./build debian")
    os.chdir("debian-template")
    os.system("sudo apt install ./wiringpi_3.10_arm64.deb")
    os.chdir("..")
    os.chdir("..")

    print('\033[92m'"MeteoPI backend installato con successo'\033[0m'")
pass

def meteopi():
    os.chdir("MeteoPI-rc")

    os.system("sudo mv meteopi /home/pi")
    os.system("sudo chmod 0755 /home/pi/")
    os.system("sudo chmod 0755 /home/pi/meteopi/")

    os.chdir("extras")
    os.chdir("bin")
    os.system("sudo mv * /usr/local/bin")
    os.system("sudo chmod +x /usr/local/bin/*")

    os.chdir("..")
    os.chdir("update-motd.d")
    os.system("sudo mv * /etc/update-motd.d")
    os.system("sudo chmod +x /etc/update-motd.d/*")

    os.chdir("..")
    os.chdir("system")
    os.system("sudo mv * /etc/systemd/system")
    #os.system("sudo chmod +x /etc/systemd/system/*")

    os.system("sudo systemctl enable meteopi.service")
    os.system("sudo apt install cmake")
    
    os.chdir("/home/pi/meteopi/")
    
    os.system("git clone https://gitea.osmocom.org/sdr/rtl-sdr.git")
    os.chdir("rtl-sdr")
    os.system("mkdir build")
    os.chdir("build")
    os.system("cmake ../")
    os.system("make")
    os.system("sudo make install")
    os.system("sudo ldconfig")
    os.chdir("..")
    os.chdir("..")

    os.system("git clone https://github.com/merbanan/rtl_433.git")
    os.chdir("rtl_433")
    os.system("cmake -B build")
    os.system("cmake --build build --target install")


    print('\033[92m'"MeteoPI installato con successo'\033[0m'")

pass

    
main()
