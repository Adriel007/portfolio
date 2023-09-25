class npc {
    constructor(type, life, img_pack, damage, w, h, x, y, element, bool) {
        this.tyoe = type;
        this.life = life;
        this.img_pack = img_pack;
        this.damage = damage;
        this.w = w;
        this.h = h;
        this.x = x;
        this.y = y;
        this.element = element;
        this.bool = bool;

        w = window.getComputedStyle(this.element).width;
        h = window.getComputedStyle(this.element).height;
        x = window.getComputedStyle(this.element).left;
        y = window.getComputedStyle(this.element).top;
        bool = false;
    }
    setW(value) {
        this.element.style.width = value + "px";
        this.w = value;
    }
    setH(value) {
        this.element.style.height = value + "px";
        this.h = value;
    }
    setX(value) {
        this.element.style.left = value + "px";
        this.x = value;
    }
    setY(value) {
        this.element.style.top = value + "px";
        this.y = value;
    }
    arriving(direction) {
        if (direction == "left") {
            this.bool = true;
            this.setX(-200);
            for (let i = 0; this.img_pack.walk[i] != undefined; i++) {
                let func = () => {
                    if (this.x <= -100) {
                        this.element.src = this.img_pack.walk[i];
                        this.x += 5;
                        this.setX(this.x);
                    }
                };
                delay(i, func, this);
            }
        } else {
            this.bool = true;
            this.setX(750);
            for (let i = 0; this.img_pack.walk[i] != undefined; i++) {
                let func = () => {
                    if (this.x > 500) {
                        this.element.src = this.img_pack.walk[i];
                        this.x -= 5;
                        this.setX(this.x);
                    }
                };
                delay(i, func, this);
            }
        }
    }
    idle() {
        this.bool = true;
        if (this.type == "troll") trollFixer(true, 0, this, "idle");
        for (let i = 0; this.img_pack.idle[i] != undefined; i++) {
            let func = () => this.element.src = this.img_pack.idle[i];
            delay(i, func, this);
        }
    }
    attack() {
        this.bool = true;
        if (this.type == "troll") trollFixer(true, 150, this, "attack");
        for (let i = 0; this.img_pack.attack[i] != undefined; i++) {
            let func = () => this.element.src = this.img_pack.attack[i];
            delay(i, func, this);
        }
    }
    die() {
        this.bool = true;
        if (this.type == "troll") trollFixer(true, 100, this, "die");
        for (let i = 0; this.img_pack.die[i] != undefined; i++) {
            let func = () => this.element.src = this.img_pack.die[i];
            delay(i, func, this);
        }
    }
    run() {
        this.bool = true;
        for (let i = 0; this.img_pack.run[i] != undefined; i++) {
            let func = () => this.element.src = this.img_pack.run[i];
            delay(i, func, this);
        }
    }
    walk() {
        this.bool = true;
        for (let i = 0; this.img_pack.walk[i] != undefined; i++) {
            let func = () => this.element.src = this.img_pack.walk[i];
            delay(i, func, this);
        }
    }
    hurt() {
        this.bool = true;
        if (this.type == "troll") trollFixer(true, 50, this, "hurt");
        for (let i = 0; this.img_pack.hurt[i] != undefined; i++) {
            let func = () => this.element.src = this.img_pack.hurt[i];
            delay(i, func, this);
        }
    }
};

function delay(i, func, obj) {
    setTimeout(() => {
        func();
        if (obj.img_pack.idle.length - 1 == i) {
            obj.bool = false;
            obj.element.src = obj.img_pack.idle[0];
            if (obj.type == "troll") trollFixer(false, 0, obj, null);
        }
    }, fps * i);
}

function trollFixer(boolean, resize, obj, action) {
    if (boolean == true) {
        obj.setW(resize + global_width);
        obj.setH(resize + global_height);
        obj.setX(obj.x - resize / 2);
        if (action == "attack") obj.setY(obj.y - resize);
        if (action == "die") obj.setY(obj.y - resize / 4);
        if (action == "hurt") obj.setY(obj.y - resize + 40);
        if (action == "idle") obj.setY(obj.y - resize);
    } else {
        obj.setW(global_width);
        obj.setH(global_height);
        obj.setX(-50);
        obj.setY(120);
    }
}