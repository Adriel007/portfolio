const peso_prova = 3;
const peso_relatorio = 1.5;
const peso_tarefa = 3;
const peso_tic = 1;
const peso_trabalho = 1.5;
const botao_calcular = document.getElementById("calcular");
const botao_limpar = document.getElementById("limpar");

var prova;
var relatorio;
var tarefa;
var tic;
var trabalho;

botao_calcular.addEventListener("click", calcular);
botao_limpar.addEventListener("click", limpar);

function calcular() {
        prova = parseFloat((document.getElementById("prova").value).replace(",", "."));
        relatorio = parseFloat((document.getElementById("relatorio").value).replace(",", "."));
        tarefa = parseFloat((document.getElementById("tarefa").value).replace(",", "."));
        tic = parseFloat((document.getElementById("exerciciotic").value).replace(",", "."));
        trabalho = parseFloat((document.getElementById("trabalho").value).replace(",", "."));
        media = document.getElementById("media");
        analisador();
        resultado = ((prova * peso_prova) + (relatorio * peso_relatorio) + (tarefa * peso_tarefa) + (tic * peso_tic) + (trabalho * peso_trabalho)) / (peso_prova + peso_relatorio + peso_tarefa + peso_tic + peso_trabalho);
        resultado = resultado.toFixed(2);
        media.value = resultado;
        if (resultado >= 9) media.style.color = "green";
        else if (resultado >= 6 && resultado < 9) media.style.color = "blue";
        else media.style.color = "red";
}
function limpar() {
        document.getElementById("prova").value = "";
        document.getElementById("relatorio").value = "";
        document.getElementById("tarefa").value = "";
        document.getElementById("exerciciotic").value = "";
        document.getElementById("trabalho").value = "";
        media.value = "";
        prova = 0;
        relatorio = 0;
        tarefa = 0;
        tic = 0;
        trabalho = 0
}

function analisador() {
        if (isNaN(prova)) prova = 0;
        if (isNaN(relatorio)) relatorio = 0;
        if (isNaN(tarefa)) tarefa = 0;
        if (isNaN(tic)) tic = 0;
        if (isNaN(trabalho)) trabalho = 0;
}
