from django.urls import path
from . import views
from .views import deduzir_valor

urlpatterns = [
    path('',views.home,name='home',),
    
    path('deduzir_valor/', deduzir_valor, name='deduzir_valor'),
    
]

