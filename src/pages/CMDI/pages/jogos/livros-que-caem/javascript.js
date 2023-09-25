document.body.style.zoom = "150%";

class DropZones {
    constructor(element) {
        this.element = element;
    }
    setX(value) {
        this.element.style.left = value;
    }
    setY(value) {
        this.element.style.top = value;
    }
    getX() {
        return this.element.style.left;
    }
    getY() {
        return this.element.style.top;
    }
};
class Books {
    constructor(element) {
        this.element = element;
    }
    setX(value) {
        this.element.style.left = value;
    }
    setY(value) {
        this.element.style.top = value;
    }
    getX() {
        return this.element.style.left;
    }
    getY() {
        return this.element.style.top;
    }
};
var counter = 0;
var tutorial_bool = true;
var timer;
var b = null;
var d = null;
var aux = [null, null];
var i;
var dropZone = [];
var book = [];
var book_dropZone = [];
var d_b = []
var collection = document.querySelectorAll(".droplocation");

for (i = 0; i < collection.length; i++) {
    dropZone[i] = new DropZones(collection[i]);
}

collection = document.querySelectorAll(".books");

for (i = 0; i < collection.length; i++) {
    book[i] = new Books(collection[i]);
}

const locations_x = ["40px", "80px", "120px", "160px", "200px", "240px", "280px", "320px"];
const locations_y = ["5px", "140px", "280px"];

function startGame() {
    document.getElementById("menu").style.top = "150%";
    positionDropLocations();
    tutorial();
}

function tutorial() {
    if (tutorial_bool == true) {
        tutorial_bool = false;
        document.getElementById("tutorial").style.top = "10%";
        document.getElementById("tutorial").onclick = () => {
            document.getElementById("tutorial").style.top = "-100%";
            play();
        };
    } else {
        play();
    }
}
function play() {
    document.getElementById("not-click").style.display = "block";
    document.getElementById("text").style.display = "block";
    document.getElementById("text").style.color = "white";
    document.getElementById("text").textContent = "MEMORIZE!";
    randomizer();
    setTimeout(() => {
        document.getElementById("hotbar").style.left = "0px";
        document.getElementById("not-click").style.display = "none";
        document.getElementById("text").style.color = "lime";
        document.getElementById("text").textContent = "JOGUE!";
        document.getElementById("timer").style.display = "block";
        let char1;
        let char2;
        let min = 0;
        let s = 0;
        timer = setInterval(() => {
            if (min <= 9) char2 = "0";
            else char2 = "";
            if (s <= 9) char1 = "0";
            else char1 = "";
            document.getElementById("timer").textContent = char2 + min + ":" + char1 + s;
            s++;
            if (s >= 60) {
                s = 0;
                min++;
            }
        }, 1000);
    }, 8000);
}
function end() {
    document.getElementById("hotbar").style.left = "-250px";
    document.getElementById("tutorial").style.top = "10%";
    document.getElementById("tutorial").style.background = "rgb(147, 80, 80)";
    document.getElementById("tutorial").style.border = "3px solid rgb(255, 147, 147)";
    document.getElementById("tutorial").style.padding = "10px";
    document.getElementById("tutorial").innerHTML = "Você venceu!<br>Os livros estão arrumados denovo. Obrigado<br><br>Deseja jogar novamente?<br><br><center><button onclick='document.location.reload(true);' class='button'>Sim!</button></center>";
    clearInterval(timer);
}
function randomizer() {
    let book_used = [];
    let flag = true;
    for (i = 0; i < book.length; i++) {
        flag = true;
        while (flag == true) {
            let identify_d = "D" + (1 + (Math.floor(Math.random() * dropZone.length)));
            let identify_b = "B" + (1 + (Math.floor(Math.random() * book.length)));
            if (document.getElementById(identify_d).src.includes("null") && !(book_used.includes(identify_b))) {
                book_used.push(identify_b);
                document.getElementById(identify_d).src = document.getElementById(identify_b).src;
                book_dropZone[i] = {
                    book_src: document.getElementById(identify_b).src,
                    dropZone_id: identify_d
                };
                flag = false;
            }
        }
    }
    setTimeout(() => {
        for (i = 0; i < dropZone.length; i++) {
            document.getElementById("D" + (i + 1)).src = "books/null.png";
        }
    }, 8000);
}
function positionDropLocations() {
    let x = 0;
    let y = 0;
    for (i = 0; i < dropZone.length; i++) {
        dropZone[i].setX(locations_x[x]);
        dropZone[i].setY(locations_y[y]);
        x++;
        if (x >= locations_x.length) {
            x = 0;
            y++;
        }
    }
}
function clique(id) {
    if (id.includes("B")) {
        b = id;
        for (let c = 0; c < book.length; c++) {
            let indices = "B" + (c + 1);
            document.getElementById(indices).style.border = "0";
        }
        document.getElementById(b).style.border = "solid 2px deepSkyBlue";
    }
    else {
        if (document.getElementById(id).src.includes("null")) {
            d = id;
        } else {
            aux[i] = id;
            i++;
            if (i > 1) i = 0;
        }
        for (let c = 0; c < dropZone.length; c++) {
            let indices = "D" + (c + 1);
            document.getElementById(indices).style.border = "dotted 2px white";
        }
        document.getElementById(id).style.border = "solid 2px red";
    }

    if (b != null && d != null) {
        document.getElementById(d).src = document.getElementById(b).src;
        document.getElementById(b).style.display = "none";
        document.getElementById(d).style.border = "dotted white 2px";
        correct(b, d);
        b = null;
        d = null;
        i = 0;
    }
    else if (d != null && aux[0] != null && aux[1] == null) {
        document.getElementById(d).style.border = "dotted 2px white";
        document.getElementById(aux[0]).style.border = "dotted 2px white";
        document.getElementById(d).src = document.getElementById(aux[0]).src;
        document.getElementById(aux[0]).src = "books/null.png";
        correct(d, d);
        aux[0] = null;
        d = null;
        i = 0;
    }
    else if (aux[0] != null && aux[1] != null) {
        let auxilar = document.getElementById(aux[0]).src;
        document.getElementById(aux[0]).src = document.getElementById(aux[1]).src;
        document.getElementById(aux[1]).src = auxilar;
        document.getElementById(aux[0]).style.border = "dotted 2px white";
        document.getElementById(aux[1]).style.border = "dotted 2px white";
        correct(aux[0], aux[0]);
        correct(aux[1], aux[1]);
        aux[0] = null;
        aux[1] = null;
    }
}
function correct(a, c) {
    for (i = 0; i < book_dropZone.length; i++) {
        if (book_dropZone[i].book_src == document.getElementById(a).src && book_dropZone[i].dropZone_id == c) {
            setInterval(() => document.getElementById(c).style.border = "lime solid 3px",1);
            document.getElementById(c).onclick = "";
            counter++;
        }
        if (counter >= book.length) end();
    }
}