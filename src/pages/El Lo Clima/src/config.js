(
    function () {
        const key = "d7c98cf8e5492420c753b3fa61d7c6ca";
        const obj = {
            umidade: null,
            velocidadeVento: null,
            temperatura: null,
            temperaturaCor: null,
            clima: null,
            temperaturaMin: null,
            temperaturaMax: null,
            sensacaoTermica: null,
            pressao: null,
            anguloVento: null,
            rajadaVento: null,
            visibilidade: null,
            cidade: null,
            chuvaNivel: null,
            ventoNivel: null,
            spreadValue: [],
            spreadColor: [],
            spreadImg: [],
        };

        getLocation();

        function getApi(location) {
            fetch(`https://api.openweathermap.org/data/2.5/weather?${location}&units=metric&lang=pt_br&APPID=${key}`)
                .then(data => data.json())
                .then(json => {
                    obj.temperatura = json.main.temp.toFixed(2);
                    obj.umidade = json.main.humidity;
                    obj.temperaturaMin = json.main.temp_min.toFixed(2);
                    obj.temperaturaMax = json.main.temp_max.toFixed(2);
                    obj.sensacaoTermica = json.main.feels_like.toFixed(2);
                    obj.clima = json.weather[0].description.toLowerCase();
                    obj.pressao = json.main.pressure;
                    obj.velocidadeVento = json.wind.speed;
                    obj.anguloVento = json.wind.deg;
                    obj.rajadaVento = json.wind.gust;
                    obj.visibilidade = json.visibility;
                    obj.cidade = json.name;

                    obj.spreadValue.push(obj.umidade + "%");
                    if (obj.umidade > 75) {
                        obj.spreadColor.push("red");
                        obj.spreadImg.push("highumidade.png");
                    }
                    else if (obj.umidade >= 60 && obj.umidade <= 75) {
                        obj.spreadColor.push("orange");
                        obj.spreadImg.push("highumidade.png");
                    }
                    else if (obj.umidade >= 50 && obj.umidade <= 60) {
                        obj.spreadColor.push("limegreen");
                        obj.spreadImg.push("moistureladenwind.png");
                    }
                    else if (obj.umidade >= 30 && obj.umidade <= 50) {
                        obj.spreadColor.push("orange");
                        obj.spreadImg.push("lowumidade.png");
                    }
                    else if (obj.umidade < 30) {
                        obj.spreadColor.push("red");
                        obj.spreadImg.push("lowumidade.png");
                    }

                    obj.spreadValue.push(obj.velocidadeVento + " Km/h");
                    obj.spreadImg.push("wind.png");
                    if (obj.velocidadeVento >= 75) {
                        obj.spreadColor.push("red");
                        obj.ventoNivel = 3;
                    } else if (obj.velocidadeVento < 75 && obj.velocidadeVento >= 50) {
                        obj.spreadColor.push("orange");
                        obj.ventoNivel = 2;
                    }
                    else if (obj.velocidadeVento < 50) {
                        obj.spreadColor.push("limegreen");
                        obj.ventoNivel = 1;
                    }

                    if (obj.temperatura >= 30) {
                        obj.spreadValue.push("Muito calor");
                        obj.spreadColor.push("red");
                        obj.spreadImg.push("temperaturehigh.png");
                        obj.temperaturaCor = "red";
                    }
                    else if (obj.temperatura < 30 && obj.temperatura >= 25) {
                        obj.spreadValue.push("Calor");
                        obj.spreadColor.push("orange");
                        obj.spreadImg.push("temperaturehigh.png");
                        obj.temperaturaCor = "orange";
                    }
                    else if (obj.temperatura < 25 && obj.temperatura >= 20) {
                        obj.spreadValue.push("Fresco");
                        obj.spreadColor.push("limegreen");
                        obj.spreadImg.push("temperature.png");
                        obj.temperaturaCor = "gold";
                    }
                    else if (obj.temperatura < 20 && obj.temperatura >= 15) {
                        obj.spreadValue.push("Frio");
                        obj.spreadColor.push("orange");
                        obj.spreadImg.push("temperaturelow.png");
                        obj.temperaturaCor = "dodgerblue";
                    }
                    else if (obj.temperatura < 15) {
                        obj.spreadValue.push("Muito frio");
                        obj.spreadColor.push("red");
                        obj.spreadImg.push("temperaturelow.png");
                        obj.temperaturaCor = "blue";
                    }

                    if (obj.clima.includes("limpo")) {
                        obj.spreadValue.push("Atenção");
                        obj.spreadColor.push("orange");
                        obj.spreadImg.push("sun.png");
                        obj.chuvaNivel = 1;
                    }
                    else if (obj.clima.includes("nuvens")) {
                        obj.spreadValue.push("Estável");
                        obj.spreadColor.push("limegreen");
                        obj.spreadImg.push("cloud.png");
                        obj.chuvaNivel = 1;
                    }
                    else if (obj.clima == "nublado") {
                        obj.spreadValue.push("Estável");
                        obj.spreadColor.push("limegreen");
                        obj.spreadImg.push("cloudy.png");
                        obj.chuvaNivel = 1;
                    }
                    else if (obj.clima.includes("garoa") || obj.clima.includes("chuvisco")) {
                        obj.spreadValue.push("Estável");
                        obj.spreadColor.push("limegreen");
                        obj.spreadImg.push("rainy.png");
                        obj.chuvaNivel = 1;
                    }
                    else if (obj.clima.includes("chuva") && (obj.clima.includes("leve") || obj.clima.includes("moderada") || obj.clima.includes("banho"))) {
                        obj.spreadValue.push("Atenção");
                        obj.spreadColor.push("orange");
                        obj.spreadImg.push("rainy.png");
                        obj.chuvaNivel = 2;
                    }
                    else if (obj.clima.includes("chuva") && (obj.clima.includes("forte") || obj.clima.includes("extrema") || obj.clima.includes("irregular"))) {
                        obj.spreadValue.push("Perigo");
                        obj.spreadColor.push("red");
                        obj.spreadImg.push("rainy.png");
                        obj.chuvaNivel = 3;
                    }
                    else if (obj.clima.includes("trovoada") || obj.clima.includes("tempestade")) {
                        obj.spreadValue.push("Perigo");
                        obj.spreadColor.push("red");
                        obj.spreadImg.push("light.png");
                        obj.chuvaNivel = 3;
                    }
                    else if (obj.clima.includes("neve") || obj.clima.includes("congelante") || obj.clima.includes("granizo")) {
                        obj.spreadValue.push("Atenção");
                        obj.spreadColor.push("orange");
                        obj.spreadImg.push("snow.png");
                        obj.chuvaNivel = 2;
                    }

                    else if (obj.clima.includes("névoa") || obj.clima.includes("fumaça") || obj.clima.includes("cinzas")) {
                        obj.spreadValue.push("Atenção");
                        obj.spreadColor.push("orange");
                        obj.spreadImg.push("fog.png");
                        obj.chuvaNivel = 1;
                    }

                    else if (obj.clima.includes("areia") || obj.clima.includes("pó") || obj.clima.includes("poeira") || obj.clima.includes("rajada") || obj.clima.includes("tornado") || obj.clima.includes("confusão")) {
                        obj.spreadValue.push("Perigo");
                        obj.spreadColor.push("red");
                        obj.spreadImg.push("sandstorm.png");
                        obj.chuvaNivel = 3;
                    }

                    loading(false);
                    menu(obj);
                })
                .catch(error => {
                    errorAlert("Ops. Nosso site está com sobrecarga de acessos agora, por favor, retorne mais tarde");
                    console.error(error);
                });
        }

        function coords(pos) {
            if (typeof pos === "string")
                getApi(pos);
            else
                getApi(`lat=${pos.coords.latitude}&lon=${pos.coords.longitude}`);
        }

        function getLocation() {
            if (navigator.geolocation)
                navigator.geolocation.getCurrentPosition(coords, showError);
            else
                errorPrompt("Seu navegador não suporta geolocalização, por favor, insira manualmente o nome da sua cidade no campo abaixo:");
        }

        function showError(error) {
            switch (error.code) {
                case error.PERMISSION_DENIED:
                    errorAlert("Para o melhor uso da aplicação, pedimos que aceite a permissão de uso da sua localização.");
                    getLocation();
                    break;
                case error.POSITION_UNAVAILABLE:
                    errorPrompt("Localização não encontrada, por favor, insira manualmente o nome da sua cidade no campo abaixo:");
                    break;
                case error.TIMEOUT:
                    errorPrompt("Tempo de resposta excedente, por favor, insira manualmente o nome da sua cidade no campo abaixo:");
                    break;
                case error.UNKNOWN_ERROR:
                    errorPrompt("Erro desconhecido, por favor, insira manualmente o nome da sua cidade no campo abaixo:");
                    break;
            }
        }

        function errorPrompt(title) {
            Swal.fire({
                heightAuto: false,
                title: title,
                input: 'text',
                showCancelButton: true,
                confirmButtonText: 'Enviar',
                showLoaderOnConfirm: true,
                preConfirm: coords
            });
        }

        function errorAlert(text) {
            Swal.fire({
                heightAuto: false,
                icon: 'error',
                title: 'Atenção',
                text: text,
            })
        }
    }
)();