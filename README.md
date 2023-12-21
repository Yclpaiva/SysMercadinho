# Documentação: 



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


login: ```yuri```


senha: ```1234```

mas para criar um novo superusuário, execute:

```bash
python manage.py createsuperuser
```

Siga as instruções para fornecer nome de usuário, endereço de e-mail e senha.


### Configurar o reset do banco de dados

O reset do banco de dados funciona de que, ele tem um arquivo chamado "backup.sq3lite" na pasta raiz do programa, junto com o banco de dados que está sendo utilizado pelo sistema, chamado "db.sq3lite",
para o botão de reset do banco de dados que fica no header de todas as páginas funcionar, é necessário configurar o local que está esses arquivos na função da view que ele está configurado.

o local da view é:
```bash
GitHub/SysMercadinho/meusite/produtos/views.py
```

abrindo a view, veremos a seguinte função:

```python
@login_required
def reset_database(request):
    backup_path = '/home/yuri/Documentos/GitHub/SysMercadinho/teste3/meusite/backup.sqlite3'
    db_path = '/home/yuri/Documentos/GitHub/SysMercadinho/teste3/meusite/db.sqlite3'
    
    try:
        shutil.copyfile(backup_path, db_path)
        return render(request, 'reset_database_sucesso.html')
    except Exception as e:
        return render(request, 'reset_database_erro.html', {'error_message': str(e)})
```

em que: 

```python
backup_path = '/home/yuri/Documentos/GitHub/SysMercadinho/teste3/meusite/backup.sqlite3'
``` 

é o local em que o backup.sq3lite está no sistema, e: 

```python
db_path = '/home/yuri/Documentos/GitHub/SysMercadinho/teste3/meusite/db.sqlite3'
```

é o local em que o db.sqlite3 está no sistema.


Para o botão de resetar banco de dados funcionar, é necessário colocar o local certo em que os arquivos .sqlite3 estão no sistema.

----

Essas são as únicas configurações prévias necessárias para o funcionamento do sistema, a partir de agora veremos as funcionalidades do sistema e a escolha de design

----

### Apps Django

No Django, um "app" (aplicativo) é uma unidade modular e reutilizável que contém funcionalidades específicas dentro de um projeto. Cada aplicativo no Django é um componente independente que pode ser facilmente integrado em diferentes projetos. A estrutura de um aplicativo Django inclui modelos (models), visualizações (views), URLs, arquivos estáticos, e, opcionalmente, outros elementos como formulários, administração, e muito mais.

Aqui estão os componentes Django utilizados no projeto:

1. **Models (Modelos):** Define a estrutura do banco de dados, incluindo tabelas e campos. Os modelos geralmente são representados por classes Python que herdam da classe `django.db.models.Model`.

   Exemplo('produtos/models.py'):

   ```python
   from django.db import models
   class Produtos(models.Model):
       nome = models.CharField(max_length=100)
       preco = models.DecimalField(decimal_places=2, max_digits=6)
       quantidade = models.IntegerField(default=0)
       categoria = models.ForeignKey(Categoria, on_delete=models.DO_NOTHING)
   
       def __str__(self):
           return self.nome
   ```

2. **Views (Visualizações):** Lida com a lógica de processamento da aplicação. As visualizações são funções ou classes que recebem uma solicitação HTTP, executam a lógica necessária e retornam uma resposta HTTP.

   Exemplo ('produtos/views.py'):

   ```python
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

   ```

3. **Templates:** São arquivos HTML que definem a aparência das páginas da web. Eles podem conter variáveis e tags especiais para incorporar dinamicamente dados das visualizações.
   no django, os arquivos html contém algumas tags diferentes, especificas do django, que funcionam como scripts dentro da própria HTML. por exemplo de: {% extends "base.html" %}

   Exemplo (`ver_produto.html`):

   ```html
      {% extends "base.html" %}
      
      {% block title %}Estoque {% endblock %}
      
      {% block header %}Estoque{% endblock %}
      
      {% block content %}
          <table>
              <thead>
                  <tr>
                      <th>Nome</th>
                      <th>Quantidade</th>
                      <th>Preço</th>
                  </tr>
              </thead>
              <tbody>
                  {% for item in dados %}
                      <tr>
                          <td>{{ item.nome }}</td>
                          <td>{{ item.quantidade }}</td>
                          <td>{{ item.preco }}</td>
                      </tr>
                  {% endfor %}
              </tbody>
          </table>
      {% endblock %}


   ```

7. **URLs:** Define as rotas da aplicação. Mapeia URLs para as visualizações correspondentes.

   Exemplo (`produtos/urls.py`):

   ```python
   from django.urls import path
   from . import views
   from .views import historico, reset_database
   
   
   urlpatterns = [
       path('produtos/', views.produtos, name='produtos'),
       path('historico/', historico, name='historico'),
       path('reset_database/', reset_database, name='reset_database'),
   ]

   ```


Cada aplicativo é uma unidade autônoma, mas eles podem se comunicar entre si através de importações. A estrutura modular dos aplicativos facilita a reutilização em diferentes projetos Django, tornando a arquitetura geral do projeto mais organizada e fácil de manter.

----

# O site foi divido em 3 aplicativos, cada um com uma função.


# 1. App home

A view do aplicativo "home" e consiste em duas funções: `home` e `deduzir_valor`.

## Função `home`

### Descrição
Esta função é responsável por renderizar a página inicial (`home.html`) e exibir os dados de todos os produtos obtidos do modelo `Produtos`. A função é decorada com `@login_required`, o que significa que apenas usuários autenticados podem acessar essa página.

### Parâmetros
- `request`: O objeto de solicitação HTTP enviado pelo navegador.

### Comportamento
1. Recupera todos os objetos `Produtos` do banco de dados.
2. Renderiza a página `home.html` com os dados recuperados.


      # Documentação do Template `home.html` no App Home
      
   
      A `home.html` é o arquivo mais complexo e é onde está toda a lógica de manipulação e responsividade para o usuário, ela foi toda feita em javescript, html e css, além de utilizar os HTML dinâmicos, permitindo         que se insira conteúdo variável nas páginas web. O Django usa um mecanismo de template que inclui tags e filtros especiais, permitindo uma integração fácil entre o código Python e o HTML.
      
      
      ## Estrutura do Arquivo
      
      1. **Extensão de Template Base:**
         ```html
         {% extends "base.html" %}
         ```
      
         Este template estende o template base denominado "base.html", sugerindo que "home.html" herda estilos e estrutura da página a partir desse template base.
      
      2. **Blocos do Template:**
         ```html
         {% block title %}Minha Página{% endblock %}
         {% block header %}Home{% endblock %}
         {% block content %}
            <!-- Conteúdo do bloco -->
         {% endblock %}
         ```
      
         - **`title`:** Define o título da página como "Minha Página".
         - **`header`:** Define o cabeçalho da página como "Home".
         - **`content`:** Contém o conteúdo específico da página.
      
      3. **Carregamento de Recursos Estáticos:**
         ```html
         {% load static %}
         <link rel="stylesheet" type="text/css" href="{% static "home/css/style.css" %}">
         <script src="{% static 'home/js/home.js' %}" defer></script>
         ```
      
         Carrega arquivos estáticos, como folhas de estilo CSS e scripts JavaScript, necessários para a formatação e interatividade da página.
      
      4. **Divisão da Tabela de Produtos:**
         ```html
         <div class="tabela-container">
            <div class="metade-tela">
               <!-- Tabela 1 -->
            </div>
            <div class="metade-tela">
               <!-- Tabela 2 -->
            </div>
         </div>
         ```
      
         Divide a tela em duas partes, cada uma contendo uma tabela para exibir informações sobre os produtos.
      
      5. **Modal:**
         ```html
         <div id="modal" class="modal">
            <!-- Conteúdo do modal -->
         </div>
         ```
      
         Um modal que pode ser exibido e fechado por meio de funções JavaScript. Contém informações adicionais e um botão para deduzir valores no banco de dados.
      
      6. **Scripts JavaScript:**
         - **Funções para Manipulação do Modal:**
            - `abrirModal()`
            - `fecharModal()`
      
         - **Funções para Manipulação das Tabelas:**
            - `moverTabela2ParaDiv()`
            - `moverParaTabela2(row)`
            - `deduzirValores()`
            - `atualizarConteudoDivTabela2(data)`
            - `atualizarFooterTabela2()`
            - `limparTabela1()`
            - `limparTabela2()`
      
         - **Evento ao Carregar a Página:**
            - `document.addEventListener("DOMContentLoaded", function () { /* ... */ });`
      
      Estas funções em JavaScript manipulam dinamicamente as tabelas e interagem com o servidor para deduzir valores no banco de dados.


## Função `deduzir_valor`

### Descrição
Esta função é uma API que permite a dedução de valores da quantidade de produtos. Ela recebe uma solicitação POST contendo dados JSON que especificam os produtos a serem deduzidos e as quantidades correspondentes.

### Parâmetros
- `request`: O objeto de solicitação HTTP enviado pelo cliente.

### Comportamento
1. Recebe a solicitação POST e extrai os dados JSON dela.
2. Itera sobre os dados JSON, deduzindo as quantidades especificadas dos produtos correspondentes.
3. Registra as deduções no histórico (`DeducaoHistorico`).
4. Retorna mensagens de sucesso ou erro em formato JSON.


# 2. App Login

A view fornecida pertence ao aplicativo "login" e consiste em duas funções: `login_view` e `logout_view`. Vamos documentar cada uma delas.

## Função `login_view`

### Descrição
Esta função é responsável pelo processo de autenticação do usuário. Recebe uma solicitação POST contendo o nome de usuário e senha, autentica o usuário e redireciona para a página inicial ('home') se as credenciais forem válidas. Caso contrário, exibe uma mensagem de erro na página de login ('login.html').

### Parâmetros
- `request`: O objeto de solicitação HTTP enviado pelo navegador.

### Comportamento
1. Se a solicitação for POST, recupera o nome de usuário e senha do formulário.
2. Autentica o usuário usando `authenticate` do Django.
3. Se a autenticação for bem-sucedida, faz login no usuário usando `login(request, user)`.
4. Redireciona para a página 'home'.
5. Se as credenciais forem inválidas, exibe uma mensagem de erro na página de login.


## Função `logout_view`

### Descrição
Esta função realiza o processo de logout do usuário, encerrando a sessão atual, e redireciona para a página de login ('login').

### Parâmetros
- `request`: O objeto de solicitação HTTP enviado pelo navegador.

### Comportamento
1. Realiza o logout do usuário usando `logout(request)`.
2. Redireciona para a página de login.
3. Sempre que um usuário entrar em qualquer função de uma view, em que a função tenha o decorador @login_required, ele vai ser redirecionado para a página de login, isso está configador em
   ```
   GitHub/SysMercadinho/meusite/meusite/settings.py
   ```
Que é o arquivo de configurações geral do Django e de todos os seus aplicativos.

# 3. App Produtos

## Função da view de produtos `reset_database`

### Descrição
Esta função é responsável por restaurar o banco de dados a partir de um arquivo de backup. Apenas usuários autenticados têm permissão para executar esta ação.

### Parâmetros
- `request`: O objeto de solicitação HTTP enviado pelo navegador.

### Comportamento
1. Copia o conteúdo do arquivo de backup (`backup_path`) para o banco de dados (`db_path`).
2. Renderiza a página 'reset_database_sucesso.html' em caso de sucesso.
3. Renderiza a página 'reset_database_erro.html' em caso de erro, exibindo a mensagem de erro.


## Função da view de produtos `historico`

### Descrição
Esta função é responsável por exibir o histórico de deduções dos produtos. Apenas usuários autenticados têm permissão para acessar esta página.

### Parâmetros
- `request`: O objeto de solicitação HTTP enviado pelo navegador.

### Comportamento
1. Recupera todos os objetos `DeducaoHistorico` do banco de dados.
2. Renderiza a página 'historico.html' com os dados recuperados.


## Função da view de produtos `produtos`

### Descrição
Esta função é responsável por exibir os produtos disponíveis. Apenas usuários autenticados têm permissão para acessar esta página.

### Parâmetros
- `request`: O objeto de solicitação HTTP enviado pelo navegador.

### Comportamento
1. Recupera todos os objetos `Produtos` do banco de dados.
2. Renderiza a página 'ver_produto.html' com os dados recuperados.


## Models no App Produtos

### Modelo `Categoria`

#### Descrição
Representa uma categoria de produtos. A categoria não tem funcionalidade configurada a não ser decorativa e organizacional.

#### Campos
- `nome`: Nome da categoria.

#### Métodos
- `__str__()`: Retorna o nome da categoria como representação em string.

### Modelo `Produtos`

#### Descrição
Representa um produto.

#### Campos
- `nome`: Nome do produto.
- `preco`: Preço do produto.
- `quantidade`: Quantidade disponível do produto.
- `categoria`: Categoria do produto.

#### Métodos
- `__str__()`: Retorna o nome do produto como representação em string.

### Modelo `DeducaoHistorico`

#### Descrição
Representa o histórico de deduções dos produtos.

#### Campos
- `usuario`: Usuário que realizou a dedução.
- `produto`: Produto deduzido.
- `quantidade_deduzida`: Quantidade deduzida do produto.
- `data_deducao`: Data e hora da dedução.
- `preco_default`: Valor padrão do preço (inicializado como 0).
- `preco_total`: Preço total da dedução.

#### Métodos
- `calcular_preco_total()`: Calcula o preço total da dedução.
- `save()`: Sobrescreve o método `save` para calcular e salvar o preço total.
- `__str__()`: Retorna uma representação em string do histórico de dedução.

