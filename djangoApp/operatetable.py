from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.http import require_http_methods
from django.core import serializers
import json

from djangoApp.models import Introduce
# Create your views here.

def updateNum(request):
    # 改 --- 数据表修改数据   
    # 遍历此函数对象，并得到部分属性值
    # for f in temp._meta.get_fields():
        # print(getattr(temp, f.name))

    # 解析前端传来的数据
    req = ''
    if request.method == 'POST':
        req = json.loads(request.body)
        if 'ids' in req:
            temp = Introduce.objects.get(id = req['ids'])
            # 转化json为dict
            newDict = {}
            for keys in req:
                if type(req[keys]) == list:
                    for i in req[keys]:
                        newDict[i['key']] = i['inputs']
                else:
                    newDict[keys] = req[keys]
            # 对数据表进行更新
            for keys in newDict:
                setattr(temp, keys, newDict[keys])
                # print(getattr(temp, keys))
            # 保存更新
            temp.save()
        else:
            return HttpResponse('error')
    return HttpResponse(json.dumps({'type': 'success'}), content_type="application/json")

def insertNum(request):
    # 增 --- 数据表添加数据
    req = ''
    newDict = {}
    err = { 'type': 'error' }
    listFile = Introduce.objects.all().values('fileName')
        # 当文件名重复时，不予添加，提示重新填写文件名
    if request.method == 'POST':
        req = json.loads(request.body)
        for i in listFile:
            print(i)
            if req['fileName'] == i['fileName']:
                return HttpResponse(json.dumps(err), content_type="application/json")
        for keys in req:
            if type(req[keys]) == list:
                for i in req[keys]:
                    newDict[i['key']] = i['inputs']
            else:
                newDict[keys] = req[keys]
        Introduce.objects.create(**newDict)
    return HttpResponse(json.dumps({'type': 'success'}), content_type="application/json")

def deleteNum(request):
    # 删 --- 删除某一行数据
    req = ''
    if request.method == 'GET':
        req = request.GET.get('ids')
        Introduce.objects.filter(id = req).delete()
    return HttpResponse('newDict')

def searchNum(request):
    #查 --- 查数据并封装 -- 格式暂定
    if request.method == 'GET':
        req = request.GET.get('ids')
        # 这种取值方法肯定不科学，暂时还未找到更合理的方式
        res = json.loads(serializers.serialize('json', Introduce.objects.filter(id = req)))
        return HttpResponse(json.dumps(res[0]['fields']), content_type="application/json")
        return HttpResponse('ok')

# 查询文件名列表
def showFileList(request):
    listFile = Introduce.objects.all().values('fileName', 'id')
    listF = []
    for item in listFile:
        listF.append(item)
    return HttpResponse(json.dumps(listF), content_type="application/json")