document.body.onload = () => loading(true);

let interval;

function loading(bool) {

    if (bool === true) {
        const emojis = ["🌤", "⛅", "🌥", "🌦", "☁", "🌧", "⛈", "🌩", "🌞", "⚡", "❄", "🌨", "☃", "⛄", "🌬", "🌪", "🌫", "🌈", "☔", "💧", "🌊", "🌂", "☂", "🥵", "🥶", "🧊"]
        const div = document.createElement("div");
        const img = document.createElement("img");
        const h1 = document.createElement("h1");
        const spin = document.createElement("div");
        const spinInset = document.createElement("span");
        const random = Math.floor(Math.random() * emojis.length);

        div.id = "loadingScreen";
        div.style.position = "absolute";
        div.style.width = "100%";
        div.style.height = "100%";
        div.style.margin = "0";
        div.style.backgroundImage = "linear-gradient(navy, black)";
        div.style.padding = "0";
        div.style.display = "flex";
        div.style.flexDirection = "column";
        div.style.alignItems = "center";
        div.style.justifyContent = "center";
        div.style.left = "0";
        div.style.top = "0";
        div.style.transition = "all ease-in-out 1s";

        img.src = "src/img/ello.png";
        img.style.transform = "scale(75%)";
        img.style.backgroundColor = "white";
        img.style.borderRadius = "100%";
        img.style.padding = "5px";

        h1.textContent = "Clima";
        h1.style.color = "white";
        h1.style.fontSize = "4em";
        h1.style.fontFamily = "Helvetica";

        spin.style.width = "100px";
        spin.style.height = "100px";
        spin.style.backgroundImage = "linear-gradient(white, navy)";
        spin.style.padding = "5px";
        spin.style.display = "flex";
        spin.style.alignItems = "center";
        spin.style.justifyContent = "center";
        spin.style.borderRadius = "100%";
        spin.style.width = "100px";
        spin.animate(
            [
                { transform: `rotate(0deg)` },
                { transform: `rotate(360deg)` },
            ],
            { duration: 1000, iterations: Infinity }
        );

        spinInset.style.width = "100%";
        spinInset.style.height = "100%";
        spinInset.style.borderRadius = "100%";
        spinInset.style.backgroundColor = "black";
        spinInset.style.textAlign = "center";
        spinInset.style.fontSize = "4em";
        spinInset.style.color = "white";
        spinInset.textContent = emojis[random];
        spinInset.animate(
            [
                { transform: `rotate(0deg)` },
                { transform: `rotate(-360deg)` },
            ],
            { duration: 1000, iterations: Infinity }
        );
        interval = setInterval(() => {
            const random = Math.floor(Math.random() * emojis.length);
            spinInset.textContent = emojis[random];
        }, 2000);

        spin.appendChild(spinInset);
        div.appendChild(img);
        div.appendChild(h1);
        div.appendChild(spin);
        document.body.appendChild(div);
    } else {
        const div = document.getElementById("loadingScreen");

        clearInterval(interval);
        div.style.opacity = "0";
        setTimeout(() => div.remove(), 1001);
    }
}