from django.db import models

# Create your models here.

class Categoria(models.Model):
    nome = models.CharField(max_length=20)
    def __str__(self):
        return self.nome
    
    
from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User

class Produtos(models.Model):
    nome = models.CharField(max_length=100)
    preco = models.DecimalField(decimal_places=2, max_digits=6)
    quantidade = models.IntegerField(default=0)
    categoria = models.ForeignKey(Categoria, on_delete=models.DO_NOTHING)

    def __str__(self):
        return self.nome

class DeducaoHistorico(models.Model):
    usuario = models.ForeignKey(User, on_delete=models.CASCADE)
    produto = models.ForeignKey(Produtos, on_delete=models.CASCADE)
    quantidade_deduzida = models.PositiveIntegerField()
    data_deducao = models.DateTimeField(default=timezone.now)
    preco_default = 0  # Adicionando preço padrão
    preco_total = models.DecimalField(decimal_places=2, max_digits=10)  # Adicionando a variável preço_total

    def calcular_preco_total(self):
        return self.produto.preco * self.quantidade_deduzida

    def save(self, *args, **kwargs):
        # Definindo o preço padrão antes de salvar
        if not self.preco_default:
            self.preco_default = 0

        # Calculando e atribuindo o preço total antes de salvar
        self.preco_total = self.calcular_preco_total()

        super(DeducaoHistorico, self).save(*args, **kwargs)

    def __str__(self):
        return f'{self.usuario.username} deduziu {self.quantidade_deduzida} do produto {self.produto.nome} em {self.data_deducao}'
