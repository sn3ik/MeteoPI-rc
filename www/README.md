MeteoPI - Backend
1. Install Lighttpd
   - sudo apt install lighttpd -y
   - sudo apt install php8.2-fpm php8.2-mbstring php8.2-mysql php8.2-curl php8.2-gd php8.2-curl php8.2-zip php8.2-xml -y
   - sudo lighttpd-enable-mod fastcgi
   - sudo lighttpd-enable-mod fastcgi-php
   - sudo nano /etc/lighttpd/conf-available/15-fastcgi-php.conf
   - ADD ("
     
            # -*- depends: fastcgi -*-
            # /usr/share/doc/lighttpd/fastcgi.txt.gz
            
            ## Start an FastCGI server for php
            fastcgi.server += ( ".php" =>
                    ((
                            "socket" => "/var/run/php/php8.2-fpm.sock",
                            "broken-scriptfilename" => "enable"
                    ))
            )"
     )
   - sudo service lighttpd force-reload

2. Clone repository
   - git clone https://github.com/sn3ik/MeteoPI-be.git
   - move in "/var/www/html"
