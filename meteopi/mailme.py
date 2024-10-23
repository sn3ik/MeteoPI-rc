###################################################
#                                                 #
#     MeteoPI                                     #
#     by F.C. - sn3ik@hotmail.com                 #
#                                                 #
#     Thanks to Sint Wind PI & Tonino Tarsi       #
#                                                 #
###################################################
#                      Mail a file
from TTLib import *
import sys

configfile = 'meteopi.cfg'
if not os.path.isfile(configfile):
    "Configuration file not found"
    exit(1)    
cfg = config.config(configfile)

for arg in sys.argv[1:]: 
    print "Sending file: ",arg

    print SendMail(cfg,"your file","your file",arg) 
    