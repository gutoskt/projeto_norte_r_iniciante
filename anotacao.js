window.addEventListener('DOMContentLoaded', carregarAnotacoes);{

    let listaElement = document.querySelector("#app ul"); /* Forma de selecionar uma estrutura html*/
    let inputElement = document.querySelector("#app input");
    let buttonElment = document.querySelector("#app button");
    const containerAnotacoes = document.getElementById("caixaTesto");

    let tarefas = JSON.parse(localStorage.getItem("@listaTarefa")) || []; // Pega a lista salva no local storage ou cria uma lista vazia

    renderTarefas(); // Chama a função para renderizar as tarefas salvas
    carregarAnotacoes();

    function salvar(){

        localStorage.setItem("@listaTarefa", JSON.stringify(tarefas));// Salva a lista de tarefas no local storage como uma string JSON
    }

    function excluirTarefa(posicao){
        
        tarefas.splice(posicao, 1);//
        renderTarefas();
        salvar();

    }

    function renderTarefas(){

        listaElement.innerHTML = "";//
        
        tarefas.map((tarefaP) => { /* ele anda pela lista ee usa o nome para conlovar os elementos da lista */
            let liElement = document.createElement("li");// Cria um elemento li (item de lista)
            let tarefaText = document.createTextNode(tarefaP);// Cria um nó de texto com o conteúdo da tarefa
            let linkElement = document.createElement("a");// Cria um elemento de link
            let linkText = document.createTextNode("Excluir");// Cria um nó de texto para o link

            let posicao = tarefas.indexOf(tarefaP);

            linkElement.setAttribute("href", "#");// Define o atributo href do link
            linkElement.appendChild(linkText);// Adiciona o texto ao link 
            linkElement.setAttribute("onclick", `excluirTarefa(${posicao})`);// Define o atributo onclick do link para chamar a função excluirTarefa com a posição correta
            liElement.appendChild(tarefaText);// Adiciona o texto da tarefa ao item de lista
            liElement.appendChild(linkElement);//
            listaElement.appendChild(liElement);// Adiciona o item de lista à lista principal
        
        });
    }


    function adcionarTarefa(){

        if(inputElement.value === ''){
            alert("Digite alguma tarefa");
            return false
        } else {
            let novaTarefa = inputElement.value;

            tarefas.push(novaTarefa);
            inputElement.value = '';

            renderTarefas();
            salvar();
        }
    }

    buttonElment.onclick = adcionarTarefa

    function salvarAnotacoes(){

    const textareas = containerAnotacoes.querySelectorAll("textarea");
    
    const dados = Array.from(textareas).map(textarea => textarea.value);
    
    localStorage.setItem('minhasAnotacoes', JSON.stringify(dados));
    }

    function carregarAnotacoes() {
    
        const dadosString = localStorage.getItem('minhasAnotacoes');
    

        if (dadosString) {

            const anotacoes = JSON.parse(dadosString);

            anotacoes.forEach(texto => {// Para cada anotação salva

            const novoTextarea = document.createElement("textarea");
            const novoExcluir = document.createElement("button");

            novoExcluir.innerText = "X";
            novoExcluir.onclick = function() {
                containerAnotacoes.removeChild(novoTextarea);
                containerAnotacoes.removeChild(novoExcluir);
                salvarAnotacoes();
            };

            novoTextarea.setAttribute("placeholder", "Digite sua anotação aqui...");
            novoTextarea.value = texto; // Importante: coloca o texto salvo
            containerAnotacoes.appendChild(novoTextarea);
            containerAnotacoes.appendChild(novoExcluir);

            });
        }
    }

    window.novaAnotacao = function() {
        // 1. Cria o novo elemento <textarea>
        const novoTextarea = document.createElement("textarea");
        const novoExcluir = document.createElement("button");

        novoExcluir.innerText = "X";
        novoExcluir.onclick = (() =>{
            containerAnotacoes.removeChild(novoTextarea);
            containerAnotacoes.removeChild(novoExcluir);
            salvarAnotacoes();
        });

        novoTextarea.setAttribute("placeholder", "Digite sua anotação aqui...");

        containerAnotacoes.appendChild(novoTextarea);// 2. Adiciona ao container de anotações
        containerAnotacoes.appendChild(novoExcluir);

        salvarAnotacoes();
    }

    containerAnotacoes.addEventListener('blur', (evento) => {
    
    if (evento.target.tagName === 'TEXTAREA') {
        salvarAnotacoes();
    }
    }, true);

    
}
