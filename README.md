1. Web server &backend
  - sudo apt install lighttpd -y

  - sudo apt install php8.2-fpm php8.2-mbstring php8.2-mysql php8.2-curl php8.2-gd php8.2-curl php8.2-zip php8.2-xml -y

  - sudo lighttpd-enable-mod fastcgi

  - sudo lighttpd-enable-mod fastcgi-php

  - mv lighttpd/15-fastcgi-php.conf /etc/lighttpd/conf-available/

  - sudo service lighttpd force-reload