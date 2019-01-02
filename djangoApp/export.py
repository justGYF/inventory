from django.http import HttpResponse

from djangoApp.models import Introduce
import xlwt
import io
import sys

# 使导出的中文文件名不会变为"下载"
from django.utils.http import urlquote

def exportExcel(request, ids):
    # 设置文件名
    newDict = Introduce.objects.filter(id = ids)
    fileName = urlquote(newDict[0].fileName)
    # 设置HttpResponse的类型
    response = HttpResponse(content_type='application/vnd.ms-excel')
    response['Content-Disposition'] = 'attachment;filename='+ fileName +'.xls'
    # new一个文件
    wb = xlwt.Workbook(encoding = 'utf-8')
    # new一个sheet
    sheet = wb.add_sheet(u'人员表单')
    # 维护一些样式， style_heading, style_body, style_red, style_green
    style_heading = xlwt.easyxf("""
    font:
        name Arial,
        colour_index white,
        bold on,
        height 0xA0;
    align:
        wrap off,
        vert center,
        horiz center;
    pattern:
        pattern solid,
        fore-colour 0x19;
    borders:
        left THIN,
        right THIN,
        top THIN,
        bottom THIN;
    """)
    style_body = xlwt.easyxf("""
    font:
        name Arial,
        bold off,
        height 0XA0;
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
    style_green = xlwt.easyxf(" pattern: pattern solid,fore-colour 0x11;")
    style_red = xlwt.easyxf(" pattern: pattern solid,fore-colour 0x0A;")
    fmts = [
        'M/D/YY',
        'D-MMM-YY',
        'D-MMM',
        'MMM-YY',
        'h:mm AM/PM',
        'h:mm:ss AM/PM',
        'h:mm',
        'h:mm:ss',
        'M/D/YY h:mm',
        'mm:ss',
        '[h]:mm:ss',
        'mm:ss.0',
    ]
    style_body.num_format_str = fmts[0]
 
  # 写标题栏
    sheet.write(0,0, '结算单号', style_heading) 
    sheet.write(0,1, '进厂日期', style_heading) 
    sheet.write(0,2, '出厂日期', style_heading) 
    sheet.write(0,3, '结算日期', style_heading) 
    sheet.write(0,4, '车牌', style_heading) 
    sheet.write(0,5, '车型', style_heading) 
    sheet.write(0,6, '修理类别', style_heading) 
    sheet.write(0,7, '车主', style_heading) 
    sheet.write(0,8, '联系人', style_heading) 
    sheet.write(0,9, '手机', style_heading)
    sheet.write(0,10, '车架号', style_heading)
    
  # 写数据
    row = 1
    if not newDict:
        print('error')
    else:
        for usa in newDict:
            sheet.write(row,0, usa.tableTitle, style_body)
            sheet.write(row,1, usa.billNum, style_body)
            sheet.write(row,2, usa.incomingDate, style_body)
            sheet.write(row,3, usa.outDate, style_body)
            sheet.write(row,4, usa.settlementDate, style_body)
            sheet.write(row,5, usa.worker, style_body)
            sheet.write(row,6, usa.licensePlate, style_body)
            sheet.write(row,7, usa.carModel, style_body)
            sheet.write(row,8, usa.fixType, style_body)
            sheet.write(row,9, usa.incomingMileage, style_body)
            sheet.write(row, 10, usa.carFrameCode, style_body)
        row=row + 1

    # 写出到IO
    output = io.BytesIO()
    wb.save(output)
    # 重新定位到开始
    output.seek(0)
    response.write(output.getvalue()) 
    return response