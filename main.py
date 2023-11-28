import kivy
from kivy.app import App
from kivy.uix.screenmanager import Screen,ScreenManager
from kivy.uix.boxlayout import BoxLayout
from kivy.uix.gridlayout import GridLayout
import sqlite3
localdatabase = '/home/yuri/Área de Trabalho/Python/Projetos/Projeto Mercadinho/meusite/db.sqlite3'
dbsqlite = sqlite3.connect(localdatabase)
cursorDB = dbsqlite.cursor()
"""teste = cursorDB.execute('SELECT * FROM produtos_produtos')"""

#ativa os prints de debugging do programa
myOwnDebug = True

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
        if myOwnDebug == True: 
            print(
            self.manager.ids.screen2.ids.label_1.text,
            list(cursorDB.execute('SELECT * FROM produtos_produtos')),
                 )
        
        self.manager.current = 'screen2'
        #vai no manager do próprio screen1(TelaManager), recebe o valor da screen atual exibida
        #e altera o valor da screen atual exibida para o name:'screen2' que no caso é a classe Screen2
        pass
    
class Screen2(Screen):
    pass

#Cria a class que chama o Layout FirstLayout e atribui as configurações de um
#executável
class SysMercadinho(App):
    #o nome do arquivo .kv tem que ser o mesmo nome dessa classe só que em minusculo
    title = 'SysMercadinho'
    def build(self):
        return TelaManager()
    
    
    
if __name__ == '__main__':
    #Executa a class SysMercadinho com a função .run(), da classe App
    SysMercadinho().run()
