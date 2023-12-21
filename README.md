# Documentação: Iniciando o manage.py no Django

## Introdução

O `manage.py` é um script de linha de comando fornecido pelo Django para realizar várias tarefas administrativas relacionadas ao seu projeto. Ele serve como uma interface para executar comandos de gerenciamento, como iniciar o servidor de desenvolvimento, criar migrações, criar superusuário, entre outros.
todo comando do django tem que ser dado atráves do interpretador python, selecionando o manage.py e dado no sys.arg o comando requisitado.
## Requisitos

Antes de começar, certifique-se de que o ambiente Django esteja configurado e as dependências do projeto tenham sido instaladas. Você pode fazer isso usando um ambiente virtual e instalando os requisitos do projeto.

```bash
# Crie um ambiente virtual (opcional, mas recomendado)
python -m venv sysmercadinho

# Ative o ambiente virtual
source sysmercadinho/bin/activate  # Linux/Mac

# Instale as dependências do projeto
pip install django
```


## Iniciando o Servidor de Desenvolvimento

1. Abra um terminal.

2. Navegue até o diretório do projeto usando o comando `cd`:

   ```bash
   cd GitHub/SysMercadinho/meusite/
   ```

3. Execute o seguinte comando para iniciar o servidor de desenvolvimento:

   ```bash
   python manage.py runserver
   ```

   Isso iniciará o servidor e estará pronto para receber solicitações em `http://127.0.0.1:8000/`.

### Usuários

o usuário padrão já configurado é:
login: yuri
senha: 1234

mas para ara criar um novo superusuário, execute:

```bash
python manage.py createsuperuser
```

Siga as instruções para fornecer nome de usuário, endereço de e-mail e senha.


### Configurar o reset do banco de dados

O reset do banco de dados funciona de que, ele tem um arquivo chamado "backup.sq3lite" na pasta raiz do programa, junto com o banco de dados que está sendo utilizado pelo sistema, chamado "db.sq3lite",
para o botão de reset do banco de dados que fica no header de todas as páginas funcionar, é necessário configurar o local que está esses arquivos na função da view que ele está configurado.

o local da view é:
GitHub/SysMercadinho/meusite/produtos/views.py

abrindo a view, veremos a seguinte função:

'''Python
@login_required
def reset_database(request):
    backup_path = '/home/yuri/Documentos/GitHub/SysMercadinho/teste3/meusite/backup.sqlite3'
    db_path = '/home/yuri/Documentos/GitHub/SysMercadinho/teste3/meusite/db.sqlite3'
    
    try:
        shutil.copyfile(backup_path, db_path)
        return render(request, 'reset_database_sucesso.html')
    except Exception as e:
        return render(request, 'reset_database_erro.html', {'error_message': str(e)})
'''

em que 
"backup_path = '/home/yuri/Documentos/GitHub/SysMercadinho/teste3/meusite/backup.sqlite3'" é o local em que o backup.sq3lite está no sistema,
"db_path = '/home/yuri/Documentos/GitHub/SysMercadinho/teste3/meusite/db.sqlite3'" é o local em que o db.sqlite3 está no sistema,


para o botão de resetar banco de dados funcionar, é necessário colocar o local certo em que os arquivos .sqlite3 estão no sistema.

----

Essas são as únicas configurações prévias necessárias para o funcionamento do sistema, a partir de agora veremos as funcionalidades do sistema e a escolha de design



