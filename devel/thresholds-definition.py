# -*- coding: utf-8
#!/usr/bin/env python

import os
import sys
import re
import time
import socket
import getpass
import datetime
import platform
import base64, pickle

import urllib
import httplib
import subprocess


try:
    import json
except: pass



def _get_sys_loadavg():

    loadavg_thresholds = {
        "OK": {},
        "WARNING": {
            'min_value': 1.5,
            'max_value': 3.0,
            'min_duration_in_seconds': 60,
        },
        "CRITICAL": { # is everything above the warning range
            'min_duration_in_seconds': 20,
        },
    }
    service_status = {
        'status': '',
        'service': 'system_loadavg',
    }

    loadavg=subprocess.Popen(['uptime',], stdout=subprocess.PIPE, close_fds=True).communicate()[0]
    loadavg = re.findall(r"(\d+\.\d{2})", loadavg)

    status = 'UNKNOWN'
    
    if(float(loadavg[2]) < loadavg_thresholds['WARNING']['min_value']):
        status = 'OK'
    elif(float(loadavg[2]) > loadavg_thresholds['WARNING']['min_value'] and float(loadavg[2]) <= loadavg_thresholds['WARNING']['max_value']):
        status = 'WARNING'
    else:
        status = 'CRITICAL'
    
    service_status['status'] = status
    service_status['message'] = "TODO"
        

    return loadavg
    

print _get_sys_loadavg()



