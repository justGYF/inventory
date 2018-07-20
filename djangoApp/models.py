from django.db import models

# Create your models here.

class Test(models.Model):
    name = models.CharField(max_length = 20)

# 存储详细信息的表 --- 读和改
class Introduce(models.Model):
    fileName = models.CharField(max_length = 60)
    tableTitle = models.CharField(max_length = 60)
    billNum = models.CharField(max_length = 60)
    incomingDate = models.CharField(max_length = 60)
    outDate = models.CharField(max_length = 60)
    settlementDate = models.CharField(max_length = 60)
    worker = models.CharField(max_length = 60)
    licensePlate = models.CharField(max_length = 60)
    carModel = models.CharField(max_length = 60)
    fixType = models.CharField(max_length = 60)
    incomingMileage = models.CharField(max_length = 60)
    carOwner = models.CharField(max_length = 60)
    carContact = models.CharField(max_length = 60)
    fixedLine = models.CharField(max_length = 60)
    phoneNumber = models.CharField(max_length = 60)
    carFrameCode = models.CharField(max_length = 60)
    engineCode = models.CharField(max_length = 60)
    selfEditedCode = models.CharField(max_length = 60)
    remark = models.CharField(max_length = 300)
    maintenanceFees = models.CharField(max_length = 40, null=True, blank=True)
    materialFees = models.CharField(max_length = 40, null=True, blank=True)
    allMoneyChina = models.CharField(max_length = 60, null=True, blank=True)
    allMoney = models.CharField(max_length = 40, null=True, blank=True)
    telePhone = models.CharField(max_length = 40, null=True, blank=True)
    local = models.CharField(max_length = 200, null=True, blank=True)
    payment = models.CharField(max_length = 10, null=True, blank=True)
    mainProject = models.CharField(max_length = 10000, null=True, blank=True)
    materialProject = models.CharField(max_length = 10000, null=True, blank=True)

# 文件名 --查看文件列表
class FileName(models.Model):
    fileName = models.CharField(max_length = 60)

# 维修，材料的条目
class MainProject(models.Model):
    mainList = models.CharField(max_length = 60)
    materialList = models.CharField(max_length = 60)
    unt = models.CharField(max_length = 10)