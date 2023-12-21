           
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

                var tabela2Clone = tabela2.cloneNode(true);
                var totalprecoclone = totalprecodiv.cloneNode(true);
            
                divTabela2.innerHTML = ""; 
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

                    var newRow = tabela2Body.insertRow();
                    var cell1 = newRow.insertCell(0);
                    var cell2 = newRow.insertCell(1);
                    var cell3 = newRow.insertCell(2);

                    newRow.dataset.produtoId = row.dataset.id;
                    console.log("produtoId:", row.dataset.produtoId);
                    cell1.innerHTML = nome;
                    cell2.innerHTML = quantidadePorNome[nome];
                    cell3.innerHTML = precoPorNome[nome].toFixed(2);
        

                    row.cells[1].innerHTML = quantidade - 1;
                } else {
                    quantidadePorNome[nome]++;
                    precoPorNome[nome] += preco;
    
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
    
                    if (!found) {
                        var newRow = tabela2Body.insertRow();
                        var cell1 = newRow.insertCell(0);
                        var cell2 = newRow.insertCell(1);
                        var cell3 = newRow.insertCell(2);
    
                        cell1.innerHTML = nome;
                        cell2.innerHTML = quantidadePorNome[nome];
                        cell3.innerHTML = precoPorNome[nome].toFixed(2);
                    }
    
                    row.cells[1].innerHTML = quantidade - 1;
                }
            }
            
            atualizarFooterTabela2();
        }


        function deduzirValores() {

            var csrfToken = getCSRFToken(); 
        
            var tabela2Rows = document.getElementById("tabela2-body").getElementsByTagName("tr");
            var dadosParaDeduzir = [];
        
            for (var i = 0; i < tabela2Rows.length; i++) {
                var id = tabela2Rows[i].dataset.produtoId; 
                var quantidade = parseInt(tabela2Rows[i].cells[1].innerHTML);
        
                dadosParaDeduzir.push({ id: id, quantidade: quantidade });
            }
        

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
                console.log('Resposta do servidor:', data);
        
                atualizarConteudoDivTabela2(data);
            })
            .catch(error => {
                console.error('Erro ao enviar solicitação:', error);
            });
        
            alert("Pedido feito com sucesso!");
            location.reload();
        }
        
        function getCSRFToken() {

            var csrfCookie = document.cookie.match(/csrftoken=([\w-]+)/);
            if (csrfCookie) {
                return csrfCookie[1];
            }
            return null;
        }
        
        
        
        
            function atualizarConteudoDivTabela2(data) {

                var divTabela2 = document.getElementById("divTabela2");
                
                divTabela2.innerHTML = '<p>' + data.mensagem + '</p>';
                
            }

        
            function atualizarConteudoDivTabela2(data) {
                var divTabela2 = document.getElementById("divTabela2");
                divTabela2.innerHTML = '<p>' + data.mensagem + '</p>';

            }
        

            function atualizarFooterTabela2() {
                var tabela2Body = document.getElementById("tabela2-body");
                var totalPreco = 0;

                var tabela2Rows = tabela2Body.getElementsByTagName("tr");
                for (var i = 0; i < tabela2Rows.length; i++) {
                    totalPreco += parseFloat(tabela2Rows[i].cells[2].innerHTML);
                }

                var totalTabela2Element = document.getElementById("total-tabela2");
                totalTabela2Element.innerHTML = "R$ " + totalPreco.toFixed(2);

                if (tabela2Rows.length > 0) {

                    var containerBotoes = document.getElementById("container-botoes");
                    if (!containerBotoes) {
                        containerBotoes = document.createElement("div");
                        containerBotoes.id = "container-botoes";
                        containerBotoes.style.display = "flex";
                        containerBotoes.style.justifyContent = "space-between";
                        containerBotoes.style.position = "fixed";
                        containerBotoes.style.bottom = "0";
                        containerBotoes.style.width = "100%";
                        document.body.appendChild(containerBotoes);
                    }
            
                    var botaoFinalizarCarrinho = document.getElementById("botao-finalizar-carrinho");
                    if (!botaoFinalizarCarrinho) {
                        botaoFinalizarCarrinho = document.createElement("button");
                        botaoFinalizarCarrinho.textContent = "Finalizar Carrinho";
                        botaoFinalizarCarrinho.id = "botao-finalizar-carrinho";
                        botaoFinalizarCarrinho.onclick = function () {

                            moverTabela2ParaDiv();
                            abrirModal();
                        };
            
                        containerBotoes.appendChild(botaoFinalizarCarrinho);
                    }
            
                    var botaoLimparNota = document.getElementById("botao-limpar-nota");
                    if (!botaoLimparNota) {
                        botaoLimparNota = document.createElement("button");
                        botaoLimparNota.textContent = "Limpar Nota";
                        botaoLimparNota.id = "botao-limpar-nota";
                        botaoLimparNota.onclick = function () {
                            limparTabela2();
                        };
            
                        containerBotoes.appendChild(botaoLimparNota);
                    }
                } else {

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
            var tabela1Body = document.getElementById("tabela1-body");
            tabela1Body.addEventListener("click", function (event) {
                var target = event.target;
                if (target.tagName === "TD" && target.cellIndex === 1) {

                    var row = target.parentNode;
                    moverParaTabela2(row);
                }
            });
        });
        