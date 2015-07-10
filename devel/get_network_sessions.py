import os
import sys
import re
import time
import getpass
import datetime
import platform
import base64, pickle

import urllib
import httplib
import subprocess

import socket

def _get_network_sessions():


    try:
        netstat = subprocess.Popen(["/bin/netstat","-atn"], stdout=subprocess.PIPE, close_fds=True).communicate()[0]
    except:
        netstat = subprocess.Popen(["/usr/sbin/netstat","-atn"], stdout=subprocess.PIPE, close_fds=True).communicate()[0]

    
    #print 'Active Internet Connections (including servers)'


    connections = {}
    listen_connections = []    
    established_connections = []

    for line in netstat.split('\n'):
    
        if("tcp4" in line or "udp4" in line):

            line = re.split(" +", line)

            proto = line[0]
            recvq = line[1]
            sendq = line[2]
            local_address = line[3]
            foreign_address = line[4]
            state = line[5]

            local_address_port = local_address.split('.')[-1:][0]
            foreign_address_port = foreign_address.split('.')[-1:][0]            

            local_address_port_resolved = ""
            foreign_address_port_resolved = ""
 
            if(local_address_port!="*"):
                try:
                    local_address_port_resolved = socket.getservbyport(int(local_address_port))
                except: pass
                
            if(foreign_address_port!="*"):
                try:
                    foreign_address_port_resolved = socket.getservbyport(int(foreign_address_port))
                except: pass
            
           
            if(state=="LISTEN"):
                listen_connections.append( [state, proto, recvq, sendq, local_address, local_address_port, local_address_port_resolved, foreign_address, foreign_address_port, foreign_address_port_resolved] )
                print state, proto, recvq, sendq, local_address, local_address_port, local_address_port_resolved, foreign_address, foreign_address_port, foreign_address_port_resolved

            if(state=="ESTABLISHED"):
                established_connections.append( [state, proto, recvq, sendq, local_address, local_address_port, foreign_address, foreign_address_port] )
                print state, proto, recvq, sendq, local_address, local_address_port, local_address_port_resolved, foreign_address, foreign_address_port, foreign_address_port_resolved


    connections['listen'] = listen_connections
    connections['established'] = established_connections
    connections['description'] = "Active Internet Connections (including servers)"

    return connections
    
    
    
network_sessions = _get_network_sessions()

#print network_sessions



    