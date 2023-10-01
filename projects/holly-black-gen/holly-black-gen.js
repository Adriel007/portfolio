// Olá, quer ver como funciona esse gerador de texto? Então me acompanhe

class MarkovChain {
    constructor(order) {
        this.order = order;
        this.transitionMatrix = {};
    }

    // Função para treinar o modelo com um dataset
    train(dataset) {
        let aux = [];
        dataset.forEach((phrase) => {
            aux.push(this.clean(phrase));
        });
        dataset = aux;

        let sentences = [];
        dataset.forEach((phrase) => {
            sentences.push(phrase.split(' '));
        });

        // Construção da matriz de transição
        for (let i = 0; i < sentences.length; i++) {
            for (let j = this.order; j < sentences[i].length; j++) {
                let currentState = sentences[i].slice(j - this.order, j).join(' ');
                let nextState = sentences[i][j];

                if (!this.transitionMatrix[currentState]) {
                    this.transitionMatrix[currentState] = {};
                }

                if (!this.transitionMatrix[currentState][nextState]) {
                    this.transitionMatrix[currentState][nextState] = 0;
                }

                this.transitionMatrix[currentState][nextState]++;
            }
        }

        // Normalização das probabilidades na matriz de transição
        for (let currentState in this.transitionMatrix) {
            let row = this.transitionMatrix[currentState];
            let sum = Object.values(row).reduce((acc, count) => acc + count, 0);
            for (let nextState in row) {
                row[nextState] = (row[nextState] + 1) / (sum + Object.keys(row).length);
            }
        }

        let learningRate = 0.01; // Taxa de aprendizado
        let numIterations = 100; // Número de iterações do Gradiente Descendente

        // Treinamento adicional usando Gradiente Descendente
        for (let iteration = 0; iteration < numIterations; iteration++) {
            let gradient = {}; // Gradiente dos pesos

            for (let currentState in this.transitionMatrix) {
                let nextStates = this.transitionMatrix[currentState];
                for (let nextState in nextStates) {
                    let prob = nextStates[nextState];
                    let predictedProb = this.calculateTransitionScore(currentState, nextState);
                    let expectedProb = prob; // Probabilidade esperada

                    // Gradiente Descendente: calcula a derivada do erro em relação ao peso
                    gradient[currentState] = gradient[currentState] || {};
                    gradient[currentState][nextState] = (predictedProb - expectedProb) * predictedProb * (1 - predictedProb);
                }
            }

            // Atualiza os pesos usando o Gradiente Descendente
            for (let currentState in this.transitionMatrix) {
                let nextStates = this.transitionMatrix[currentState];
                for (let nextState in nextStates) {
                    this.transitionMatrix[currentState][nextState] -= learningRate * gradient[currentState][nextState];
                }
            }
        }

        this.wittenBellSmooth(); // Suavização de Witten-Bell
    }

    // Função para gerar um texto com base no modelo treinado
    generateText(length) {
        let currentState = Object.keys(this.transitionMatrix)[Math.floor(Math.random() * Object.keys(this.transitionMatrix).length)];
        let text = '';

        for (let i = 0; i < length; i++) {
            text += currentState + ' ';
            if (this.transitionMatrix.hasOwnProperty(currentState)) {
                let nextStates = this.transitionMatrix[currentState];
                let cumulativeProb = 0;
                let rand = Math.random();
                for (let nextState in nextStates) {
                    let prob = nextStates[nextState];
                    cumulativeProb += prob;
                    if (rand <= cumulativeProb) {
                        currentState = currentState.substr(currentState.indexOf(' ') + 1) + ' ' + nextState;
                        break;
                    }
                }
            }
        }

        return this.finalPolishing(text);
    }

    // Função para polir o texto gerado
    finalPolishing(str) {
        let arr = str.split(' ');
        arr = [...new Set(arr)];
        let result = '';

        arr.forEach((value) => {
            result += value + ' ';
        });

        return this.capitalizeText(result.trim());
    }

    // Função para limpar o texto (remover acentos)
    clean(str) {
        str = str.toLowerCase();
        str = str.replace(/[áàãâä]/g, 'a')
            .replace(/[éèêë]/g, 'e')
            .replace(/[íìîï]/g, 'i')
            .replace(/[óòõôö]/g, 'o')
            .replace(/[úùûü]/g, 'u')
            .replace(/[ñ]/g, 'n');
        return str;
    }

    // Função para calcular a pontuação de transição entre estados
    calculateTransitionScore(currentState, nextState) {
        if (this.transitionMatrix[currentState] && this.transitionMatrix[currentState][nextState]) {
            return this.transitionMatrix[currentState][nextState];
        } else {
            // Retornar uma pontuação baixa caso a transição não exista na matriz de transição
            return 0.01;
        }
    }

    // Função para calcular a pontuação de realismo do texto gerado
    scoreGeneratedText(text) {
        text = this.clean(text);
        let words = text.split(' ');
        let numWords = words.length;
        let numRealisticTransitions = 0;

        for (let i = 0; i < numWords - 1; i++) {
            let currentState = words[i];
            let nextState = words[i + 1];
            let transitionScore = this.calculateTransitionScore(currentState, nextState);

            if (transitionScore > 0) {
                numRealisticTransitions++;
            }
        }

        // Calcula a porcentagem de transições realistas em relação ao total de transições
        let realismScore = (numRealisticTransitions / (numWords - 1)) * 100;

        return Math.round(realismScore * 100) / 100; // Retorna o nível de realismo como uma porcentagem com duas casas decimais
    }

    // Função para capitalizar o texto
    capitalizeText(text) {
        text = text.toLowerCase(); // converter para minúsculas
        let sentences = text.split(/(\.|\?|\!)/); // dividir em frases

        let capitalizedText = '';
        sentences.forEach((sentence) => {
            sentence = sentence.trim();
            if (sentence !== '') {
                sentence = sentence.charAt(0).toUpperCase() + sentence.slice(1); // capitalizar primeira letra da frase
                capitalizedText += sentence + ' ';
            }
        });

        return capitalizedText.trimEnd();
    }

    // Função para suavização de Witten-Bell
    wittenBellSmooth() {
        for (let currentState in this.transitionMatrix) {
            let nextStates = this.transitionMatrix[currentState];
            let totalCounts = Object.values(nextStates).reduce((acc, count) => acc + count, 0);
            let numNextStates = Object.keys(nextStates).length;

            let seen = {};
            for (let nextState in nextStates) {
                seen[nextState] = true;
            }

            let unseenCount = 0;
            for (let i = 0; i < numNextStates; i++) {
                let nextState = 'UNKNOWN_' + i;
                if (!seen[nextState]) {
                    unseenCount++;
                }
            }

            let gamma = unseenCount / (totalCounts + unseenCount);

            let denominator = 0;
            for (let nextState in nextStates) {
                nextStates[nextState] = (nextStates[nextState] + gamma) / (totalCounts + unseenCount);
                denominator += nextStates[nextState];
            }

            for (let nextState in nextStates) {
                nextStates[nextState] /= denominator;
            }
        }
    }

    // Função para guardar o modelo
    saveModel() {
        const serializedModel = JSON.stringify(this);
        // Salvar o serializedModel em um arquivo, enviar para um servidor, ou armazenar onde desejar.
        return serializedModel;
    }

    // Função para carregar o modelo
    static loadModel(model) {
        const markovChain = new MarkovChain(model.order);
        markovChain.transitionMatrix = model.transitionMatrix;
        return markovChain;
    }
}

// Não farei o treinamento deste algoritimo pois já tenho um modelo pré-treinado

const model = {
    "2": null,
    "4": null
};
let blink;

// Carregar modelos pré-treinados
fetch("./2.json").then(res => res.json()).then(json => model["2"] = MarkovChain.loadModel(json));
fetch("./4.json").then(res => res.json()).then(json => model["4"] = MarkovChain.loadModel(json));

async function markov() {
    const button = document.querySelector("button");
    const level = document.getElementById("high").checked ? "4" : "2";
    const output = document.getElementById("output");

    // Assim seria um treinamento:
    /*
    const mkc = new MarkovChain(level);
    mkc.train(dataset); // esse dataset é um array em outro arquivo js
    */

    button.disabled = true;
    button.title = "Aguarde o término do texto para gerar outro";
    output.textContent = "";
    if (blink)
        FardoTools.removeTypingEffect(blink);
    blink = await FardoTools.typingEffect(output, "> ", model[level].generateText(1e5), "_", 10, true, 500);
    button.disabled = false;
    button.title = "";
    return true;
}