const anotac = document.getElementById("anotacao1");
const regist = document.getElementById("registro");
const relat = document.getElementById("relatorio");


function mostrarAnotacoes(){
    anotac.style.display = "flex";
    regist.style.display = "none";
    relat.style.display = "none";
}

function mostrarRegistros(){
    anotac.style.display = "none";
    regist.style.display = "flex";
    relat.style.display = "none";
}

function mostrarRelatorios(){
    anotac.style.display = "none";
    regist.style.display = "none";
    relat.style.display = "flex";
}

