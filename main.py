import kivy
from kivy.app import App
from kivy.uix.screenmanager import Screen,ScreenManager
from kivy.uix.boxlayout import BoxLayout
from kivy.uix.gridlayout import GridLayout
from kivy.uix.button import Button
import sqlite3
localdatabase = '/home/yuri/Área de Trabalho/Python/Projetos/Projeto Mercadinho/meusite/db.sqlite3'
dbsqlite = sqlite3.connect(localdatabase)
cursorDB = dbsqlite.cursor()
"""teste = cursorDB.execute('SELECT * FROM produtos_produtos')"""

#ativa os prints de debugging do programa
myOwnDebug = True

class BancoDeDados():
    def quantidade():
        quantidade = list(cursorDB.execute('SELECT quantidade FROM produtos_produtos'))
        resultados = quantidade
        #transforma a lista de tuplas em uma lista simples
        quantidades = [row[0] for row in resultados]
        print(quantidade)
        return quantidades
    def idproduto():
        idproduto = list(cursorDB.execute('SELECT id FROM produtos_produtos'))
        resultados = idproduto
        #transforma a lista de tuplas em uma lista simples
        idprodutos = [row[0] for row in resultados]
        print(idproduto)
        return idprodutos
    
    def preco():
        preco = list(cursorDB.execute('SELECT preco FROM produtos_produtos'))
        resultados = preco
        #transforma a lista de tuplas em uma lista simples
        precos = [row[0] for row in resultados]
        print(preco)
        return precos
    def nome():
        nome = list(cursorDB.execute('SELECT nome FROM produtos_produtos'))
        resultados = nome
        #transforma a lista de tuplas em uma lista simples
        nomes = [row[0] for row in resultados]
        print(nomes)
        return nomes
    
BancoDeDados.nome()
#Classe TelaManager que organiza todas as janelas dentro do app
class TelaManager(ScreenManager):
  
    pass

#self.manager.ids.screen2.ids.label_1.text = self.ids.txt.text 
class Screen1(Screen):
    """def receberTxt(self):
        #vai no manager, pega os ids, dos ids vai no screen2, pega os ids do screen2
        #vai no label_1 do screen2 e abre o text do label_1
        #recebe o valor do input de txt_input que está dentro do screen1
        self.manager.ids.screen2.ids.label_1.text = self.ids.txt_input.text
        print(self.manager.ids.screen2.ids.label_1.text)
        #vai no manager do próprio screen1(TelaManager), recebe o valor da screen atual exibida
        #e altera o valor da screen atual exibida para o name:'screen2' que no caso é a classe Screen2
        self.manager.current = 'screen2'
    pass"""
                
    def receberTxt(self,text):
        #vai no manager, pega os ids, dos ids vai no screen2, pega os ids do screen2
        #vai no label_1 do screen2 e abre o text do label_1
        #recebe o valor do input de txt_input que está dentro do screen1
        self.manager.ids.screen2.ids.label_1.text = text
        #recebe o valor como argumento vindo da chamada de função do Button_1 dentro do Screen1
        if myOwnDebug == True: print(self.manager.ids.screen2.ids.label_1.text,list(cursorDB.execute('SELECT * FROM produtos_produtos')),)

        self.manager.current = 'screen2'
        #vai no manager do próprio screen1(TelaManager), recebe o valor da screen atual exibida
        #e altera o valor da screen atual exibida para o name:'screen2' que no caso é a classe Screen2
        pass

class Screen2(Screen):
    pass


class Box(BoxLayout):
    def __init__(self, **kw):
        super(Box,self).__init__(**kw)
        self.bd = BancoDeDados
        for i in range(len(self.bd.idproduto())):  
            self.ids.box.add_widget(Tabela(self.bd.idproduto()[i],self.bd.nome()[i],self.bd.quantidade()[i]))
        
        
class Tabela(Button):
    def __init__(self, id, nome, quantidade, **kw):
        super(Tabela,self).__init__(**kw)
        self.text = nome
    pass
#Cria a class que chama o Layout FirstLayout e atribui as configurações de um
#executável
class SysMercadinho(App):
    #o nome do arquivo .kv tem que ser o mesmo nome dessa classe só que em minusculo
    title = 'SysMercadinho'
    def build(self):
        return Box()
    
    
    
if __name__ == '__main__':
    #Executa a class SysMercadinho com a função .run(), da classe App
    SysMercadinho().run()
