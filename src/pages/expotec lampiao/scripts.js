const iframe = document.getElementById("frame");
const tools = document.getElementById("tools");
const personalizar = document.getElementById("personalizar");
const root = document.querySelector(':root');
const container = document.getElementById("container");
const loading = document.getElementById("loading");
document.body.style.zoom = "67%";

var color = 0; 
var zoom = 100;
var bright = 100;

if(window.localStorage.getItem("corPrimaria")) {
    let color = window.localStorage.getItem("corPrimaria");
    root.style.setProperty('--cor-primaria', color);
}

document.body.onload = () => loading.style.display = "none";

function start() {
    container.style.display = "none";
    iframe.src = "https://www.google.com/webhp?igu=1";
    tools.style.display = "flex";
    iframe.style.display = "block";
}

function custom() {
    personalizar.style.display = "flex";
}

function changeColor(id) {
    let style = window.getComputedStyle(document.getElementById(id));
    let color = style.getPropertyValue("background-color");
    root.style.setProperty('--cor-primaria', color);
}

function save() {
    window.localStorage.setItem("corPrimaria", root.style.getPropertyValue("--cor-primaria"));
    personalizar.style.display = "none";
}

function menu() {
    iframe.src = "#";
    iframe.style.display = "none";
    tools.style.display = "none";
    container.style.display = "flex";
}

function blackAndWhite() {
    if(iframe.style.filter == "grayscale(100%)")
        iframe.style.filter = "grayscale(0%)";
    else 
        iframe.style.filter = "grayscale(100%)";
}

function invert() {
    if(iframe.style.filter == "invert(100%)")
        iframe.style.filter = "invert(0%)";
    else 
        iframe.style.filter = "invert(100%)";
}

function highContrast() {
    if(iframe.style.filter == "contrast(150%)")
        iframe.style.filter = "contrast(100%)";
    else 
        iframe.style.filter = "contrast(150%)";
}

function satured() {
    if(iframe.style.filter == "saturate(200%)")
        iframe.style.filter = "saturate(100%)";
    else 
        iframe.style.filter = "saturate(200%)";
}

function colorBlind() {
    color += 90;
    iframe.style.filter = "hue-rotate(" + color + "deg)";
}

function moreBright() {
    if (bright <= 200) bright += 10;
    iframe.style.filter = "brightness(" + bright + "%)";
}

function lessBright() {
    if (bright >= 20) bright -= 10;
    iframe.style.filter = "brightness(" + bright + "%)";
}