class Balls {
    constructor(element, color, enabled, c, speed, move, time) {
        this.element = element;
        this.color = color;
        this.enabled = enabled;
        this.c = c;
        this.speed = speed;
        this.move = move;
        this.time = time;

        element.style.background = "rgba(" + color + ")";
        element.style.boxShadow = "0 0 100px " + c + "px " + "rgba(" + color + ")";
        element.style.transition = "ease-in-out " + speed + "s";
        this.setX(-200);
        this.setY(-200);
        element.addEventListener("click", () => {
            if (this.enabled == true) {
                this.moviment();
                this.color = rgba_more(this.color);
                this.element.style.background = "rgba(" + this.color + ")";
                this.c += 2;
                if (this.c > 85) this.c = 85;
                this.element.style.boxShadow = "0 0 100px " + this.c + "px " + "rgba(" + this.color + ")";
                //aumenta velocidade
                if (this.speed < 1 && this.speed > 0) this.speed -= 0.005;
                if (this.speed >= 1) this.speed -= 0.5;
                else this.speed -= 0;
                this.element.style.transition = "ease-in-out " + this.speed + "s";
                if (modo == 0) this.modeNormal();
                this.point(3);
            }
        });
    }

    modeNormal() {
        let rgb = (this.color.replace(/, /g, " ")).split(" ");
        rgb[0] = parseInt(rgb[0]);
        rgb[1] = parseInt(rgb[1]);
        rgb[2] = parseInt(rgb[2]);
        if (rgb[0] >= 255 && rgb[1] >= 255 && rgb[2] >= 255) this.boom();
    }
    boom() {
        setTimeout(() => {
            this.element.style.transition = ".2s";
            this.element.style.boxShadow = "0 0 100px 1000px white";
            this.element.style.width = "0px";
            this.element.style.height = "0px";
            setTimeout(() => this.element.style.opacity = "0", 201);
            this.enabled = false;
            this.point(10);
            analisys++;
            if(analisys == balls.length && winPossible == true) winGame();
        }, 501);
    }
    blackHole() {
        this.element.style.transition = ".2s";
        this.element.style.boxShadow = "0 0 100px 1000px white";
        setTimeout(() => {
            this.element.style.transition = ".3s";
            this.element.style.boxShadow = "0 0 0px 0px black";
        }, 201);
        setTimeout(() => {
            this.element.style.boxShadow = "0 0 1px 1px rgba(" + this.color + ")";
            this.element.style.transition = "20s";
            this.element.style.width = "1500px";
            this.element.style.height = "1500px";
            this.setY(-400);
            this.setX(-200);
        }, 501);
    }
    point(pontos) {
        let span = document.createElement("span");
        span.setAttribute("id", this.color);
        span.setAttribute("class", "points");
        span.style.left = this.getX();
        span.style.top = this.getY();
        span.textContent = "+ " + pontos + "s";
        span.style.color = "rgba(" + this.color + ")";
        document.body.appendChild(span);
        let fadeEffect = setInterval(() => {
            if (!span.style.opacity) { span.style.opacity = 1; }
            if (span.style.opacity > 0) { span.style.opacity -= 0.7; }
            else { clearInterval(fadeEffect); }
        }, 200);
        setTimeout(() => span.remove(), 1001);
        porcentagem -= pontos;
        if (porcentagem <= 0) porcentagem = 0;
        document.getElementById("timer").style.backgroundPosition = porcentagem + "%";
    }
    moviment() {
        this.move = null;
        this.time -= 10;
        if (this.time <= 0) this.time = 0;
        this.move = setInterval(() => {
            this.randomic();
        }, this.time);
    }
    getX() {
        return this.element.style.left;
    }
    setX(value) {
        this.element.style.left = value + "px";
    }
    getY() {
        return this.element.style.top;
    }
    setY(value) {
        this.element.style.top = value + "px";
    }
    randomic() {
        this.setX(Math.floor(Math.random() * (window.innerWidth - w)));
        this.setY(Math.floor(Math.random() * (window.innerHeight - h)));
    }
};