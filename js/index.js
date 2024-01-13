const url = "./certificates.json";

fetch(url)
    .then(response => response.json())
    .then(data => {
        const container = document.getElementById("certificates");

        for (const key in data) {
            const certificates = data[key];
            const div = document.createElement("div");
            const img = document.createElement("img");
            const ul = document.createElement("ul");

            for (const certificate of certificates) {
                const li = document.createElement("li");
                const a = document.createElement("a");

                a.href = "certificates/" + key + "/" + certificate;
                a.target = "_blank";
                a.textContent = certificate;


                li.appendChild(a);
                ul.appendChild(li);
            }

            img.src = `./images/certificates/${key}.png`;
            img.height = "100";
            img.onclick = () => {
                swal.fire({
                    title: "Certificados de " + key,
                    html: ul,
                    showConfirmButton: false,
                });
            };

            div.appendChild(img);
            container.appendChild(div);
        }
    })
    .catch(error => console.error("Erro ao obter dados:", error));