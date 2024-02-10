const url = "./certificates.json";

fetch(url)
    .then(response => response.json())
    .then(data => {
        const container = document.getElementById("certificates");
        let count = 0;

        for (const key in data) {
            const certificates = data[key];
            const card = document.createElement('div');
            card.style = `
            background-color: var(--primary-color);
            box-shadow: inset 0 0 1000px rgba(0, 0, 0, .3);
            margin: 1em;
            display: flex;
            flex-direction: column;
            text-align: center;
            padding: 10px;
            border-radius: 10px;
            width: 168px;
            height: 168px;
            `;

            const img = document.createElement('img');
            card.appendChild(img);

            const body = document.createElement('div');
            card.appendChild(body);

            const title = document.createElement('h5');
            title.textContent = key;
            body.appendChild(title);

            const ul = document.createElement("ul");

            img.src = `./images/certificates/${key}.png`;
            img.height = "125";
            card.onclick = () => {
                swal.fire({
                    title: "Certificates of " + key,
                    html: ul,
                    showConfirmButton: false,
                });
            };

            for (const certificate of certificates) {
                const li = document.createElement("li");
                const a = document.createElement("a");

                a.href = "certificates/" + key + "/" + certificate;
                a.target = "_blank";
                a.textContent = certificate;


                li.appendChild(a);
                ul.appendChild(li);
            }

            count += certificates.length;

            container.appendChild(card);
        }

        const card = document.createElement('div');
        card.style = `
            font-family: arial;
            background-color: var(--primary-color);
            box-shadow: inset 0 0 1000px rgba(0, 0, 0, .3);
            margin: 1em;
            display: flex;
            flex-direction: column;
            text-align: center;
            padding: 10px;
            border-radius: 10px;
            width: 168px;
            height: 168px;
            `;

        const title = document.createElement('h2');
        title.classList.add('card-title');
        title.textContent = count;

        const desc = document.createElement('h4');
        desc.textContent = "Certificates";
        desc.style = "color: white;";

        card.appendChild(title);
        card.appendChild(desc);

        container.appendChild(card);
    })
    .catch(error => console.error("Error:", error));

const flag = window.location.href.split("/").pop();
const btnClass = {
    default: "btn prices_control _text-primary _transition",
    active: "btn prices_control _bg-primary _text-white _transition"
};

[...document.getElementsByClassName("prices_control")].forEach(element => {
    element.addEventListener("click", () => {
        [...document.getElementsByClassName("prices_control")].forEach(element => {
            element.className = btnClass.default;
            element.className = btnClass.default;
        });
        element.className = btnClass.default;
        element.className = btnClass.active;
        cotation().then(cotation => update(cotation));
        element.blur();
    });
});

if (flag.includes("index")) {
    document.getElementById("prices_control_real").click();
} else if (flag.includes("russian")) {
    document.getElementById("prices_control_ruble").click();
} else {
    document.getElementById("prices_control_dollar").click();
}

function update(cambio) {
    [...document.getElementsByClassName("price_service")].forEach(element => {
        const symbol = document.getElementsByClassName(btnClass.active)[0].textContent;
        element.textContent = `${symbol} ${(element.getAttribute("price") / cambio).toFixed(2)}`;
    });
}

async function cotation() {
    const symbol = document.getElementsByClassName(btnClass.active)[0].textContent;
    let q = "";

    if (symbol === "$")
        q = "USD-BRL";
    else if (symbol === "₽")
        q = "RUB-BRL";
    else if (symbol === "€")
        q = "EUR-BRL";
    else
        return new Promise((resolve, reject) => resolve(1.0));

    return fetch("https://economia.awesomeapi.com.br/json/last/" + q)
        .then(response => response.json())
        .then(data => parseFloat(data[Object.keys(data)[0]].ask))
        .catch(error => console.error("Error:", error));
}

setInterval(() => {
    document.getElementById("prices").style.height = "auto";
}, 100);