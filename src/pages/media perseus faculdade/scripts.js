const peso = {
    presencial: {
        tic: 0.05,
        atv: 0.3,
        prova: 0.6
    },
    hibrido: {
        forum: 0.1,
        tic: 0.05,
        atv: 0.2,
        prova: 0.6
    }
};

const dom = {
    form: document.querySelector("form"),
    enade: function () {
        return (
            (new Date(new Date().getFullYear() + "/4/25") <= new Date() && new Date(new Date().getFullYear() + "/7/6") >= new Date()) // dia >= 25 e mês >= 4 (abril) && dia <= 6 e mês <= 7 (julho)
            ||
            (new Date(new Date().getFullYear() + "/10/17") <= new Date() && new Date(new Date().getFullYear() + "/12/23") >= new Date()) // dia >= 17 e mês >= 10 (outubro) && dia <= 23 e mês <= 12 (dezembro)
        ) ? " + ENADE" : "";
    },
    create: {
        label: function (FOR, TEXT) {
            const lbl = document.createElement("label");

            lbl.setAttribute("for", FOR);
            lbl.textContent = TEXT;
            dom.form.appendChild(lbl);

            return lbl;
        },
        input: function (ID, PLACEHOLDER, LBLTEXT) {
            const input = document.createElement("input");
            const lbl = dom.create.label(ID, LBLTEXT);

            input.type = "number";
            input.placeholder = PLACEHOLDER;
            input.id = ID;
            dom.form.appendChild(lbl);
            dom.form.appendChild(input);

            return input;
        },
        buttons: function (type) {
            const div = document.createElement("div");
            const limparbtn = document.createElement("input");
            const calc = document.createElement("input");
            const media = dom.create.input("media", "Média", "Média");

            limparbtn.type = "button";
            limparbtn.value = "Limpar";
            limparbtn.id = "limpar";
            calc.type = "button";
            calc.value = "Calcular";
            calc.id = "calcular";
            media.readOnly = "readonly";
            media.id = "media";

            type === "presencial" && (calc.onclick = presencial);
            type === "hibrido" && (calc.onclick = hibrido);
            limparbtn.onclick = limpar;
            div.appendChild(limparbtn);
            div.appendChild(calc);
            dom.form.appendChild(media);
            dom.form.appendChild(div);

            return true;
        }
    },
    destroy: {
        all: function () {
            [].slice.call(dom.form.children).forEach(element => element.remove());
        }
    }
};

const tela = {
    hibrido: function () {
        dom.destroy.all();
        dom.create.input("forum", "Insira a nota do fórum", "Fórum");
        dom.create.input("tic1", "Insira a nota do TIC 1", "TIC 1");
        dom.create.input("tic2", "Insira a nota do TIC 2", "TIC 2");
        dom.create.input("atv", "Insira a nota das atividades" + dom.enade(), "Atividades" + dom.enade());
        dom.create.input("prova", "Insira a nota da prova", "Prova");
        dom.create.buttons("hibrido");
    },
    presencial: function () {
        dom.destroy.all();
        dom.create.input("tic1", "Insira a nota do TIC 1", "TIC 1");
        dom.create.input("tic2", "Insira a nota do TIC 2", "TIC 2");
        dom.create.input("atv", "Insira a nota das atividades" + dom.enade(), "Atividades" + dom.enade());
        dom.create.input("prova", "Insira a nota da prova", "Prova");
        dom.create.buttons("presencial");
    },

};

function presencial() {
    const prova = parseFloat((document.getElementById("prova").value).replace(",", ".")) || 0;
    const atv = parseFloat((document.getElementById("atv").value).replace(",", ".")) || 0;
    const tic1 = parseFloat((document.getElementById("tic1").value).replace(",", ".")) || 0;
    const tic2 = parseFloat((document.getElementById("tic2").value).replace(",", ".")) || 0;
    const media = document.getElementById("media");
    const resultado = ((prova * peso.presencial.prova) + (atv * peso.presencial.atv) + (tic1 * peso.presencial.tic) + (tic2 * peso.presencial.tic)).toFixed(2);

    media.value = resultado;
    cor(resultado, media);
}

function hibrido() {
    const forum = parseFloat((document.getElementById("forum").value).replace(",", ".")) || 0;
    const prova = parseFloat((document.getElementById("prova").value).replace(",", ".")) || 0;
    const atv = parseFloat((document.getElementById("atv").value).replace(",", ".")) || 0;
    const tic1 = parseFloat((document.getElementById("tic1").value).replace(",", ".")) || 0;
    const tic2 = parseFloat((document.getElementById("tic2").value).replace(",", ".")) || 0;
    const media = document.getElementById("media");
    const resultado = ((forum * peso.hibrido.forum) + (prova * peso.hibrido.prova) + (atv * peso.hibrido.atv) + (tic1 * peso.hibrido.tic) + (tic2 * peso.hibrido.tic)).toFixed(2);

    media.value = resultado;
    cor(resultado, media);
}

function cor(resultado, media) {
    if (resultado >= 9) media.style.color = "green";
    else if (resultado >= 6 && resultado < 9) media.style.color = "blue";
    else media.style.color = "red";
}

function limpar() {
    [].slice.call(dom.form.children).forEach(element => element.value = "");
}