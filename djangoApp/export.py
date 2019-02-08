from django.http import HttpResponse

from djangoApp.models import Introduce
import xlwt
import io
import sys
import math

# 使导出的中文文件名不会变为"下载"
from django.utils.http import urlquote

def exportExcel(request, ids):
    # 设置文件名 -- 查询此清单所有数据
    newDict = Introduce.objects.filter(id = ids)
    fileName = urlquote(newDict[0].fileName)

    
    # 设置一些有用的变量 -- 维修, 材料的行数, 向上取整
    newMain = eval(newDict[0].mainProject)
    newMaterial = eval(newDict[0].materialProject)

    mainLength = math.ceil(len(newMain) / 2)
    materialLength = math.ceil(len(newMaterial) / 2)
    allLength = mainLength + materialLength

    mainDict = { 'label': '', 'inputs': '' }
    materialDict = { 'unt': '', 'inputCount': '', 'inputNum': '', 'money': '', 'materialList': '' }

    if (len(newMain) % 2 != 0):
        newMain.append(mainDict)
    if (len(newMaterial) % 2 != 0):
        newMaterial.append(materialDict)

    # 设置HttpResponse的类型
    response = HttpResponse(content_type='application/vnd.ms-excel')
    response['Content-Disposition'] = 'attachment;filename='+ fileName +'.xls'
    # new一个文件
    wb = xlwt.Workbook(encoding = 'utf-8')
    # new一个sheet
    sheet = wb.add_sheet(u'清单')


    # 标题样式
    style_heading = xlwt.easyxf("""
    font:
        name 宋体,
        colour_index black,
        bold on,
        height 320;
    align:
        wrap off,
        vert center,
        horiz center;
    pattern:
        pattern solid,
        fore-colour white;
    borders:
        right THIN,
        bottom THIN,
        right_colour gray25,
        bottom_colour gray25;
    """)
    # 空一行
    style_quote = xlwt.easyxf("""
    font:
        name 宋体,
        bold off,
        height 200;
    borders:
        right THIN,
        bottom THIN,
        top THIN,
        left THIN,
        top_colour gray25,
        left_colour gray25,
        right_colour gray25,
        bottom_colour gray25;
    """)
    style_quoteC = xlwt.easyxf("""
    font:
        name 宋体,
        bold off,
        height 200;
    align:
        wrap on,
        vert center,
        horiz center;
    borders:
        right THIN,
        bottom THIN,
        top THIN,
        left THIN,
        top_colour gray25,
        left_colour gray25,
        right_colour gray25,
        bottom_colour gray25;
    """)
    # 主体样式 --- 1 -- 左对齐
    style_body = xlwt.easyxf("""
    font:
        name 宋体,
        bold off,
        height 200;
    align:
        wrap on,
        vert center,
        horiz left;
    borders:
        left THIN,
        right THIN,
        top THIN,
        bottom THIN;
    """)
    # 主体样式 --- 2 -- 居中
    style_bodyC = xlwt.easyxf("""
    font:
        name 宋体,
        bold off,
        height 200;
    align:
        wrap on,
        vert center,
        horiz center;
    borders:
        left THIN,
        right THIN,
        top THIN,
        bottom THIN;
    """)
    # 底部特殊样式
    style_bodyB = xlwt.easyxf("""
    borders:
        top THIN;
    """)
    style_bodyR = xlwt.easyxf("""
    borders:
        right THIN;
    """)

 
    # 合并单元格 -- 搭建这个奇葩的框架
    # 参数 top_row bottom_row left_column right_column ...
    # 第一，二，三行
    sheet.write_merge(0, 0, 0, 11, newDict[0].tableTitle, style_heading)
    sheet.write_merge(1, 1, 0, 11, '结算单', style_heading)
    sheet.write_merge(2, 2, 0, 11, '', style_quote)

    # 主体从第四行开始
    # 第四行
    sheet.write(3, 0, '结算单号', style_body)
    sheet.write_merge(3, 3, 1, 2, newDict[0].billNum, style_bodyC)
    sheet.write(3, 3, '进厂日期', style_body)
    sheet.write_merge(3, 3, 4, 5, newDict[0].incomingDate, style_bodyC)
    sheet.write(3, 6, '出厂日期', style_body)
    sheet.write_merge(3, 3, 7, 8, newDict[0].outDate, style_bodyC)
    sheet.write(3, 9, '结算日期', style_body)
    sheet.write_merge(3, 3, 10, 11, newDict[0].settlementDate, style_bodyC)

    # 第五行
    sheet.write(4, 0, '车牌', style_body)
    sheet.write_merge(4, 4, 1, 2, newDict[0].licensePlate, style_bodyC)
    sheet.write(4, 3, '车型', style_body)
    sheet.write_merge(4, 4, 4, 7, newDict[0].carModel, style_bodyC)
    sheet.write(4, 8, '修理类别', style_body)
    sheet.write_merge(4, 4, 9, 11, newDict[0].fixType, style_bodyC)

    # 第6行
    sheet.write(5, 0, '车主', style_body)
    sheet.write_merge(5, 5, 1, 5, newDict[0].carOwner, style_bodyC)
    sheet.write(5, 6, '联系人', style_body)
    sheet.write(5, 7, newDict[0].carContact, style_bodyC)
    sheet.write(5, 8, '手机', style_body)
    sheet.write_merge(5, 5, 9, 11, newDict[0].phoneNumber, style_bodyC)

    # 第7行
    sheet.write(6, 0, '车架号', style_body)
    sheet.write_merge(6, 6, 1, 5, newDict[0].carFrameCode, style_bodyC)
    sheet.write(6, 6, '发动机号', style_body)
    sheet.write_merge(6, 6, 7, 11, newDict[0].engineCode, style_bodyC)

    # 第8行
    sheet.write(7, 0, '备注', style_body)
    sheet.write_merge(7, 7, 1, 7, newDict[0].remark, style_bodyC)
    sheet.write(7, 8, '里程数', style_body)
    sheet.write_merge(7, 7, 9, 11, newDict[0].incomingMileage, style_bodyC)

    # 第9行 --- 维修项目标题
    sheet.write(8, 0, '序号', style_bodyC)
    sheet.write_merge(8, 8, 1, 4, '维修项目', style_bodyC)
    sheet.write(8, 5, '修理费', style_bodyC)
    sheet.write(8, 6, '序号', style_bodyC)
    sheet.write_merge(8, 8, 7, 10, '维修项目', style_bodyC)
    sheet.write(8, 11, '修理费', style_bodyC)

    # 第 10 + n 行 --- 维修项目的清单
    
    # 维修专用
    i = 0
    row = 0
    first = 0
    second = 5
    third = 1
    for key in newMain:
        print(key)
        sheet.write(9 + row, first, i + 1, style_bodyC)
        sheet.write_merge(9 + row, 9 + row, third, third + 3, key['label'], style_bodyC)
        sheet.write(9 + row, second, key['inputs'], style_bodyC)
        i += 1
        if (i % 2) != 0:
            first = 6
            second = 11
            third = 7
        else:
            first = 0
            second = 5
            third = 1
            row += 1
        
    # 第 11 + n 行 --- 维修费小计
    sheet.write_merge(9 + mainLength, 9 + mainLength, 0, 11, '维修费小计: ' + newDict[0].maintenanceFees, style_body)

    # 第 12 + n 行 --- 材料项目的标题
    sheet.write(10 + mainLength, 0, '序号', style_bodyC)
    sheet.write(10 + mainLength, 1, '材料项目', style_bodyC)
    sheet.write(10 + mainLength, 2, '数量', style_bodyC)
    sheet.write(10 + mainLength, 3, '单位', style_bodyC)
    sheet.write(10 + mainLength, 4, '单价', style_bodyC)
    sheet.write(10 + mainLength, 5, '金额', style_bodyC)
    sheet.write(10 + mainLength, 6, '序号', style_bodyC)
    sheet.write(10 + mainLength, 7, '材料项目', style_bodyC)
    sheet.write(10 + mainLength, 8, '数量', style_bodyC)
    sheet.write(10 + mainLength, 9, '单位', style_bodyC)
    sheet.write(10 + mainLength, 10, '单价', style_bodyC)
    sheet.write(10 + mainLength, 11, '金额', style_bodyC)

    # 第 13 + n + x 行 --- 材料项目清单
    j = 0
    rows = 0
    n = 0
    for key in newMaterial:
        sheet.write(11 + rows + mainLength, n, j + 1, style_bodyC)
        sheet.write(11 + rows + mainLength, n + 1, key['materialList'], style_bodyC)
        sheet.write(11 + rows + mainLength, n + 2, key['inputCount'], style_bodyC)
        sheet.write(11 + rows + mainLength, n + 3, key['unt'], style_bodyC)
        sheet.write(11 + rows + mainLength, n + 4, key['inputNum'], style_bodyC)
        sheet.write(11 + rows + mainLength, n + 5, key['money'], style_bodyC)
        j += 1
        if (j % 2) != 0:
            n = 6
        else:
            n = 0
            rows += 1

    # 第 14 + n + x 行 --- 材料费小计
    sheet.write_merge(12 + allLength, 12 + allLength, 0, 11, '材料费小计: ' + newDict[0].materialFees, style_body)

    # 剩余信息
    sheet.write_merge(13 + allLength, 13 + allLength, 0, 5, '合计金额: ' + newDict[0].allMoneyChina, style_quote)
    sheet.write(13 + allLength, 8, '总计:', style_quote)
    sheet.write_merge(13 + allLength, 13 + allLength, 9, 10, newDict[0].allMoney, style_quoteC)

    if newDict[0].payment == '1':
        payment = '未入账'
    else:
        payment = '已入账'
    sheet.write_merge(14 + allLength, 14 + allLength, 0, 5, '入账方式: '+ payment, style_quote)

    # 底部的特殊样式
    sheet.write(13 + allLength, 11, '', style_bodyR)
    sheet.write(14 + allLength, 11, '', style_bodyR)
    # 中间空一行
    sheet.write_merge(15 + allLength, 15 + allLength, 0, 11, '', style_bodyB)

    sheet.write_merge(16 + allLength, 16 + allLength, 1, 2, '客户验收及签署: ', style_quote)
    sheet.write_merge(16 + allLength, 16 + allLength, 9, 11, newDict[0].tableTitle, style_quote)

    sheet.write(17 + allLength, 8, '电话: ', style_quote)
    sheet.write_merge(17 + allLength, 17 + allLength, 9, 11, newDict[0].telePhone, style_quote)
    sheet.write(18 + allLength, 8, '地址: ', style_quote)
    sheet.write_merge(18 + allLength, 18 + allLength, 9, 11, newDict[0].local, style_quote)

    


    # 写出到IO
    output = io.BytesIO()
    wb.save(output)
    # 重新定位到开始
    output.seek(0)
    response.write(output.getvalue()) 
    return response