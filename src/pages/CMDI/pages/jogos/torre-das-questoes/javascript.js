document.body.style.zoom = "150%";

var player = new npc(
        "player",
        100,
        player_img_pack,
        50,
        380,
        300,
        600,
        160,
        document.getElementById("player"),
        false
);

var enemy = new npc(
        "warrior",
        100,
        enemy_1_img_pack,
        10,
        380,
        300,
        -100,
        160,
        document.getElementById("enemy"),
        false
);

var tempo;

var timer;

var used_questions = [];
var timer_timeouts = [];

var level = 1;
var answer_now;

hide_all();

function hide_all() {
        document.getElementById("enemy").style.display = "none";
        document.getElementById("player").style.display = "none";
        document.getElementById("enemy_life_bar").style.display = "none";
        document.getElementById("player_life_bar").style.display = "none";
        document.getElementById("timer").style.display = "none";
        body.style.backgroundImage = "url('assets/scene/backgrounds/menu.gif')";
        elements[0].style.display = "none";
        elements[1].style.display = "none";
        elements[2].style.display = "none";
        pergunta.style.display = "none";
        document.getElementById("particles").src = "assets/scene/particles/nothing.png";
}

function play() {
        document.getElementById("play").style.display = "none";
        document.getElementById("title").style.display = "none";
        document.getElementById("tutorial").style.top = "20%";
}

function start() {
        document.getElementById("tutorial").style.top = "-50%";
        let func = () => {
                document.getElementById("enemy").style.display = "block";
                document.getElementById("player").style.display = "block";
                document.getElementById("enemy_life_bar").style.display = "block";
                document.getElementById("player_life_bar").style.display = "block";
                document.getElementById("timer").style.display = "block";
                elements[0].style.display = "block";
                elements[1].style.display = "block";
                elements[2].style.display = "block";
                pergunta.style.display = "block";
                enemy.idle();
                player.idle();
                question();
                enemy_setter(level);
        };
        blackout(func);
}

function blackout(func) {
        document.getElementById("particles").style.background = "black";
        setTimeout(() => document.getElementById("particles").style.background = "transparent", 4000);
        setTimeout(() => func(), 4000);
}

function test(txt) {
        let cooldown;
        if (txt == answer_now) player_attack();
        else enemy_attack();
        elements[0].style.display = "none";
        elements[1].style.display = "none";
        elements[2].style.display = "none";
        pergunta.style.display = "none";
        if (enemy.life > 0) cooldown = 1200;
        else cooldown = 6000;
        setTimeout(() => {
                elements[0].style.display = "block";
                elements[1].style.display = "block";
                elements[2].style.display = "block";
                pergunta.style.display = "block";
        }, cooldown);
}
function player_attack() {
        if (player.life > 0) {
                player.attack();
                enemy.hurt();
                enemy.life -= player.damage;
                enemy_life_bar.style.background = "linear-gradient(to right, lime " + enemy.life + "%, red 0%)";
                if (enemy.life <= 0) {
                        level++;
                        setTimeout(() => enemy.die(), enemy.img_pack.hurt.length * fps);
                        setTimeout(() => {
                                let func = () => {
                                        enemy_setter(level);
                                        if (level > 6) hide_all();
                                }
                                blackout(func);
                        }, (enemy.img_pack.die.length * fps) + (enemy.img_pack.hurt.length * fps));
                        enemy_life_bar.style.background = "linear-gradient(to right, lime " + enemy.life + "%, red 0%)";
                } else {
                        question();
                }
        }
}
function enemy_attack() {
        if (enemy.life > 0) {
                enemy.attack();
                player.hurt();
                player.life -= enemy.damage;
                player_life_bar.style.background = "linear-gradient(to right, lime " + player.life + "%, red 0%)";
                if (player.life <= 0) {
                        pergunta.style.display = "none";
                        elements[0].style.display = "none";
                        elements[1].style.display = "none";
                        elements[2].style.display = "none";
                        setTimeout(() => player.die(), player.img_pack.hurt.length * fps);
                        clearInterval(timer);
                        let func = () => endGame("lose");
                        blackout(func);
                } else {
                        question();
                }
        }
}
function random(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
}
function question() {
        enemy_life_bar.style.background = "linear-gradient(to right, lime " + enemy.life + "%, red 0%)";
        clearInterval(timer);
        switch (level) {
                case 1:
                        tempo = 45 * 1000;
                        if (enemy.life <= 50) {
                                questionMaker(0, questions.length);
                        }
                        else if (enemy.life > 50) {
                                questionMaker(1, questions.length);
                        }
                        break;
                case 2:
                        tempo = 40 * 1000;
                        if (enemy.life <= 50) {
                                questionMaker(2, questions.length);
                        }
                        else if (enemy.life > 50) {
                                questionMaker(3, questions.length);
                        }
                        break;
                case 3:
                        tempo = 35 * 1000;
                        if (enemy.life <= 50) {
                                questionMaker(4, questions.length);
                        }
                        else if (enemy.life > 50) {
                                questionMaker(5, questions.length);
                        }
                        break;
                case 4:
                        tempo = 30 * 1000;
                        if (enemy.life <= 50) {
                                questionMaker(6, questions.length);
                        }
                        else if (enemy.life > 50) {
                                questionMaker(7, questions.length);
                        }
                        break;
                case 5:
                        tempo = 25 * 1000;
                        if (enemy.life <= 50) {
                                questionMaker(8, questions.length);
                        }
                        else if (enemy.life > 50) {
                                questionMaker(9, questions.length);
                        }
                        break;
                case 6:
                        tempo = 10 * 1000;
                        if (enemy.life <= 50) {
                                questionMaker(10, questions.impossible_length);
                        }
                        else if (enemy.life > 50) {
                                questionMaker(10, questions.impossible_length);
                        }
                        break;
        }
        timer = setInterval(() => enemy_attack(), tempo);
        for (let i = 0; i < hourglass.length; i++) {
                clearTimeout(timer_timeouts[i]);
        }
        for (let i = 0; i < hourglass.length; i++) {
                timer_timeouts[i] = setTimeout(() => timer_img.src = hourglass[i], (tempo / (hourglass.length - 4)) * i);
        }
}
function enemy_setter(lvl) {
        switch (lvl) {
                case 1:
                        body.style.backgroundImage = "url('assets/scene/backgrounds/background_1.png')";
                        body.style.backgroundSize = "190% 200%";
                        particles.src = "assets/scene/particles/nothing.png";
                        player.element.style.filter = "brightness(100%)";
                        enemy.element.style.filter = "brightness(100%)";
                        enemy.type = "warrior";
                        enemy.life = 100;
                        enemy.img_pack = enemy_1_img_pack;
                        enemy.damage = 20;
                        player.damage = 50;
                        enemy.setY(160);
                        enemy.arriving("left");
                        player.arriving("right");
                        question();
                        break;
                case 2:
                        body.style.backgroundImage = "url('assets/scene/backgrounds/background_1.png')";
                        body.style.backgroundSize = "190% 200%";
                        particles.src = "assets/scene/particles/nothing.png";
                        player.element.style.filter = "brightness(100%)";
                        enemy.element.style.filter = "brightness(100%)";
                        enemy.type = "warrior";
                        enemy.life = 100;
                        enemy.img_pack = enemy_2_img_pack;
                        enemy.damage = 20;
                        player.damage = 40;
                        enemy.setY(160);
                        enemy.arriving("left");
                        player.arriving("right");
                        question();
                        break;
                case 3:
                        body.style.backgroundImage = "url('assets/scene/backgrounds/background_2.png')";
                        body.style.backgroundSize = "190% 200%";
                        particles.src = "assets/scene/particles/nothing.png";
                        player.element.style.filter = "brightness(45%)";
                        enemy.element.style.filter = "brightness(45%)";
                        enemy.type = "troll";
                        enemy.life = 100;
                        enemy.img_pack = enemy_3_img_pack;
                        enemy.damage = 20;
                        player.damage = 30;
                        enemy.setY(120);
                        enemy.setX(-50);
                        player.arriving("right");
                        enemy.idle();
                        question();
                        break;
                case 4:
                        body.style.backgroundImage = "url('assets/scene/backgrounds/background_2.png')";
                        body.style.backgroundSize = "190% 200%";
                        particles.src = "assets/scene/particles/nothing.png";
                        player.element.style.filter = "brightness(45%)";
                        enemy.element.style.filter = "brightness(45%)";
                        enemy.type = "troll";
                        enemy.life = 100;
                        enemy.img_pack = enemy_4_img_pack;
                        enemy.damage = 30;
                        player.damage = 25;
                        enemy.setY(120);
                        enemy.setX(-50);
                        player.arriving("right");
                        enemy.idle();
                        question();
                        break;
                case 5:
                        body.style.backgroundImage = "url('assets/scene/backgrounds/background_2.png')";
                        body.style.backgroundSize = "190% 200%";
                        particles.src = "assets/scene/particles/nothing.png";
                        player.element.style.filter = "brightness(45%)";
                        enemy.element.style.filter = "brightness(45%)";
                        enemy.type = "troll";
                        enemy.life = 100;
                        enemy.img_pack = enemy_5_img_pack;
                        enemy.damage = 50;
                        player.damage = 20;
                        enemy.setY(120);
                        enemy.setX(-50);
                        player.arriving("right");
                        enemy.idle();
                        question();
                        break;
                case 6:
                        body.style.backgroundImage = "url('assets/scene/backgrounds/background_4.gif')";
                        body.style.backgroundSize = "100% 100%";
                        particles.src = "assets/scene/particles/particles.gif";
                        player.element.style.filter = "brightness(50%)";
                        enemy.element.style.filter = "brightness(200%)";
                        enemy.type = "boss";
                        enemy.life = 100;
                        enemy.img_pack = boss_img_pack;
                        enemy.damage = 100;
                        player.damage = 5;
                        enemy.setY(120);
                        enemy.setX(-50);
                        player.arriving("right");
                        enemy.idle();
                        question();
                        break;
                default:
                        setTimeout(() => {
                                endGame("win");
                        }, 500);
                        break;
        }
}

function objectKeyValue(object, key, value) {
        return Object.values(object)[key][value];
}

function questionMaker(dificul_discip, qtd) {
        let used_positions = [];
        let r = [];
        qtd--;
        do { r[0] = random(0, qtd); }
        while (used_questions.includes(objectKeyValue(questions, dificul_discip, r[0])));
        used_questions.push(objectKeyValue(questions, dificul_discip, r[0]));
        pergunta.textContent = objectKeyValue(questions, dificul_discip, r[0]);
        r[1] = random(0, 2);
        elements[r[1]].textContent = objectKeyValue(answer, dificul_discip, r[0]);
        used_positions[0] = r[1];
        do { r[1] = random(0, 2); }
        while (used_positions.includes(r[1]));
        elements[r[1]].textContent = objectKeyValue(wrong_1, dificul_discip, r[0]);
        used_positions[1] = r[1];
        do { r[1] = random(0, 2); }
        while (used_positions.includes(r[1]));
        elements[r[1]].textContent = objectKeyValue(wrong_2, dificul_discip, r[0]);
        used_positions[2] = r[1];
        answer_now = objectKeyValue(answer, dificul_discip, r[0]);
}

function endGame(result) {
        hide_all();
        body.style.backgroundImage = "url(assets/scene/backgrounds/" + result + ".gif)";
        body.style.backgroundSize = "100% 100%";
        document.getElementById("title").style.display = "block";
        document.getElementById("title").textContent = "Fim de jogo";
        document.getElementById("title").style.left = "25%";
        document.getElementById("title").style.top = "0";
        document.getElementById("restart").style.display = "block";
        document.getElementById("description").style.display = "block";
        if(result == "win") document.getElementById("description").textContent = final.win;
        else document.getElementById("description").textContent = final.lose;
}