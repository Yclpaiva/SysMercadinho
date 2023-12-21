from django.shortcuts import render
from .models import Produtos, DeducaoHistorico
import shutil
from django.contrib.auth.decorators import login_required

@login_required
def reset_database(request):
    backup_path = '/home/yuri/Documentos/GitHub/SysMercadinho/teste3/meusite/backup.sqlite3'
    db_path = '/home/yuri/Documentos/GitHub/SysMercadinho/teste3/meusite/db.sqlite3'
    
    try:
        shutil.copyfile(backup_path, db_path)
        return render(request, 'reset_database_sucesso.html')
    except Exception as e:
        return render(request, 'reset_database_erro.html', {'error_message': str(e)})

@login_required
def historico(request):
    historico_deducoes = DeducaoHistorico.objects.all()
    return render(request, 'historico.html', {'historico_deducoes': historico_deducoes})


@login_required
def produtos(request):
    dados = Produtos.objects.all()
    return render(request,'ver_produto.html',{'dados':dados})
