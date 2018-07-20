from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.http import require_http_methods
from django.core import serializers
import json

# 这个真的没必要用两张表，以id作为唯一标识即可
from djangoApp.models import Introduce
# Create your views here.


