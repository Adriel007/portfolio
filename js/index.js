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