# -*- coding: utf-8 -*-

import os
import time
import socket
import logging
import datetime
import base64, pickle

from pprint import pprint

from django.shortcuts import render_to_response
from django.http import HttpResponseRedirect
from django.template import RequestContext

from django.http import HttpResponseForbidden
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import redirect, render

logger = logging.getLogger(__name__)

import boto.ec2
import boto.ec2.cloudwatch

from django.contrib.auth.models import User
from userprofile.models import Profile as userprofile
from userprofile.views import _log_user_activity
from django.contrib.auth.decorators import login_required

from django.conf import settings

from amazon import ec2_funcs
from vms.models import Cache

import pymongo
from pymongo import MongoClient
from pymongo import ASCENDING, DESCENDING

client = MongoClient(settings.MONGO_HOST, settings.MONGO_PORT)

if settings.MONGO_USER:
    client.cloudly.authenticate(settings.MONGO_USER, settings.MONGO_PASSWORD)

mongo = client.cloudly

def home(request):

    if not request.user.is_authenticated():
        print '--  web:'
        CLOUDLY_MOTTOS = [
            "The Power of Now!",
            "Relax, it's going to take no time!",
            "Saves you money and resources!",
            "Real-time servers monitoring.",
            "Real-time and very playful monitoring.",
            "Does the server monitoring for you like no other.",
            "Cheerful Servers Monitoring.",
        ]
        return render_to_response('web.html', {'request':request,'CLOUDLY_MOTTOS':CLOUDLY_MOTTOS,}, context_instance=RequestContext(request))

    print '--  dashboard:'
    print request.user

    user = request.user
    user.last_login = datetime.datetime.now()
    user.save()

    profile = userprofile.objects.get(user=request.user)
    secret = profile.secret

    ip = request.META['REMOTE_ADDR']
    _log_user_activity(profile,"click","/","home",ip=ip)

    is_updating = False

    try:
        vms_cache = Cache.objects.get(user=request.user)
        vms_response = vms_cache.vms_response
        vms_response = base64.b64decode(vms_response)
        vms_response = pickle.loads(vms_response)
        vms_cached_response = vms_response
        vms_cached_response['last_seen'] = vms_cache.last_seen
        is_updating = vms_cache.is_updating
    except: vms_cached_response = None

    servers = mongo.servers.find({'secret':profile.secret,}).sort('_id',-1);
    servers_tags = {}

    for server in servers:
        try:
            server['tags']
        except: break

        for tag_category in server['tags']:
            if(not servers_tags.has_key(tag_category)):
                servers_tags[tag_category] = [];

            for inner_tag in server['tags'][tag_category]:
                if(not inner_tag in servers_tags[tag_category]):
                    servers_tags[tag_category].append(inner_tag[0])


    # XXX this needs go on the ajax
    notifs_counter = 0
    active_service_statuses = mongo.active_service_statuses
    active_service_statuses = active_service_statuses.find({"$and": [{"secret": secret}, {"current_overall_status": {"$ne": "OK"}}]})
    notifs_counter = active_service_statuses.count()

    return render_to_response('dashboard.html', {'request':request,'notifs_counter':notifs_counter,'servers_tags':servers_tags,'is_updating':is_updating,'vms_cached_response':vms_cached_response,}, context_instance=RequestContext(request))


@login_required()
def welcome(request):

    print '--  welcome page:', request.user

    ip = request.META['REMOTE_ADDR']
    profile = userprofile.objects.get(user=request.user)
    _log_user_activity(profile,"click","/welcome/","welcome",ip=ip)

    print request.user
    return render_to_response('welcome.html', locals(), context_instance=RequestContext(request))



def credits(request):

    try:
        print '--  credits page:', request.user
    except:
        print '--  credits page: anonymous'

    ip = request.META['REMOTE_ADDR']
    try:
        profile = userprofile.objects.get(user=request.user)
        _log_user_activity(profile,"click","/credits/","credits",ip=ip)
    except:
        return HttpResponseRedirect("https://github.com/jparicka/cloudly")

    print request.user
    return render_to_response('credits.html', {'request':request,}, context_instance=RequestContext(request))



def download_agent(request):

    print '-- download agent:'

    server_url = request.build_absolute_uri('/')
    api_server_url = server_url
    api_server_url = api_server_url.replace('http://','').replace('https://','')
    api_server_url = api_server_url.split(':')[0].replace('/','')
    api_server_url = api_server_url + ":5001"

    if('projectcloudly.com' in api_server_url):
        api_server_url = "api.projectcloudly.com:5001"

    ip = request.META['REMOTE_ADDR']

    try:
        profile = userprofile.objects.get(user=request.user)
    except: pass

    print 'server_url', server_url
    print 'api_server_url', api_server_url

    if(request.GET):

        try:
            xuuid = request.GET['xuuid']
            profile = userprofile.objects.get(agent_hash=xuuid)
        except:
            return HttpResponseForbidden()

        _log_user_activity(profile,"download","/download/agent/","download_agent",ip=ip)

        agent_code = ""
        for line in open('agent.py'):
            if("SECRET = \"\"" in line):
                agent_code += "SECRET = \""+profile.secret+"\"\n"
                continue
            if("API_SERVER = \"\"" in line):
                agent_code += "API_SERVER = \""+api_server_url+"\"\n"
                continue
            agent_code += line

        return HttpResponse(agent_code)

    try:
        agent_download_url = server_url + "download/agent?xuuid="+profile.agent_hash
        print 'agent_download_url', agent_download_url
    except:
        return HttpResponseRedirect("https://raw.githubusercontent.com/jparicka/cloudly/master/agent.py")


    return render_to_response('agent_download.html', {'request': request, 'profile':profile,'agent_download_url':agent_download_url,}, context_instance=RequestContext(request))
