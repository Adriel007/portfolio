document.body.style.zoom = "150%";

const w = 500; //em casa 100
const h = 300; //em casa 100
const tutorialDiv = document.getElementById("tutorial");
const buttons = document.getElementsByClassName("button");
const subtitles = document.getElementById("subtitle");
const titles = document.getElementById("title");
const menu_ball = document.getElementById("menu-ball");
const timer = document.getElementById("timer");
const label = document.getElementById("label");
const colors = [
    rgba(255, 0, 0, 1),//red
    rgba(0, 255, 0, 1),//green
    rgba(0, 0, 255, 1),//blue
    rgba(128, 0, 128, 1),//purple
    rgba(255, 255, 0, 1),//yellow
    rgba(0, 255, 255, 1),//cyan
    rgba(255, 192, 203, 1),//pink
    rgba(255, 165, 0, 1),//orange
    rgba(0, 0, 0, 1)//black
];

var balls = [];
var velocidade = 1.1;
var modo;
var dificuldadeNumero;
var porcentagem;
var tempo;
var blackHole;
var analisys = 0;
var winPossible = true;

//window.localStorage.setItem("hardWin", "false"); //bloqueia dificuldade fortec
//window.localStorage.setItem("hardWin", "true"); //desbloqueia dificuldade fortec

if(window.localStorage.getItem("hardWin") == "true") {
    buttons[4].disabled = false;
    buttons[4].textContent = "FORTEC";
    buttons[4].style.fontSize = "20px";
}

timer.style.display = "none";
buttons[0].style.display = "inline";
buttons[0].style.width = "300px";
buttons[0].style.height = "150px";
buttons[0].style.fontSize = "50px";

function tutorial() {
    buttons[0].style.display = "none";
    titles.style.display = "none";
    menu_ball.style.display = "none";
    tutorialDiv.style.top = "20%";
}

function dificuldade() {
    tutorialDiv.style.top = "-100%";
    label.style.display = "block";
    buttons[1].style.display = "inline";
    buttons[2].style.display = "inline";
    buttons[3].style.display = "inline";
    buttons[4].style.display = "inline";
    if(localStorage.getItem("hardWin") == "true") subtitles.style.display = "none";
    else subtitles.style.display = "inline"; 
}

function modo(qtd) {
    label.textContent = "Modo:"
    buttons[5].style.display = "inline";
    buttons[6].style.display = "inline";
    buttons[5].style.width = "200px";
    buttons[5].style.height = "100px";
    buttons[5].style.fontSize = "30px";
    buttons[6].style.width = "200px";
    buttons[6].style.height = "100px";
    buttons[6].style.fontSize = "30px";
    buttons[1].style.display = "none";
    buttons[2].style.display = "none";
    buttons[3].style.display = "none";
    buttons[4].style.display = "none";
    subtitles.style.display = "none";
    dificuldadeNumero = qtd;
}

function startGame(mode) {
    label.style.display = "none";
    timer.style.display = "block";
    level(dificuldadeNumero);
    modo = mode;
    buttons[5].style.display = "none";
    buttons[6].style.display = "none";
    porcentagem = 0;
    setTimeout(() => {
        let s = 0;
        let m = 0;
        tempo = setInterval(() => {
            document.getElementById("timer").style.backgroundPosition = porcentagem + "%";
            porcentagem += 0.3;
            document.getElementById("timer").textContent = m + ":" + Math.floor(s);
            s += 0.1;
            if (s >= 60) {
                s = 0;
                m++;
            }
            if (porcentagem <= 40) document.getElementById("timer").style.backgroundImage = "linear-gradient(to right, lime 50%, transparent 50%)";
            if (porcentagem > 40 && porcentagem <= 80) document.getElementById("timer").style.backgroundImage = "linear-gradient(to right, gold 50%, transparent 50%)";
            if (porcentagem > 80 && porcentagem <= 100) document.getElementById("timer").style.backgroundImage = "linear-gradient(to right, red 50%, transparent 50%)";
            if (porcentagem >= 100) endGame();
        }, 100);
    }, 5000);
}

function winGame() {
    let string = "";
    if(dificuldadeNumero == 5) {
        window.localStorage.setItem("hardWin", "true");
        string = "<br>(Você desbloqueou a dificuldade secreta, volte ao menu para vê-la)<br>";
    }
    clearInterval(tempo);
    tutorialDiv.innerHTML = "<b>Parabêns<b><hr>Você estabilizou todos os átomos. Graças a você estamos a salvo. <br>" + string + "<br> <b><i>Clique aqui para jogar denovo...</i></b>";
    tutorialDiv.style.top = "20%";
    tutorialDiv.addEventListener("click", reload);
}

function endGame() {
    clearInterval(tempo);
    winPossible = false;
    let bh = document.createElement("div");
    bh.setAttribute("id", "blackHole");
    bh.setAttribute("class", "ball");
    document.body.appendChild(bh);
    blackHole = new Balls(
        document.getElementById("blackHole"),
        colors[8],
        false,
        0,
        6000,
        null,
        0
    );
    blackHole.element.style.width = "0px";
    blackHole.element.style.height = "0px";
    blackHole.setX(500);
    blackHole.setY(100);
    blackHole.blackHole();
    setTimeout(() => {
        for (let c = 0; c < balls.length; c++) {
            balls[c].element.style.transition = ".5s";
            balls[c].element.style.left = "450px";
            balls[c].element.style.top = "100px";
            balls[c].boom();
        }
        document.getElementById("timer").style.rotate = "90deg";
        document.getElementById("timer").style.width = "50px";
        document.getElementById("timer").style.position = "absolute";
        document.getElementById("timer").style.left = "500px";
        document.getElementById("timer").style.top = "150px";
    }, 2500);
    setTimeout(() => {
        document.body.style.backgroundImage = "none";
        document.body.style.color = "white";
        document.body.style.textAlign = "center";
        document.body.style.fontSize = "30px";
        document.body.style.fontWeight = "bold";
        document.body.textContent = "Clique aqui para regressar no tempo";
        document.body.addEventListener("click", reload);
    }, 13000);
}

function reload() {
    let flash = document.createElement("div");
    flash.setAttribute("class", "ball");
    flash.style.background = "white";
    flash.style.transition = ".5s";
    flash.style.left = "40%";
    flash.style.top = "20%";
    flash.style.zIndex = "10";
    document.body.appendChild(flash);
    flash.style.boxShadow = "0 0 100px 1000px white";
    setTimeout(() => location.reload(), 501);
}

function level(qtd) {
    let c = 0;
    for (let c = 0; c < qtd; c++) {
        let ballElement = document.createElement("div");
        ballElement.setAttribute("class", "ball");
        document.body.appendChild(ballElement);
    }
    Setballs();
}

function rgba(r, g, b, a) {
    return r + ", " + g + ", " + b + ", " + a;
}

function rgba_more(rgba) {
    let rgb = (rgba.replace(/, /g, " ")).split(" ");
    for (let c = 0; c <= 2; c++) {
        rgb[c] = parseInt(rgb[c]);
        if (rgb[c] < 255) rgb[c] += 10;
    }
    return rgb[0] + ", " + rgb[1] + ", " + rgb[2] + ", " + rgb[3];
}

function Setballs() {
    for (let c = 0; c < document.getElementsByClassName("ball").length; c++) {
        balls.push(new Balls(
            document.getElementsByClassName("ball")[c],
            colors[c],
            true,
            0,
            4,
            null,
            3000
        ));
    }
    for (let c = 0; c < balls.length; c++) balls[c].moviment();
}