// Olá! Quer aprender a criar um algoritmo para resolver labirintos como este? Então me acompanhe.

// Definição da matriz do labirinto
const matrix = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
];

// Ponto de partida e ponto de chegada no labirinto
let startPoint = [0, 0];
let endPoint = [3, 3];

// Elemento do contêiner do jogo no HTML
const gameDiv = document.getElementById("game");

// Modo atual de interação (parede, caminho, ponto de partida ou ponto de chegada)
let mode = "";

// Inicia o jogo
start();

// Função chamada quando há alterações nas opções do jogo (adicionar/remover linhas, colunas ou mudar o modo)
function options(type, value, obj) {
    switch (type) {
        case "rows":
            if (value === 1) {
                // Adiciona uma nova linha na matriz
                const cols = [];
                for (let i = 0; i < matrix[0].length; i++)
                    cols.push(0);
                matrix.push(cols);
            } else if (value === -1 && matrix.length > 4) {
                // Remove a última linha da matriz, desde que haja mais de 4 linhas
                if (matrix.length - 1 === endPoint[0])
                    endPoint[0]--;
                if (matrix.length - 1 === startPoint[0])
                    startPoint[0]--;
                matrix.pop();
            }
            break;
        case "cols":
            if (value === 1)
                // Adiciona uma nova coluna em cada linha da matriz
                matrix.forEach((row, index) => matrix[index].push(0));
            else if (value === -1 && matrix[0].length > 4) {
                // Remove a última coluna de cada linha da matriz, desde que haja mais de 4 colunas
                if (matrix[0].length - 1 === endPoint[1])
                    endPoint[1]--;
                if (matrix[0].length - 1 === startPoint[1])
                    startPoint[1]--;
                matrix.forEach((row, index) => matrix[index].pop());
            }
            break;
        case "mode":
            // Atualiza o modo de interação e destaca a opção selecionada
            document.querySelectorAll(".matrixOpt").forEach(element => element.style.border = "initial");
            obj.style.border = "solid 2px lime";
            mode = value;
            break;
    }
    start(); // Reinicia o jogo com as novas configurações
}

// Função de inicialização do jogo
function start() {
    const result = main(matrix, startPoint, endPoint, gameDiv); // Chama a função principal para resolver o labirinto
    if (result === null) {
        gameDiv.style.borderColor = "red"; // Define a borda do contêiner como vermelha se não houver caminho encontrado
        setTimeout(() => gameDiv.style.borderColor = "transparent", 1001); // Remove a borda vermelha após 1 segundo
    }
}

// Função principal que resolve o labirinto
function main(matrix, startPoint, endPoint, container) {
    container.innerHTML = ""; // Limpa o conteúdo atual do contêiner
    const path = solveMaze(matrix, startPoint, endPoint); // Resolve o labirinto
    container.appendChild(visualizeMatrix(matrix, startPoint, endPoint, path)); // Adiciona a visualização do labirinto ao contêiner
    return path; // Retorna o caminho encontrado ou null se não houver caminho
}

// Função que utiliza busca em largura para resolver o labirinto
function solveMaze(matrix, startPoint, endPoint) {
    const queue = [[startPoint, []]]; // Inicializa uma fila com o ponto de partida e um caminho vazio
    const visited = new Set(); // Conjunto para manter registro dos nós visitados
    const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]]; // Direções: cima, baixo, esquerda, direita

    while (queue.length > 0) {
        const [[x, y], path] = queue.shift(); // Remove o próximo elemento da fila e obtém a posição e o caminho

        if (x === endPoint[0] && y === endPoint[1]) {
            // Encontrou o caminho até o ponto final
            return path.concat([[x, y]]); // Retorna o caminho encontrado
        }

        if (!visited.has(`${x},${y}`)) {
            visited.add(`${x},${y}`); // Marca o nó atual como visitado

            for (const [dx, dy] of directions) {
                const newX = x + dx;
                const newY = y + dy;

                if (
                    newX >= 0 &&
                    newX < matrix.length &&
                    newY >= 0 &&
                    newY < matrix[0].length
                ) {
                    const adjacentNode = matrix[newX][newY];

                    if (!visited.has(`${newX},${newY}`) && !adjacentNode) {
                        const newPath = path.concat([[x, y]]); // Adiciona a posição atual ao caminho
                        queue.push([[newX, newY], newPath]); // Adiciona o próximo nó à fila com o novo caminho
                    }
                }
            }
        }
    }

    // Não há caminho até o ponto final
    return null;
}

// Função que cria a visualização do labirinto no HTML
function visualizeMatrix(matrix, startPoint, endPoint, path) {
    const container = document.createElement("div"); // Cria um elemento de contêiner
    container.classList.add("container");

    matrix.forEach((row, rowIndex) => {
        const line = document.createElement("div"); // Cria uma linha
        line.classList.add("line");
        row.forEach((cell, colIndex) => {
            const cellElement = document.createElement("div"); // Cria um elemento de célula
            cellElement.classList.add("cell");
            if (cell)
                cellElement.classList.add("wall"); // Se o valor da célula for verdadeiro, adiciona a classe "wall"
            cellElement.title = `Linha: ${rowIndex + 1}, coluna: ${colIndex + 1}`; // Define o ID da célula com base na posição
            cellElement.onclick = e => {
                const x = parseInt(e.target.title.split(" ")[1]) - 1;
                const y = parseInt(e.target.title.split(" ")[3]) - 1;
                switch (mode) {
                    case "wall":
                        matrix[x][y] = 1; // Define a célula como uma parede
                        break;
                    case "floor":
                        matrix[x][y] = 0; // Define a célula como um caminho
                        break;
                    case "spawn":
                        startPoint[0] = x; // Define o ponto de partida
                        startPoint[1] = y;
                        break;
                    case "final":
                        endPoint[0] = x; // Define o ponto de chegada
                        endPoint[1] = y;
                        break;
                }
                start(); // Reinicia o jogo com as novas configurações
            };
            line.appendChild(cellElement);
        });
        container.appendChild(line);
    });

    container.children[startPoint[0]].children[startPoint[1]].classList.add("player"); // Adiciona a classe "player" à célula de partida
    container.children[endPoint[0]].children[endPoint[1]].classList.add("end"); // Adiciona a classe "end" à célula de destino

    if (path) {
        let counter = 0;
        path.forEach(point => {
            const element = container.children[point[0]].children[point[1]];
            if (!element.classList.contains("player") && !element.classList.contains("end")) {
                setTimeout(() => element.classList.add("path"), 50 * counter); // Adiciona a classe "path" às células no caminho
                counter++;
            }
        });
    }

    return container;
}
