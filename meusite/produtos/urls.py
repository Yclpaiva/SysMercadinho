from django.urls import path
from . import views
from .views import historico, reset_database


urlpatterns = [
    path('produtos/', views.produtos, name='produtos'),
    path('historico/', historico, name='historico'),
    path('reset_database/', reset_database, name='reset_database'),
]
