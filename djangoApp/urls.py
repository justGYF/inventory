from django.conf.urls import url
 
from . import operatetable,projectlist,login

urlpatterns = [
    url(r'^updateNum$', operatetable.updateNum),
    url(r'^insertNum$', operatetable.insertNum),
    url(r'^deleteNum$', operatetable.deleteNum),
    url(r'^searchNum$', operatetable.searchNum),
    url(r'^showSomeFile$', operatetable.showSomeFile),
    url(r'^showFileList$', operatetable.showFileList),
    url(r'^projectlist$', projectlist.projectlist),
    url(r'^login$', login.login)
]
