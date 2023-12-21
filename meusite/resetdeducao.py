import os
from django.core.wsgi import get_wsgi_application

# Configurando o ambiente Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'meusite.settings')
application = get_wsgi_application()

# Agora você pode importar seus modelos
from produtos.models import DeducaoHistorico, Produtos  # Certifique-se de usar o caminho correto para seus modelos

# Restante do seu script

Produtos.objects.all().delete()
DeducaoHistorico.objects.all().delete()