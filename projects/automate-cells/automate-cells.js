// Olá, quer ver como funciona esse automato celular? Então me acompanhe

// Tamanho da matriz
const rows = 25;
const cols = 75;

// Criação inicial do contêiner
const container = document.getElementById("container");

// Função para criar uma matriz vazia
function createMatrix(rows, cols) {
    const matrix = [];
    for (let i = 0; i < rows; i++) {
        matrix[i] = [];
        for (let j = 0; j < cols; j++) {
            matrix[i][j] = Math.random() < 0.5 ? 0 : 1; // Define o estado inicial (0 ou 1)
        }
    }
    return matrix;
}

// Função para atualizar a exibição da matriz no contêiner
function updateDisplay(matrix) {
    container.innerHTML = ""; // Limpa o conteúdo do contêiner

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            if (matrix[i][j] === 1) {
                cell.classList.add("alive");
            }
            cell.addEventListener("click", () => {
                spawnCells(matrix, i, j);
                updateDisplay(matrix); // Atualiza a exibição após o clique
            });
            container.appendChild(cell);
        }
    }
}

// Função para atualizar a matriz
function updateMatrix(matrix) {
    const newMatrix = createMatrix(rows, cols);

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const neighbors = countNeighbors(matrix, i, j);
            if (matrix[i][j] === 1) {
                // Se uma célula viva tiver 2 ou 3 vizinhos vivos, ela sobrevive
                if (neighbors === 2 || neighbors === 3) {
                    newMatrix[i][j] = 1;
                } else {
                    newMatrix[i][j] = 0;
                }
            } else {
                // Se uma célula morta tiver exatamente 3 vizinhos vivos, ela nasce
                if (neighbors === 3) {
                    newMatrix[i][j] = 1;
                } else {
                    newMatrix[i][j] = 0;
                }
            }
        }
    }

    return newMatrix;
}

// Função para contar o número de vizinhos vivos de uma célula
function countNeighbors(matrix, x, y) {
    let count = 0;

    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            const neighborX = x + i;
            const neighborY = y + j;

            if (
                neighborX >= 0 &&
                neighborX < rows &&
                neighborY >= 0 &&
                neighborY < cols &&
                !(i === 0 && j === 0)
            ) {
                count += matrix[neighborX][neighborY];
            }
        }
    }

    return count;
}

// Função para fazer surgir 8 células vivas ao redor de uma célula clicada
function spawnCells(matrix, x, y) {
    const neighbors = [
        [-1, -1], [-1, 0], [-1, 1],
        [0, -1], [0, 1],
        [1, -1], [1, 0], [1, 1]
    ];

    for (const [dx, dy] of neighbors) {
        const spawnX = x + dx;
        const spawnY = y + dy;

        if (
            spawnX >= 0 &&
            spawnX < rows &&
            spawnY >= 0 &&
            spawnY < cols
        ) {
            matrix[spawnX][spawnY] = 1;
        }
    }
}

// Função para executar o autômato celular
function runAutomaton() {
    let matrix = createMatrix(rows, cols);

    updateDisplay(matrix);

    setInterval(() => {
        matrix = updateMatrix(matrix);
        updateDisplay(matrix);
    }, 200);
}

// Executa o autômato celular
runAutomaton();

/*

Durante o decorrer do tempo, pode-se observar os seguintes (as vezes raros) padrões:

- Aglomerados fixos de células: São grupos de células que permanecem juntas e estáticas ao longo
das iterações do autômato celular. Eles formam padrões imutáveis.

- Aglomerados dinâmicos de células: São grupos de células que se movem e mudam de forma ao longo
do tempo no autômato celular. Eles podem formar padrões que se expandem, contraem, giram ou mudam
de forma de maneiras complexas.

- Células que se deslocam para outra região: São células individuais ou pequenos grupos de células
que se movem de um local para outro no autômato celular. Elas podem se mover de forma direcionada
ou aleatória, podendo interagir com outros padrões de células.

- Osciladores: São padrões que oscilam entre diferentes formas ou posições ao longo das iterações.

- Naves espaciais: São padrões que se movem de forma periódica através da grade, mantendo sua forma.

- Padrões estáveis: São padrões que permanecem inalterados ao longo das iterações do autômato celular.

- Caos: Algumas configurações iniciais podem levar a comportamentos imprevisíveis e altamente
complexos, onde não é possível identificar padrões claros.

- Extinção: Cenário o-qual todas as células da grade morrem

- Síntese de naves espaciais: Um fenômeno raro em autômatos celulares, no qual um grupo de células fixas
interage de forma específica, gerando padrões móveis chamados de naves espaciais. Essas naves espaciais
são estruturas que se deslocam pela grade do autômato celular, mantendo sua forma e velocidade ao longo
do tempo. Esse processo desafia as regras determinísticas do autômato celular, resultando em
comportamentos dinâmicos e padrões interessantes.

*/