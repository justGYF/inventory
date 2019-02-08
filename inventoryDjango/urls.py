from django.conf.urls import url, include
from django.views.generic import TemplateView
from . import view
import djangoApp.urls
 
urlpatterns = [
    url(r'^hello$', view.hello),
    url(r'^api/', include(djangoApp.urls)),
    url(r'^$', TemplateView.as_view(template_name="index.html"))
]