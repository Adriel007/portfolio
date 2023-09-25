function menu(clima) {
    const dom = {
        hora: document.querySelectorAll(".hora")[0],
        local: document.querySelectorAll(".local")[0],
        data: document.querySelectorAll(".data")[0],
        image: document.querySelectorAll(".images .card img"),
        label: document.querySelectorAll(".images .card h2"),
        temperature: document.querySelectorAll(".info h1")[0],
        clima: document.querySelectorAll(".info h2")[0],
        button: document.querySelectorAll("button")[0],
    };
    const formatedHours = () => `${new Date().getHours() < 10 ? "0" + new Date().getHours().toString() : new Date().getHours()}:${new Date().getMinutes() < 10 ? "0" + new Date().getMinutes().toString() : new Date().getMinutes()}`;
    const formatedDate = () => `${new Date().getDate() < 10 ? "0" + new Date().getDate().toString() : new Date().getDate()}/${(new Date().getMonth() + 1) < 10 ? "0" + (new Date().getMonth() + 1).toString() : (new Date().getMonth() + 1)}/${new Date().getFullYear()}`;

    dom.local.textContent = clima.cidade;
    setInterval(() => {
        dom.hora.textContent = formatedHours();
        dom.data.textContent = formatedDate();
    }, 1000)

    let source = [];

    for (let key in protocols)
        source.push("src/img/" + key);

    for (let c = 0; c < 4; c++) {
        dom.label[c].textContent = clima.spreadValue[c];
        dom.label[c].style.color = clima.spreadColor[c];
        dom.image[c].style.borderColor = clima.spreadColor[c];
        dom.image[c].src = "src/img/" + clima.spreadImg[c];

        if (c === 3)
            document.body.style.backgroundImage = 'url("src/img/' + clima.spreadImg[c].split(".png")[0] + '_bg.gif")';

        dom.image[c].onclick = e => {
            let key = e.target.src.split("/").pop();
            let str = "";
            let title;

            key === "highumidade.png" ? title = "umidade alta" : false;
            key === "light.png" ? title = "raios" : false;
            key === "lowumidade.png" ? title = "umidade baixa" : false;
            key === "moistureladenwind.png" ? title = "umidade entre 50% e 60%" : false;
            key === "rainy.png" ? title = "chuvas fortes" : false;
            key === "sun.png" ? title = "sol forte" : false;
            key === "wind.png" ? title = "ventos fortes" : false;
            key === "temperature.png" ? title = "dias agradáveis" : false;
            key === "temperaturehigh.png" ? title = "dias quentes" : false;
            key === "temperaturelow.png" ? title = "dias frios" : false;
            key === "cloud.png" ? title = "dias com nuvens" : false;
            key === "cloudy.png" ? title = "dias nublados" : false;
            key === "snow.png" ? title = "nevascas" : false;
            key === "fog.png" ? title = "nevoeiros" : false;
            key === "sandstorm.png" ? title = "tempestades de areia" : false;

            for (let value of protocols[key])
                str += `• ${value};<br><br>`;

            Swal.fire({
                heightAuto: false,
                title: "Dicas em caso de " + title,
                html: str,
                icon: 'info'
            });
        };

    }

    dom.label[4].style.color = "white";
    dom.label[5].style.color = "white";
    dom.label[4].textContent = "?";
    dom.label[5].textContent = "?";
    dom.image[4].src = "src/img/enchente.png";
    dom.image[5].src = "src/img/landslide.png";
    dom.image[4].onclick = () => {
        Swal.fire({
            heightAuto: false,
            title: "Aviso",
            html: "<small>Para visualizar o risco de enchentes e deslizamentos é necessário responder as perguntas abaixo, elas serão necessárias para calcular o risco de enchente e/ou deslizamento do local</small>",
            icon: 'warning'
        }).then(async res => {
            let input = [
                await question("O local em que você está é em um morro ou próximo?", "Moro longe do morro", "Moro perto do morro", "Moro no morro"),
                await question("O local em que você está possui construções e terreno irregular?", "Não ou poucos", "Alguns", "Muitos"),
                await question("O local em que você está possui escoamento de água?", "Sim", "Mais ou menos", "Não"),
                await question("O local em que você está possui acúmulo de lixo nas ruas?", "Não", "Mais ou menos", "Muito"),
                await question("O local em que você está possui rua asfaltada?", "Totalmente asfaltada", "Parcialmente asfaltada", "Não"),
            ];

            Swal.fire({
                heightAuto: false,
                icon: 'success',
                title: "Obrigado pela resposta!",
                showConfirmButton: false,
                timer: 1500
            });

            let enchente = (input[2] + input[3] + input[4]) * (clima.chuvaNivel * 2);
            let deslizamento = (input[0] + input[1] + input[2]) * (clima.chuvaNivel + clima.ventoNivel);

            if (enchente < 20) {
                dom.image[4].style.borderColor = "limegreen";
                dom.label[4].textContent = "Seguro";
                dom.label[4].style.color = "limegreen";
            }
            else if (enchente >= 20 && enchente < 50) {
                dom.image[4].style.borderColor = "orange";
                dom.label[4].textContent = "Atenção";
                dom.label[4].style.color = "orange";
            }
            else if (enchente >= 50) {
                dom.image[4].style.borderColor = "red";
                dom.label[4].textContent = "Perigo";
                dom.label[4].style.color = "red";
            }
            if (deslizamento < 20) {
                dom.image[5].style.borderColor = "limegreen";
                dom.label[5].textContent = "Seguro";
                dom.label[5].style.color = "limegreen";
            }
            else if (deslizamento >= 20 && deslizamento < 50) {
                dom.image[5].style.borderColor = "orange";
                dom.label[5].textContent = "Atenção";
                dom.label[5].style.color = "orange";
            }
            else if (deslizamento >= 50) {
                dom.image[5].style.borderColor = "red";
                dom.label[5].textContent = "Perigo";
                dom.label[5].style.color = "red";
            }

            dom.image[4].onclick = e => {
                let key = e.target.src.split("/").pop();
                let str = "";
                let title;

                key === "enchente.png" ? title = "enchentes" : false;
                key === "landslide.png" ? title = "deslizamentos" : false;

                for (let value of protocols[key])
                    str += `• ${value};<br><br>`;

                Swal.fire({
                    heightAuto: false,
                    title: "Dicas em caso de " + title,
                    html: str,
                    icon: 'info'
                });
            };
            dom.image[5].onclick = dom.image[4].onclick;
        });
    };
    dom.image[5].onclick = dom.image[4].onclick;

    dom.temperature.textContent = clima.temperatura + " C°";
    dom.temperature.style.color = clima.temperaturaCor;

    dom.clima.textContent = clima.clima;
    dom.clima.style.color = "white";

    dom.button.onclick = () => {
        let body = "";

        body += "Sensação térmica: " + clima.sensacaoTermica + " C°<br><br>";
        body += "Máxima: " + clima.temperaturaMax + " C°<br><br>";
        body += "Mínima: " + clima.temperaturaMin + " C°<br><br>";
        body += "Visibilidade: " + (clima.visibilidade / 100) + "%<br><br>";
        body += "Direção do vento: " + clima.anguloVento + "°<br><br>";
        body += "Rajada de vento: " + (clima.rajadaVento !== undefined ? clima.rajadaVento + " m/s<br><br>" : "Sem dados<br><br>");
        body += "Pressão: " + clima.pressao + " hPa<br><br>";

        Swal.fire({
            heightAuto: false,
            title: "Informações gerais",
            html: body,
            icon: 'info'
        });
    };

}

async function question(title, btn1, btn2, btn3) { // GOOD, NEUTRAL, BAD
    const result = await Swal.fire({
        title: title,
        allowOutsideClick: false,
        allowEscapeKey: false,
        heightAuto: false,
        showCancelButton: true,
        showDenyButton: true,
        confirmButtonText: btn1,
        confirmButtonColor: "limegreen",
        denyButtonText: btn2,
        denyButtonColor: "orange",
        cancelButtonText: btn3,
        cancelButtonColor: "red"
    });

    if (result.isConfirmed)
        return 1;
    else if (result.isDenied)
        return 2;
    else
        return 5;
}