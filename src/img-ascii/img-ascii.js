// Olá! Quer aprender esse algoritmo que transforma imagem em arte ASCII? Então me acompanhe.

// Seleciona o elemento do arquivo de imagem e a área de texto
const file = document.querySelector("input");
const textarea = document.querySelector("textarea");
const copied = document.querySelector("span");
const numbers = document.querySelectorAll("input[type='number']");

let cols = 100;
let rows = 100;

// Adiciona um evento de input aos números para chamar a função "main"
numbers.forEach(element => element.addEventListener("input", main));

function main() {
    // Verifica se há um arquivo de imagem selecionado
    if (file.files.length > 0) {
        // Chama a função "imageToAscii" passando a URL do arquivo, as colunas e as linhas
        imageToAscii(URL.createObjectURL(file.files[0]), cols, rows)
            .then(asciiArt => {
                // Atualiza o conteúdo da área de texto com a arte ASCII
                textarea.textContent = asciiArt;
                // Ajusta a altura da área de texto
                textarea.style.height = `${textarea.scrollHeight}px`;
            })
            .catch(
                error =>
                (textarea.textContent =
                    "Ocorreu um erro ao converter a imagem para arte ASCII: " + error)
            );
    }
}

function copy() {
    // Seleciona todo o conteúdo da área de texto
    textarea.select();
    // Copia o conteúdo para a área de transferência
    document.execCommand("copy");
    setTimeout(() => {
        // Exibe uma mensagem de confirmação de que o texto foi copiado
        copied.style.top = "10%";
        setTimeout(() => (copied.style.top = "-100%"), 5000);
    }, 1);
}

// Função para converter uma imagem em arte ASCII
function imageToAscii(url, x, y) {
    return new Promise((resolve, reject) => {
        // Cria um elemento de imagem
        const img = new Image();

        // Define a função a ser executada quando a imagem for carregada
        img.onload = () => {
            const canvas = document.createElement("canvas");
            const context = canvas.getContext("2d");

            // Define a largura e altura do canvas
            canvas.width = x;
            canvas.height = y;

            // Desenha a imagem no canvas
            context.drawImage(img, 0, 0, x, y);

            // Obtém os dados de pixel do canvas
            const imageData = context.getImageData(0, 0, x, y).data;

            // Variável para armazenar a arte ASCII
            let asciiArt = "";

            // Loop pelos pixels da imagem
            for (let i = 0; i < imageData.length; i += 4) {
                // Obtém os valores RGB do pixel
                const r = imageData[i];
                const g = imageData[i + 1];
                const b = imageData[i + 2];

                // Calcula o brilho do pixel
                const brightness = (r + g + b) / 3;

                // Seleciona o caractere apropriado com base no brilho
                const character = brightness < 128 ? "■" : "□";

                // Adiciona o caractere à arte ASCII
                asciiArt += character;

                // Quebra de linha a cada x caracteres
                if ((i + 4) % (x * 4) === 0) {
                    asciiArt += "\n";
                }
            }

            // Resolve a promessa com a arte ASCII
            resolve(asciiArt);
        };

        // Define a função a ser executada se ocorrer um erro ao carregar a imagem
        img.onerror = () => reject(new Error("Erro ao carregar a imagem."));

        // Carrega a imagem
        img.src = url;
    });
}
