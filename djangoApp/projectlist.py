from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.http import require_http_methods
from django.core import serializers
import json

from djangoApp.models import MainProject
    
# 维修/材料的条目
def projectlist(request):
    mainL = []
    untL = []
    data = {'mainProject': '', 'materialProject': ''}
    mainList = MainProject.objects.all().values('mainList')
    materialList = MainProject.objects.all().values('materialList', 'unt')
    for item in mainList:
        mainL.append(item)
    for item in materialList:
        untL.append(item)
    data['mainProject'] = mainL
    data['materialProject'] = untL
    return HttpResponse(json.dumps(data), content_type="application/json")