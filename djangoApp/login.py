from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.http import require_http_methods
from django.core import serializers
import json

from djangoApp.models import Account
# Create your views here.

def login(request):
    #查 --- 查数据并封装 -- 格式暂定
    if request.method == 'POST':
        req = json.loads(request.body)
        res = Account.objects.filter(userName = req['userName'])
        # 没有查询到结果时
        if not res:
            # key值类型要统一
            mes = {'type': 'error', 'message': '此账号未注册'}
            return HttpResponse(json.dumps(mes), content_type="application/json")
        else:
            # queryset只能遍历
            for e in res:
                if e.password == req['passWord']:
                    return HttpResponse(json.dumps({'type': 'ok'}))
                else:
                    mes = {'type': 'error', 'message': '密码错误'}
                    return HttpResponse(json.dumps(mes), content_type="application/json")