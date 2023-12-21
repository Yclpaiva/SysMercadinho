           
            function abrirModal() {
                document.getElementById("modal").style.display = "block";
            }
    
            function fecharModal() {
                document.getElementById("modal").style.display = "none";
            }

            function moverTabela2ParaDiv() {
                var tabela2 = document.getElementById("tabela2-body");
                var totalprecodiv = document.getElementById("total-tabela2");
                var divTabela2 = document.getElementById("divTabela2");
            
                // Clona a tabela2
                var tabela2Clone = tabela2.cloneNode(true);
                var totalprecoclone = totalprecodiv.cloneNode(true);
            
                // Adiciona a tabela2 clonada à div
                divTabela2.innerHTML = ""; // Limpa qualquer conteúdo existente
                divTabela2.appendChild(tabela2Clone);
                divTabela2.appendChild(totalprecoclone);
            }
            

        var quantidadePorNome = {};
        var precoPorNome = {};
    
        function moverParaTabela2(row) {
            
            var tabela2Body = document.getElementById("tabela2-body");
            var nome = row.cells[0].innerHTML;
            var quantidade = parseInt(row.cells[1].innerHTML);
            var preco = parseFloat(row.cells[2].innerHTML.replace(",", "."));
        
            if (quantidade > 0) {
                if (!quantidadePorNome[nome]) {
                    quantidadePorNome[nome] = 1;
                    precoPorNome[nome] = preco;
                    
                    // Criar nova linha na Tabela 2
                    var newRow = tabela2Body.insertRow();
                    var cell1 = newRow.insertCell(0);
                    var cell2 = newRow.insertCell(1);
                    var cell3 = newRow.insertCell(2);
        
                    // Atribui o produtoId à linha da Tabela 2
                    newRow.dataset.produtoId = row.dataset.id;  // Corrigido para atribuir dataset.produtoId corretamente
                    console.log("produtoId:", row.dataset.produtoId);
                    cell1.innerHTML = nome;
                    cell2.innerHTML = quantidadePorNome[nome];
                    cell3.innerHTML = precoPorNome[nome].toFixed(2);
        
                    // Atualizar a quantidade na Tabela 1
                    row.cells[1].innerHTML = quantidade - 1;
                } else {
                    quantidadePorNome[nome]++;
                    precoPorNome[nome] += preco;
    
                    // Atualizar a quantidade na linha correspondente da Tabela 2
                    var tabela2Rows = tabela2Body.getElementsByTagName("tr");
                    var found = false;
                    for (var i = 0; i < tabela2Rows.length; i++) {
                        if (tabela2Rows[i].cells[0].innerHTML === nome) {
                            tabela2Rows[i].cells[1].innerHTML = quantidadePorNome[nome];
                            tabela2Rows[i].cells[2].innerHTML = precoPorNome[nome].toFixed(2);
                            found = true;
                            break;
                        }
                    }
    
                    // Se o nome não foi encontrado na Tabela 2, criar nova linha
                    if (!found) {
                        var newRow = tabela2Body.insertRow();
                        var cell1 = newRow.insertCell(0);
                        var cell2 = newRow.insertCell(1);
                        var cell3 = newRow.insertCell(2);
    
                        cell1.innerHTML = nome;
                        cell2.innerHTML = quantidadePorNome[nome];
                        cell3.innerHTML = precoPorNome[nome].toFixed(2);
                    }
    
                    // Atualizar a quantidade na Tabela 1
                    row.cells[1].innerHTML = quantidade - 1;
                }
            }
            
            atualizarFooterTabela2();
        }


        function deduzirValores() {
            // Obtém o token CSRF da página
            var csrfToken = getCSRFToken();  // Certifique-se de definir a função getCSRFToken() para obter o token
        
            // Obtém os dados da tabela2
            var tabela2Rows = document.getElementById("tabela2-body").getElementsByTagName("tr");
            var dadosParaDeduzir = [];
        
            for (var i = 0; i < tabela2Rows.length; i++) {
                var id = tabela2Rows[i].dataset.produtoId;  // Obtém o id da linha na Tabela 2
                var quantidade = parseInt(tabela2Rows[i].cells[1].innerHTML);
        
                dadosParaDeduzir.push({ id: id, quantidade: quantidade });
            }
        
            // Envia os dados para o servidor, incluindo o token CSRF no cabeçalho
            fetch('deduzir_valor/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken,
                },
                body: JSON.stringify({ dados: dadosParaDeduzir }),
            })
            .then(response => response.json())
            .then(data => {
                // Trata a resposta do servidor, se necessário
                console.log('Resposta do servidor:', data);
        
                // Atualiza o conteúdo da divTabela2 com a resposta do servidor
                atualizarConteudoDivTabela2(data);
            })
            .catch(error => {
                console.error('Erro ao enviar solicitação:', error);
            });
        
            alert("Pedido feito com sucesso!");
            location.reload();
        }
        
        // Função para obter o token CSRF da página (substitua isso pela lógica real de obtenção do token)
        function getCSRFToken() {
            // Obtém o token CSRF do cookie
            var csrfCookie = document.cookie.match(/csrftoken=([\w-]+)/);
            if (csrfCookie) {
                return csrfCookie[1];
            }
            return null;
        }
        
        
        
        
            function atualizarConteudoDivTabela2(data) {
                // Lógica para atualizar o conteúdo da divTabela2 com base na resposta do servidor
                var divTabela2 = document.getElementById("divTabela2");
                
                // Exemplo simples: substituir o conteúdo com a mensagem do servidor
                divTabela2.innerHTML = '<p>' + data.mensagem + '</p>';
                
                // Adicione lógica adicional conforme necessário
            }

        
            function atualizarConteudoDivTabela2(data) {
                // Lógica para atualizar o conteúdo da divTabela2 com base na resposta do servidor
                var divTabela2 = document.getElementById("divTabela2");
                
                // Exemplo simples: substituir o conteúdo com a mensagem do servidor
                divTabela2.innerHTML = '<p>' + data.mensagem + '</p>';
                
                // Adicione lógica adicional conforme necessário
            }
        

            function atualizarFooterTabela2() {
                var tabela2Body = document.getElementById("tabela2-body");
                var totalPreco = 0;
            
                // Iterar sobre as linhas da Tabela 2 para calcular o total
                var tabela2Rows = tabela2Body.getElementsByTagName("tr");
                for (var i = 0; i < tabela2Rows.length; i++) {
                    totalPreco += parseFloat(tabela2Rows[i].cells[2].innerHTML);
                }
            
                // Atualizar o elemento do footer com o total calculado
                var totalTabela2Element = document.getElementById("total-tabela2");
                totalTabela2Element.innerHTML = "R$ " + totalPreco.toFixed(2);
            
                // Verificar se há algum valor na Tabela 2
                if (tabela2Rows.length > 0) {
                    // Verificar se o contêiner de botões já existe
                    var containerBotoes = document.getElementById("container-botoes");
                    if (!containerBotoes) {
                        // Criar o contêiner de botões se não existir
                        containerBotoes = document.createElement("div");
                        containerBotoes.id = "container-botoes";
                        containerBotoes.style.display = "flex";
                        containerBotoes.style.justifyContent = "space-between";
                        containerBotoes.style.position = "fixed";
                        containerBotoes.style.bottom = "0";
                        containerBotoes.style.width = "100%";
                        document.body.appendChild(containerBotoes);
                    }
            
                    // Adicionar o botão "Finalizar Carrinho" se não existir
                    var botaoFinalizarCarrinho = document.getElementById("botao-finalizar-carrinho");
                    if (!botaoFinalizarCarrinho) {
                        botaoFinalizarCarrinho = document.createElement("button");
                        botaoFinalizarCarrinho.textContent = "Finalizar Carrinho";
                        botaoFinalizarCarrinho.id = "botao-finalizar-carrinho";
                        botaoFinalizarCarrinho.onclick = function () {
                            // Ação a ser executada ao clicar no botão "Finalizar Carrinho"
                            moverTabela2ParaDiv();
                            abrirModal();
                        };
            
                        // Adicionar o botão "Finalizar Carrinho" ao contêiner
                        containerBotoes.appendChild(botaoFinalizarCarrinho);
                    }
            
                    // Adicionar o botão "Limpar Nota" se não existir
                    var botaoLimparNota = document.getElementById("botao-limpar-nota");
                    if (!botaoLimparNota) {
                        botaoLimparNota = document.createElement("button");
                        botaoLimparNota.textContent = "Limpar Nota";
                        botaoLimparNota.id = "botao-limpar-nota";
                        botaoLimparNota.onclick = function () {
                            // Ação a ser executada ao clicar no botão "Limpar Nota"
                            limparTabela2();
                        };
            
                        // Adicionar o botão "Limpar Nota" ao contêiner
                        containerBotoes.appendChild(botaoLimparNota);
                    }
                } else {
                    // Se não houver nenhum valor na Tabela 2, remover o contêiner de botões se existir
                    var containerBotoesExistente = document.getElementById("container-botoes");
                    if (containerBotoesExistente) {
                        containerBotoesExistente.parentNode.removeChild(containerBotoesExistente);
                    }
                }
            }
            
            
            
        
        

        function limparTabela1() {
            var tabela1Body = document.getElementById("tabela1-body");
            tabela1Body.innerHTML = "";
        }
    
        function limparTabela2() {
            location.reload();
        }
    
        document.addEventListener("DOMContentLoaded", function () {
            // Adicionar evento de clique às células da coluna "Quantidade" na Tabela 1
            var tabela1Body = document.getElementById("tabela1-body");
            tabela1Body.addEventListener("click", function (event) {
                var target = event.target;
                if (target.tagName === "TD" && target.cellIndex === 1) {
                    // Mover para a Tabela 2 quando a célula da coluna "Quantidade" é clicada
                    var row = target.parentNode;
                    moverParaTabela2(row);
                }
            });
        });
        