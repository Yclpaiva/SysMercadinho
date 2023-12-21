import os
from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'meusite.settings')
application = get_wsgi_application()


from produtos.models import DeducaoHistorico, Produtos


Produtos.objects.all().delete()
DeducaoHistorico.objects.all().delete()