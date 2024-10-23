import csv
import sys
import os

def main():
    menu()

def menu():
    print()
    print("*******************************************")
    print("*                                         *")
    print("*            MeteoPI Installer            *")
    print("*                                         *")
    print("*******************************************")

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
    #os.system("git clone https://github.com/sn3ik/MeteoPI.git")
    os.system("sudo apt update && sudo apt upgrade")
    
    os.system("sudo apt install lighttpd -y")
    print('\033[92m'"Lightttpd installato con successo'\033[0m'")
    os.system("sudo apt install php8.2-fpm php8.2-mbstring php8.2-mysql php8.2-curl php8.2-gd php8.2-curl php8.2-zip php8.2-xml -y")
    os.system("sudo lighttpd-enable-mod fastcgi")
    os.system("sudo lighttpd-enable-mod fastcgi-php")
    print('\033[92m'"PHP installato con successo'\033[0m'")

    #os.chdir("MeteoPI")
    os.chdir("www")
    os.chdir("lighttpd")
    os.system("sudo mv 15-fastcgi-php.conf /etc/lighttpd/conf-available/")
    #os.system("sudo mv lighttpd.conf /etc/lighttpd/")

    os.chdir("..")
    os.system("sudo rm -r /var/www/html/*")

    os.system("sudo mv * /var/www/html")

    os.system("sudo service lighttpd force-reload")
    os.chdir("..")
    #os.system("sudo rm -R www")

    print('\033[92m'"MeteoPI backend installato con successo'\033[0m'")
pass

def meteopi():
    #os.chdir("MeteoPI")

    os.system("sudo mv meteopi /home/pi")


    print('\033[92m'"MeteoPI installato con successo'\033[0m'")
pass

    
main()
