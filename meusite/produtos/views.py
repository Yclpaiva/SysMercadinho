from django.shortcuts import render
from django.http import HttpResponse
from .models import Produtos, DeducaoHistorico
from django.core.management import call_command
import shutil
import os
from django.contrib.auth.decorators import login_required

@login_required
def reset_database(request):
    # Obtém o caminho completo para o arquivo de backup
    backup_path = '/home/yuri/Documentos/GitHub/SysMercadinho/teste3/meusite/backup.sqlite3'
    
    # Obtém o caminho completo para o arquivo do banco de dados principal
    db_path = '/home/yuri/Documentos/GitHub/SysMercadinho/teste3/meusite/db.sqlite3'
    
    try:
        # Copia o arquivo de backup para o arquivo do banco de dados principal
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
    return render(
        request,
        'ver_produto.html',
        {'dados':dados},        
                  )

# views.py
