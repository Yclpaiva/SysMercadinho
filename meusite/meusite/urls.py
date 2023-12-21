from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('', include('produtos.urls')),
    path('admin/', admin.site.urls),
    path('',include('login.urls')),
    path('', include('home.urls')),
]
