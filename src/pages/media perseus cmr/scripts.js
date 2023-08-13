const peso_exercicio = 0.5;
const peso_licao = 1;
const peso_mapa = 1;
const peso_participacao = 0.5;
const peso_prova = 5;
const peso_simulado = 0.5;
const peso_trabalho = 1.5;
const botao_calcular = document.getElementById("calcular");
const botao_limpar = document.getElementById("limpar");

let exercicio;
let licao;
let mapa;
let participacao;
let prova;
let simulado;
let trabalho;
let media;
let resultado;

botao_calcular.addEventListener("click", calcular);
botao_limpar.addEventListener("click", limpar);

function calcular() {
        exercicio = parseFloat((document.getElementById("exercicio").value).replace(",", "."));
        licao = parseFloat((document.getElementById("licao").value).replace(",", "."));
        mapa = parseFloat((document.getElementById("mapa").value).replace(",", "."));
        participacao = parseFloat((document.getElementById("participacao").value).replace(",", "."));
        prova = parseFloat((document.getElementById("prova").value).replace(",", "."));
        simulado = parseFloat((document.getElementById("simulado").value).replace(",", "."));
        trabalho = parseFloat((document.getElementById("trabalho").value).replace(",", "."));
        media = document.getElementById("media");
        analisador();
        resultado = ((exercicio * peso_exercicio) + (licao * peso_licao) + (mapa * peso_mapa) + (participacao * peso_participacao) + (prova * peso_prova) + (simulado * peso_simulado) + (trabalho * peso_trabalho)) / (peso_exercicio + peso_licao + peso_mapa + peso_participacao + peso_prova + peso_simulado + peso_trabalho);
        resultado = resultado.toFixed(2);
        media.value = resultado;
        if (resultado >= 9) media.style.color = "green";
        else if (resultado >= 6 && resultado < 9) media.style.color = "blue";
        else media.style.color = "red";
}
function limpar() {
        document.getElementById("exercicio").value = "";
        document.getElementById("licao").value = "";
        document.getElementById("mapa").value = "";
        document.getElementById("participacao").value = "";
        document.getElementById("prova").value = "";
        document.getElementById("simulado").value = "";
        document.getElementById("trabalho").value = "";
        media.value = "";
        exercicio = 0;
        licao = 0;
        mapa = 0;
        participacao = 0;
        prova = 0;
        simulado = 0;
        trabalho = 0;
        resultado = 0;
}

function analisador() {
        if (isNaN(exercicio)) exercicio = 0;
        if (isNaN(licao)) licao = 0;
        if (isNaN(mapa)) mapa = 0;
        if (isNaN(participacao)) participacao = 0;
        if (isNaN(prova)) prova = 0;
        if (isNaN(simulado)) simulado = 0;
        if (isNaN(trabalho)) trabalho = 0;
}
