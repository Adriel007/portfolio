const fps = 60;
const global_width = 380;
const global_height = 300;

const elements = [
    document.getElementsByClassName("resposta")[0],
    document.getElementsByClassName("resposta")[1],
    document.getElementsByClassName("resposta")[2]
];

const final = {
    win: "Voce respondeu corretamente todas as perguntas e venceu os seus adversarios. Porem sua jornada nao acaba aqui, continue buscando conhecimento.",
    lose: "Voce foi derrotado, porem sua jornada continua, aprimore seus conhecimentos e volte ao ponto em que errou."
};

const body = document.body;
const pergunta = document.getElementById("pergunta");
const particles = document.getElementById("particles");
const player_life_bar = document.getElementById("player_life_bar");
const enemy_life_bar = document.getElementById("enemy_life_bar");
const timer_img = document.getElementById("timer");

var questions = {
    very_easy_math: [
        "2 + 4 = ?",
        "5 + 5 = ?",
        "1 - 1 = ?",
        "3 - 2 = ?",
        "5 x 1 = ?",
        "1 x 5 = ?",
        "1 ÷ 1 = ?",
        "10 ÷ 2 = ?"
    ],
    very_easy_port: [
        "Quantas sílabas a palavra 'SOL' possui",
        "Quantas sílabas a palavra 'JOGO' possui",
        "Quantas sílabas a palavra 'CAMINHÃO' possui",
        "Quantas letras tem a palavra 'FORTEC'",
        "Quantas letras tem a palavra 'PARALELEPÍPEDO'",
        "Quantas letras tem a palavra 'PAPEL'",
        "Selecione a opção que seja uma vogal",
        "Selecione a opção que seja uma consoante"
    ],
    easy_math: [
        "5.30 + 1.70 = ?",
        "500.10 + 2500.25 = ?",
        "10.4 - 10 = ?",
        "3.5 - 5 = ?",
        "5 x (-1) = ?",
        "100 x 0 = ?",
        "1 ÷ 0 = ?",
        "5 ÷ 2 = ?"
    ],
    easy_port: [
        "Selecione o verbo que está no infitivo",
        "Selecione o adjetivo pátrio",
        "Selecione o substântivo concreto",
        "Selecione o adjetivo",
        "Selecione a frase que possua artigo",
        "Selecione o pronome",
        "Selecione o substantivo abstrato",
        "Selecione o nome próprio"
    ],
    medium_math: [
        "3³ = ?",
        "(1 + 2 x 2) x [5 - 5] x (4 ÷ 2) = ?",
        "5x10³ - 1x10² = ?",
        "1x10³ + 2x10² = ?",
        "50% de 200 = ?",
        "1% de 10 = ?",
        "|-40| = ?",
        "√25 = ?"
    ],
    medium_port: [
        "O que um verbo pode indicar?",
        "Selecione a onomatopéia",
        "Sujeito é aquele que:",
        "A norma culta é usada em:",
        "O que são gírias?",
        "Aimpim, macaxeira e mandioca são exemplos de:",
        "Chamar a palha de aço de bombril é um exemplo de:",
        "O que é um predicado?"
    ],
    hard_math: [
        "SEN(30°) = ?",
        "COS(30°) = ?",
        "TG(30°) = ?",
        "SEN(45°) = ?",
        "COS(45°) = ?",
        "TG(45°) = ?",
        "SEN(60°) = ?",
        "COS(60°) = ?"
    ],
    hard_port: [
        "Qual é a diferença entre giria e variação linguística?",
        "Chip, backup e download são exemplos de:",
        "Abajur, pizza e matinê são exemplos de:",
        "'Eu aqueci minha comida no _________'",
        "'Eles ______ bastante'",
        "OBG, VLW, FLW são linguagens do:",
        "Mengo e comuna são exemplos de:",
        "'O belo é muito discutível' é um exemplo de:"
    ],
    very_hard_math: [
        "log(1) = ?",
        "log(10) = ?",
        "log(100) = ?",
        "Distância da reta > Raio da circunferência:",
        "Distância da reta < Raio da circunferência:",
        "Distância da reta = Raio da circunferência:",
        "1 = -1 + x",
        "1/2 + 3/2 = ?"
    ],
    very_hard_port: [
        "Qual é o plural de 'ar-condicionado'?",
        "Qual é o plural de 'cidadão'?",
        "'Vara' é coletivo de:",
        "'Nuvem' é coletivo de:",
        "A estrutura básica de qualquer redação é composta por:",
        "Qual a diferença entre 'porque', 'porquê', 'por que' e 'por quê'?",
        "Qual a diferença entre 'o que' e 'o quê'?",
        "Qual a diferença entre 'onde', 'aonde', e 'donde'?"
    ],
    impossible: [
        "π = ?",
        "√2 = ?",
        "√3 = ?",
        "2⁻² = ?",
        "Qual é o tipe de ligação presente na molécula da água?",
        "O que é água destilada?",
        "Quais são os dois tipos de propiedade da matéria?",
        "O que são 'propiedades organolépticas'?",
        "O que é ductilidade?",
        "Uma mistura de água, óleo, sal e areia contem:",
        "Reagindo um ácido e um base produz:",
        "Qual é a distribuição eletrônica do carbono?",
        "Os neurônios são compostos de:",
        "Para Kant, o que é o 'Imperativo Categórico'?",
        "5 qubits representam quantos bits?",
        "Quem criou a teoria classica da administração?",
        "Taxidermia está relacionada a _______",
        "Qual o número atômico do carbono?",
        "Onde encontramos os ésteres?",
        "'Bathroom' é banheiro no:"
    ],
    length: 8,
    impossible_length: 20
};

const answer = {
    very_easy_math: [
        "6",
        "10",
        "0",
        "1",
        "5",
        "5",
        "1",
        "5"
    ],
    very_easy_port: [
        "Uma",
        "Duas",
        "Três",
        "Seis",
        "Quatorze",
        "Cinco",
        "E",
        "Y"
    ],
    easy_math: [
        "7",
        "3000.35",
        "0.4",
        "-1.5",
        "-5",
        "0",
        "Não existe",
        "2.5"
    ],
    easy_port: [
        "Gostar",
        "Italiano",
        "Cidade",
        "Amável",
        "As vezes eu cochilo",
        "Vos",
        "amor",
        "Edu"
    ],
    medium_math: [
        "27",
        "0",
        "4.9 x 10³",
        "1.2 x 10³",
        "100",
        "0.1",
        "40",
        "5"
    ],
    medium_port: [
        "Ação, estado ou fenômeno natural",
        "VRUM VRUM",
        "Pratica ou sofre a ação expressa pelo verbo",
        "Documentos oficiais, artigos científicos, trabalhos acadêmicos, documento jurídicos",
        "Forma de fala informal utilizado em um contexto informal",
        "Variação linguística",
        "Metonímia",
        "O que se afirma ou se nega a respeito do sujeito da oração",
    ],
    hard_math: [
        "1/2",
        "√3/2",
        "√3/3",
        "√2/2",
        "√2/2",
        "1",
        "√3/2",
        "1/2"
    ],
    hard_port: [
        "Variação linguística é o modo pelo qual uma região fala seu idioma nacional. Já as gírias, são palavras e expressões informais",
        "Anglicismos",
        "Estrangeirismo",
        "Micro-ondas",
        "Leem",
        "Internetês",
        "Derivação regressiva",
        "Derivação imprópia"
    ],
    very_hard_math: [
        "0",
        "1",
        "2",
        "Exterior",
        "Secante",
        "Tangente",
        "2",
        "2"
    ],
    very_hard_port: [
        "Ares-condicionados",
        "Cidadãos",
        "Porcos",
        "Gafanhotos, marimbondos",
        "Introdução, desenvolvimento e conclusão",
        "Resposta, razão,  pegunta, final de pergunta",
        "Usado em meio ou começo da frase, final da frase",
        "Advérbio de lugar, verbo que indica movimento, contração de DE + ONDE"
    ],
    impossible: [
        "3.1415...",
        "1.41...",
        "1.73...",
        "0.25",
        "Covalente",
        "É a água sem sais minerais dissolvidos",
        "Gerais e específicas",
        "Envolvem os sentidos, como olfato, paladar, etc...",
        "Propiedade que permite transformar materiais em fios",
        "4 componentes e 3 fases",
        "Sal e água",
        "1s2;2s2;2p2",
        "Corpo celular, dendritos e axônios",
        "É a ideia central para que se possa analisar o que motiva a ação humana",
        "32",
        "Henri Fayol",
        "Animais",
        "6",
        "Em aromas e sabores de frutas",
        "Inglês britânico"
    ]
};
const wrong_1 = {
    very_easy_math: [
        "5",
        "9",
        "2",
        "5",
        "4",
        "4",
        "2",
        "12"
    ],
    very_easy_port: [
        "Dois",
        "Quatro",
        "Dois",
        "Sete",
        "Quinze",
        "Seis",
        "Y",
        "A"
    ],
    easy_math: [
        "6.1",
        "3000.25",
        "-0.4",
        "1.5",
        "4",
        "100",
        "0",
        "10"
    ],
    easy_port: [
        "Amarei",
        "Brasil",
        "Amor",
        "Ouvir",
        "Tomarei providências",
        "Eduardo",
        "Pintura",
        "Ele"
    ],
    medium_math: [
        "9",
        "12",
        "4.9 x 10⁹",
        "1.2 x 10⁹",
        "150",
        "1",
        "√40",
        "12.5"
    ],
    medium_port: [
        "Somente ação e estado",
        "Três pratos de trigo para três tigres tristes",
        "Pratica o verbo somente",
        "Quaisquer situações, inclusive entre amigos e familia",
        "São variações linguísticas regionais ou históricas",
        "Gírias",
        "Variação linguística",
        "Característica do verbo"
    ],
    hard_math: [
        "√3/2",
        "1/2",
        "√2/2",
        "1",
        "√3/2",
        "1/2",
        "√2/2",
        "√3/3"
    ],
    hard_port: [
        "A lingua portuguesa adota gírias e variações linguísticas como sinônimos",
        "Estrangeirismo",
        "Anglicismos",
        "Microondas",
        "Lêm",
        "Gírias",
        "Gírias",
        "Adjetivo"
    ],
    very_hard_math: [
        "1",
        "5",
        "10",
        "Cossecante",
        "Interior",
        "Cotangente",
        "1",
        "1.25"
    ],
    very_hard_port: [
        "Ar-condicionados",
        "Cidadenses",
        "Gravetos, galhos",
        "Chuvas, temporais, tempestades",
        "Introdução, desenvolvimento, bibliografia",
        "Resposta, resposta,  pegunta, pergunta",
        "Não refere-se ao sujeito, refere-se ao sujeito",
        "Advérbio de lugar, verbo que indica movimento, 'donde' não existe na língua portuguesa"
    ],
    impossible: [
        "3.1414...",
        "1.42...",
        "1.72...",
        "-2",
        "Iônica",
        "Água fervida e em seguida esfriada",
        "Materia e energia",
        "Se diz respeito a todas as características físicas de uma planta",
        "Sinônimo de utilidade",
        "3 componentes e 4 fases",
        "Óleo inorgânico",
        "1s1;2s2;2p2",
        "Nervos e tecidos muscular",
        "O estudo sobre a ansiedade, hiperatividade e depressão recorrente em grande parte da população juvenil atual.",
        "16",
        "Henry Ford",
        "São regras de conduta para motoristas de carros públicos, como táxis e ubers",
        "1 x 10³",
        "Na estratosfera, normalmente em ligações iônicas com o nitrogênio",
        "Inglês americano"
    ]
};
const wrong_2 = {
    very_easy_math: [
        "3",
        "8",
        "1",
        "2",
        "6",
        "6",
        "0",
        "8"
    ],
    very_easy_port: [
        "Três",
        "Uma",
        "Quatro",
        "Cinco",
        "Dezesseis",
        "Sete",
        "B",
        "U"
    ],
    easy_math: [
        "6.73",
        "2000.35",
        "0.4",
        "2.5",
        "-1",
        "1000",
        "1",
        "7"
    ],
    easy_port: [
        "Permanente",
        "Patriarca",
        "Felicidade",
        "Objetivo",
        "Artigos fazem referência jurídicas apenas",
        "O, a, os, as, etc...",
        "Cinema",
        "Você"
    ],
    medium_math: [
        "6",
        "-12",
        "4.9 x 10⁶",
        "1.2 x 10⁶",
        "250",
        "0.001",
        "-40",
        "50"
    ],
    medium_port: [
        "Ação, estado e fenômenos artificiais",
        "Latir",
        "Desenvolve e caracteriza uma oração subordinada",
        "Situações de encenação a atuação, como cinema e teatrp",
        "São abreviações de palavras, muito empregadas na internet",
        "Erro de português",
        "Gíria",
        "Características de um substântivo"
    ],
    hard_math: [
        "√2/2",
        "1",
        "√3/2",
        "1/2",
        "√3/3",
        "√3/3",
        "√3/3",
        "√2/2"
    ],
    hard_port: [
        "Ambas são sinônimos, porém, gírias são comumentes escritas na internet, utilizando abreviações como 'VLW' e 'OBGD'",
        "Gírias",
        "Nenhuma das alternativas",
        "Micro ondas",
        "lêem",
        "Estrangeirismo",
        "Abreviação",
        "Oração subordinada"
    ],
    very_hard_math: [
        "0.1",
        "0.01",
        "0.001",
        "Tangente",
        "Cossecante",
        "Pertencente",
        "-2",
        "-1.25"
    ],
    very_hard_port: [
        "Não possui plural, sendo subentendido numa frase",
        "Não possui plural, sendo subentendido numa frase",
        "Bambu",
        "Fumaça, vapor e gases",
        "Desenvolvimento, conclusão",
        "Pegunta, final de pergunta, resposta, razão",
        "Escrita correta na língua portuguesa brasileira, escrita correta na língua portuguesa de Portugal",
        "Verbo que indica movimento, advérbio de lugar, 'donde' não existe na língua portuguesa"
    ],
    impossible: [
        "3.1514...",
        "1.73...",
        "1.41...",
        "2",
        "Coordenada",
        "Água em estado gelationoso",
        "Física e química",
        "São as reações químicas que definem para uma célula tronco o que ela vira a ser quando em contato com oo meio",
        "Capacidade de um material em ser perfurado no meio sem comprometer a estrutura exterior, formando dutos e tunels",
        "4 componentes e 4 fases",
        "Substância tóxica",
        "1s1;2s1;2p2",
        "Tecido muscular, dendritos e nervos",
        "O estudo do funcionamento do cérebro humano em detectar padrões e categorizar tudo o que é informado ao mesmo.",
        "Não existe meio de comparação entre qubits e bits",
        "Frederick Winslow Taylor",
        "Colecionadores de carros táxi antigos",
        "6 x 10³",
        "Em gases inflamáveis como metano",
        "Todas as variações do inglês"
    ]
};

const hourglass_dir = "assets/scene/hourglass/";

const hourglass = [
    hourglass_dir + "hourglass_000.png",
    hourglass_dir + "hourglass_001.png",
    hourglass_dir + "hourglass_002.png",
    hourglass_dir + "hourglass_003.png",
    hourglass_dir + "hourglass_004.png",
    hourglass_dir + "hourglass_005.png",
    hourglass_dir + "hourglass_006.png",
    hourglass_dir + "hourglass_007.png",
    hourglass_dir + "hourglass_008.png",
    hourglass_dir + "hourglass_009.png",
    hourglass_dir + "hourglass_010.png",
    hourglass_dir + "hourglass_011.png",
    hourglass_dir + "hourglass_012.png",
    hourglass_dir + "hourglass_013.png"
];

const player_dir = "assets/models/1_KNIGHT/";
const enemy_1_dir = "assets/models/2_KNIGHT/";
const enemy_2_dir = "assets/models/3_KNIGHT/";
const enemy_3_dir = "assets/models/1_TROLL/";
const enemy_4_dir = "assets/models/2_TROLL/";
const enemy_5_dir = "assets/models/3_TROLL/";
const boss_dir = "assets/models/ceifador/";
///////////////////////////////////////////////////////////////////
const player_img_pack = {
    idle: [
        player_dir + "Knight_01__IDLE_000.png",
        player_dir + "Knight_01__IDLE_001.png",
        player_dir + "Knight_01__IDLE_002.png",
        player_dir + "Knight_01__IDLE_003.png",
        player_dir + "Knight_01__IDLE_004.png",
        player_dir + "Knight_01__IDLE_005.png",
        player_dir + "Knight_01__IDLE_006.png",
        player_dir + "Knight_01__IDLE_007.png",
        player_dir + "Knight_01__IDLE_008.png",
        player_dir + "Knight_01__IDLE_009.png",
        player_dir + "Knight_01__IDLE_008.png",
        player_dir + "Knight_01__IDLE_007.png",
        player_dir + "Knight_01__IDLE_006.png",
        player_dir + "Knight_01__IDLE_005.png",
        player_dir + "Knight_01__IDLE_004.png",
        player_dir + "Knight_01__IDLE_003.png",
        player_dir + "Knight_01__IDLE_002.png",
        player_dir + "Knight_01__IDLE_001.png",
        player_dir + "Knight_01__IDLE_000.png"
    ],
    attack: [
        player_dir + "Knight_01__ATTACK_000.png",
        player_dir + "Knight_01__ATTACK_001.png",
        player_dir + "Knight_01__ATTACK_002.png",
        player_dir + "Knight_01__ATTACK_003.png",
        player_dir + "Knight_01__ATTACK_004.png",
        player_dir + "Knight_01__ATTACK_005.png",
        player_dir + "Knight_01__ATTACK_006.png",
        player_dir + "Knight_01__ATTACK_007.png",
        player_dir + "Knight_01__ATTACK_008.png",
        player_dir + "Knight_01__ATTACK_009.png",
        player_dir + "Knight_01__ATTACK_008.png",
        player_dir + "Knight_01__ATTACK_007.png",
        player_dir + "Knight_01__ATTACK_006.png",
        player_dir + "Knight_01__ATTACK_005.png",
        player_dir + "Knight_01__ATTACK_004.png",
        player_dir + "Knight_01__ATTACK_003.png",
        player_dir + "Knight_01__ATTACK_002.png",
        player_dir + "Knight_01__ATTACK_001.png",
        player_dir + "Knight_01__ATTACK_000.png"
    ],
    die: [
        player_dir + "Knight_01__DIE_000.png",
        player_dir + "Knight_01__DIE_001.png",
        player_dir + "Knight_01__DIE_002.png",
        player_dir + "Knight_01__DIE_003.png",
        player_dir + "Knight_01__DIE_004.png",
        player_dir + "Knight_01__DIE_005.png",
        player_dir + "Knight_01__DIE_006.png",
        player_dir + "Knight_01__DIE_007.png",
        player_dir + "Knight_01__DIE_008.png",
        player_dir + "Knight_01__DIE_009.png"
    ],
    hurt: [
        player_dir + "Knight_01__HURT_000.png",
        player_dir + "Knight_01__HURT_001.png",
        player_dir + "Knight_01__HURT_002.png",
        player_dir + "Knight_01__HURT_003.png",
        player_dir + "Knight_01__HURT_004.png",
        player_dir + "Knight_01__HURT_005.png",
        player_dir + "Knight_01__HURT_006.png",
        player_dir + "Knight_01__HURT_007.png",
        player_dir + "Knight_01__HURT_008.png",
        player_dir + "Knight_01__HURT_009.png"
    ],
    run: [
        player_dir + "Knight_01__RUN_000.png",
        player_dir + "Knight_01__RUN_001.png",
        player_dir + "Knight_01__RUN_002.png",
        player_dir + "Knight_01__RUN_003.png",
        player_dir + "Knight_01__RUN_004.png",
        player_dir + "Knight_01__RUN_005.png",
        player_dir + "Knight_01__RUN_006.png",
        player_dir + "Knight_01__RUN_007.png",
        player_dir + "Knight_01__RUN_008.png",
        player_dir + "Knight_01__RUN_009.png",
        player_dir + "Knight_01__RUN_008.png",
        player_dir + "Knight_01__RUN_007.png",
        player_dir + "Knight_01__RUN_006.png",
        player_dir + "Knight_01__RUN_005.png",
        player_dir + "Knight_01__RUN_004.png",
        player_dir + "Knight_01__RUN_003.png",
        player_dir + "Knight_01__RUN_002.png",
        player_dir + "Knight_01__RUN_001.png",
        player_dir + "Knight_01__RUN_000.png"
    ],
    walk: [
        player_dir + "Knight_01__WALK_000.png",
        player_dir + "Knight_01__WALK_001.png",
        player_dir + "Knight_01__WALK_002.png",
        player_dir + "Knight_01__WALK_003.png",
        player_dir + "Knight_01__WALK_004.png",
        player_dir + "Knight_01__WALK_005.png",
        player_dir + "Knight_01__WALK_006.png",
        player_dir + "Knight_01__WALK_007.png",
        player_dir + "Knight_01__WALK_008.png",
        player_dir + "Knight_01__WALK_009.png",
        player_dir + "Knight_01__WALK_008.png",
        player_dir + "Knight_01__WALK_007.png",
        player_dir + "Knight_01__WALK_006.png",
        player_dir + "Knight_01__WALK_005.png",
        player_dir + "Knight_01__WALK_004.png",
        player_dir + "Knight_01__WALK_003.png",
        player_dir + "Knight_01__WALK_002.png",
        player_dir + "Knight_01__WALK_001.png",
        player_dir + "Knight_01__WALK_000.png"
    ]
};
///////////////////////////////////////////////////////////////////
const enemy_1_img_pack = {
    idle: [
        enemy_1_dir + "Knight_02__IDLE_000.png",
        enemy_1_dir + "Knight_02__IDLE_001.png",
        enemy_1_dir + "Knight_02__IDLE_002.png",
        enemy_1_dir + "Knight_02__IDLE_003.png",
        enemy_1_dir + "Knight_02__IDLE_004.png",
        enemy_1_dir + "Knight_02__IDLE_005.png",
        enemy_1_dir + "Knight_02__IDLE_006.png",
        enemy_1_dir + "Knight_02__IDLE_007.png",
        enemy_1_dir + "Knight_02__IDLE_008.png",
        enemy_1_dir + "Knight_02__IDLE_009.png",
        enemy_1_dir + "Knight_02__IDLE_008.png",
        enemy_1_dir + "Knight_02__IDLE_007.png",
        enemy_1_dir + "Knight_02__IDLE_006.png",
        enemy_1_dir + "Knight_02__IDLE_005.png",
        enemy_1_dir + "Knight_02__IDLE_004.png",
        enemy_1_dir + "Knight_02__IDLE_003.png",
        enemy_1_dir + "Knight_02__IDLE_002.png",
        enemy_1_dir + "Knight_02__IDLE_001.png",
        enemy_1_dir + "Knight_02__IDLE_000.png"
    ],
    attack: [
        enemy_1_dir + "Knight_02__ATTACK_000.png",
        enemy_1_dir + "Knight_02__ATTACK_001.png",
        enemy_1_dir + "Knight_02__ATTACK_002.png",
        enemy_1_dir + "Knight_02__ATTACK_003.png",
        enemy_1_dir + "Knight_02__ATTACK_004.png",
        enemy_1_dir + "Knight_02__ATTACK_005.png",
        enemy_1_dir + "Knight_02__ATTACK_006.png",
        enemy_1_dir + "Knight_02__ATTACK_007.png",
        enemy_1_dir + "Knight_02__ATTACK_008.png",
        enemy_1_dir + "Knight_02__ATTACK_009.png",
        enemy_1_dir + "Knight_02__ATTACK_008.png",
        enemy_1_dir + "Knight_02__ATTACK_007.png",
        enemy_1_dir + "Knight_02__ATTACK_006.png",
        enemy_1_dir + "Knight_02__ATTACK_005.png",
        enemy_1_dir + "Knight_02__ATTACK_004.png",
        enemy_1_dir + "Knight_02__ATTACK_003.png",
        enemy_1_dir + "Knight_02__ATTACK_002.png",
        enemy_1_dir + "Knight_02__ATTACK_001.png",
        enemy_1_dir + "Knight_02__ATTACK_000.png"
    ],
    die: [
        enemy_1_dir + "Knight_02__DIE_000.png",
        enemy_1_dir + "Knight_02__DIE_001.png",
        enemy_1_dir + "Knight_02__DIE_002.png",
        enemy_1_dir + "Knight_02__DIE_003.png",
        enemy_1_dir + "Knight_02__DIE_004.png",
        enemy_1_dir + "Knight_02__DIE_005.png",
        enemy_1_dir + "Knight_02__DIE_006.png",
        enemy_1_dir + "Knight_02__DIE_007.png",
        enemy_1_dir + "Knight_02__DIE_008.png",
        enemy_1_dir + "Knight_02__DIE_009.png"
    ],
    hurt: [
        enemy_1_dir + "Knight_02__HURT_000.png",
        enemy_1_dir + "Knight_02__HURT_001.png",
        enemy_1_dir + "Knight_02__HURT_002.png",
        enemy_1_dir + "Knight_02__HURT_003.png",
        enemy_1_dir + "Knight_02__HURT_004.png",
        enemy_1_dir + "Knight_02__HURT_005.png",
        enemy_1_dir + "Knight_02__HURT_006.png",
        enemy_1_dir + "Knight_02__HURT_007.png",
        enemy_1_dir + "Knight_02__HURT_008.png",
        enemy_1_dir + "Knight_02__HURT_009.png",
        enemy_1_dir + "Knight_02__HURT_008.png",
        enemy_1_dir + "Knight_02__HURT_007.png",
        enemy_1_dir + "Knight_02__HURT_006.png",
        enemy_1_dir + "Knight_02__HURT_005.png",
        enemy_1_dir + "Knight_02__HURT_004.png",
        enemy_1_dir + "Knight_02__HURT_003.png",
        enemy_1_dir + "Knight_02__HURT_002.png",
        enemy_1_dir + "Knight_02__HURT_001.png",
        enemy_1_dir + "Knight_02__HURT_000.png"
    ],
    run: [
        enemy_1_dir + "Knight_02__RUN_000.png",
        enemy_1_dir + "Knight_02__RUN_001.png",
        enemy_1_dir + "Knight_02__RUN_002.png",
        enemy_1_dir + "Knight_02__RUN_003.png",
        enemy_1_dir + "Knight_02__RUN_004.png",
        enemy_1_dir + "Knight_02__RUN_005.png",
        enemy_1_dir + "Knight_02__RUN_006.png",
        enemy_1_dir + "Knight_02__RUN_007.png",
        enemy_1_dir + "Knight_02__RUN_008.png",
        enemy_1_dir + "Knight_02__RUN_009.png",
        enemy_1_dir + "Knight_02__RUN_008.png",
        enemy_1_dir + "Knight_02__RUN_007.png",
        enemy_1_dir + "Knight_02__RUN_006.png",
        enemy_1_dir + "Knight_02__RUN_005.png",
        enemy_1_dir + "Knight_02__RUN_004.png",
        enemy_1_dir + "Knight_02__RUN_003.png",
        enemy_1_dir + "Knight_02__RUN_002.png",
        enemy_1_dir + "Knight_02__RUN_001.png",
        enemy_1_dir + "Knight_02__RUN_000.png"
    ],
    walk: [
        enemy_1_dir + "Knight_02__WALK_000.png",
        enemy_1_dir + "Knight_02__WALK_001.png",
        enemy_1_dir + "Knight_02__WALK_002.png",
        enemy_1_dir + "Knight_02__WALK_003.png",
        enemy_1_dir + "Knight_02__WALK_004.png",
        enemy_1_dir + "Knight_02__WALK_005.png",
        enemy_1_dir + "Knight_02__WALK_006.png",
        enemy_1_dir + "Knight_02__WALK_007.png",
        enemy_1_dir + "Knight_02__WALK_008.png",
        enemy_1_dir + "Knight_02__WALK_009.png",
        enemy_1_dir + "Knight_02__WALK_008.png",
        enemy_1_dir + "Knight_02__WALK_007.png",
        enemy_1_dir + "Knight_02__WALK_006.png",
        enemy_1_dir + "Knight_02__WALK_005.png",
        enemy_1_dir + "Knight_02__WALK_004.png",
        enemy_1_dir + "Knight_02__WALK_003.png",
        enemy_1_dir + "Knight_02__WALK_002.png",
        enemy_1_dir + "Knight_02__WALK_001.png",
        enemy_1_dir + "Knight_02__WALK_000.png"
    ]
};
///////////////////////////////////////////////////////////////////
const enemy_2_img_pack = {
    idle: [
        enemy_2_dir + "Knight_03__IDLE_000.png",
        enemy_2_dir + "Knight_03__IDLE_001.png",
        enemy_2_dir + "Knight_03__IDLE_002.png",
        enemy_2_dir + "Knight_03__IDLE_003.png",
        enemy_2_dir + "Knight_03__IDLE_004.png",
        enemy_2_dir + "Knight_03__IDLE_005.png",
        enemy_2_dir + "Knight_03__IDLE_006.png",
        enemy_2_dir + "Knight_03__IDLE_007.png",
        enemy_2_dir + "Knight_03__IDLE_008.png",
        enemy_2_dir + "Knight_03__IDLE_009.png",
        enemy_2_dir + "Knight_03__IDLE_008.png",
        enemy_2_dir + "Knight_03__IDLE_007.png",
        enemy_2_dir + "Knight_03__IDLE_006.png",
        enemy_2_dir + "Knight_03__IDLE_005.png",
        enemy_2_dir + "Knight_03__IDLE_004.png",
        enemy_2_dir + "Knight_03__IDLE_003.png",
        enemy_2_dir + "Knight_03__IDLE_002.png",
        enemy_2_dir + "Knight_03__IDLE_001.png",
        enemy_2_dir + "Knight_03__IDLE_000.png"
    ],
    attack: [
        enemy_2_dir + "Knight_03__ATTACK_000.png",
        enemy_2_dir + "Knight_03__ATTACK_001.png",
        enemy_2_dir + "Knight_03__ATTACK_002.png",
        enemy_2_dir + "Knight_03__ATTACK_003.png",
        enemy_2_dir + "Knight_03__ATTACK_004.png",
        enemy_2_dir + "Knight_03__ATTACK_005.png",
        enemy_2_dir + "Knight_03__ATTACK_006.png",
        enemy_2_dir + "Knight_03__ATTACK_007.png",
        enemy_2_dir + "Knight_03__ATTACK_008.png",
        enemy_2_dir + "Knight_03__ATTACK_009.png",
        enemy_2_dir + "Knight_03__ATTACK_008.png",
        enemy_2_dir + "Knight_03__ATTACK_007.png",
        enemy_2_dir + "Knight_03__ATTACK_006.png",
        enemy_2_dir + "Knight_03__ATTACK_005.png",
        enemy_2_dir + "Knight_03__ATTACK_004.png",
        enemy_2_dir + "Knight_03__ATTACK_003.png",
        enemy_2_dir + "Knight_03__ATTACK_002.png",
        enemy_2_dir + "Knight_03__ATTACK_001.png",
        enemy_2_dir + "Knight_03__ATTACK_000.png"
    ],
    die: [
        enemy_2_dir + "Knight_03__DIE_000.png",
        enemy_2_dir + "Knight_03__DIE_001.png",
        enemy_2_dir + "Knight_03__DIE_002.png",
        enemy_2_dir + "Knight_03__DIE_003.png",
        enemy_2_dir + "Knight_03__DIE_004.png",
        enemy_2_dir + "Knight_03__DIE_005.png",
        enemy_2_dir + "Knight_03__DIE_006.png",
        enemy_2_dir + "Knight_03__DIE_007.png",
        enemy_2_dir + "Knight_03__DIE_008.png",
        enemy_2_dir + "Knight_03__DIE_009.png"
    ],
    hurt: [
        enemy_2_dir + "Knight_03__HURT_000.png",
        enemy_2_dir + "Knight_03__HURT_001.png",
        enemy_2_dir + "Knight_03__HURT_002.png",
        enemy_2_dir + "Knight_03__HURT_003.png",
        enemy_2_dir + "Knight_03__HURT_004.png",
        enemy_2_dir + "Knight_03__HURT_005.png",
        enemy_2_dir + "Knight_03__HURT_006.png",
        enemy_2_dir + "Knight_03__HURT_007.png",
        enemy_2_dir + "Knight_03__HURT_008.png",
        enemy_2_dir + "Knight_03__HURT_009.png",
        enemy_2_dir + "Knight_03__HURT_008.png",
        enemy_2_dir + "Knight_03__HURT_007.png",
        enemy_2_dir + "Knight_03__HURT_006.png",
        enemy_2_dir + "Knight_03__HURT_005.png",
        enemy_2_dir + "Knight_03__HURT_004.png",
        enemy_2_dir + "Knight_03__HURT_003.png",
        enemy_2_dir + "Knight_03__HURT_002.png",
        enemy_2_dir + "Knight_03__HURT_001.png",
        enemy_2_dir + "Knight_03__HURT_000.png"
    ],
    run: [
        enemy_2_dir + "Knight_03__RUN_000.png",
        enemy_2_dir + "Knight_03__RUN_001.png",
        enemy_2_dir + "Knight_03__RUN_002.png",
        enemy_2_dir + "Knight_03__RUN_003.png",
        enemy_2_dir + "Knight_03__RUN_004.png",
        enemy_2_dir + "Knight_03__RUN_005.png",
        enemy_2_dir + "Knight_03__RUN_006.png",
        enemy_2_dir + "Knight_03__RUN_007.png",
        enemy_2_dir + "Knight_03__RUN_008.png",
        enemy_2_dir + "Knight_03__RUN_009.png",
        enemy_2_dir + "Knight_03__RUN_008.png",
        enemy_2_dir + "Knight_03__RUN_007.png",
        enemy_2_dir + "Knight_03__RUN_006.png",
        enemy_2_dir + "Knight_03__RUN_005.png",
        enemy_2_dir + "Knight_03__RUN_004.png",
        enemy_2_dir + "Knight_03__RUN_003.png",
        enemy_2_dir + "Knight_03__RUN_002.png",
        enemy_2_dir + "Knight_03__RUN_001.png",
        enemy_2_dir + "Knight_03__RUN_000.png"
    ],
    walk: [
        enemy_2_dir + "Knight_03__WALK_000.png",
        enemy_2_dir + "Knight_03__WALK_001.png",
        enemy_2_dir + "Knight_03__WALK_002.png",
        enemy_2_dir + "Knight_03__WALK_003.png",
        enemy_2_dir + "Knight_03__WALK_004.png",
        enemy_2_dir + "Knight_03__WALK_005.png",
        enemy_2_dir + "Knight_03__WALK_006.png",
        enemy_2_dir + "Knight_03__WALK_007.png",
        enemy_2_dir + "Knight_03__WALK_008.png",
        enemy_2_dir + "Knight_03__WALK_009.png",
        enemy_2_dir + "Knight_03__WALK_008.png",
        enemy_2_dir + "Knight_03__WALK_007.png",
        enemy_2_dir + "Knight_03__WALK_006.png",
        enemy_2_dir + "Knight_03__WALK_005.png",
        enemy_2_dir + "Knight_03__WALK_004.png",
        enemy_2_dir + "Knight_03__WALK_003.png",
        enemy_2_dir + "Knight_03__WALK_002.png",
        enemy_2_dir + "Knight_03__WALK_001.png",
        enemy_2_dir + "Knight_03__WALK_000.png"
    ]
};
///////////////////////////////////////////////////////////////////
const enemy_3_img_pack = {
    idle: [
        enemy_3_dir + "IDLE_000.png",
        enemy_3_dir + "IDLE_001.png",
        enemy_3_dir + "IDLE_002.png",
        enemy_3_dir + "IDLE_003.png",
        enemy_3_dir + "IDLE_004.png",
        enemy_3_dir + "IDLE_005.png",
        enemy_3_dir + "IDLE_006.png",
        enemy_3_dir + "IDLE_005.png",
        enemy_3_dir + "IDLE_004.png",
        enemy_3_dir + "IDLE_003.png",
        enemy_3_dir + "IDLE_002.png",
        enemy_3_dir + "IDLE_001.png",
        enemy_3_dir + "IDLE_000.png"
    ],
    attack: [
        enemy_3_dir + "ATTAK_000.png",
        enemy_3_dir + "ATTAK_001.png",
        enemy_3_dir + "ATTAK_002.png",
        enemy_3_dir + "ATTAK_003.png",
        enemy_3_dir + "ATTAK_004.png",
        enemy_3_dir + "ATTAK_005.png",
        enemy_3_dir + "ATTAK_006.png",
        enemy_3_dir + "ATTAK_005.png",
        enemy_3_dir + "ATTAK_004.png",
        enemy_3_dir + "ATTAK_003.png",
        enemy_3_dir + "ATTAK_002.png",
        enemy_3_dir + "ATTAK_001.png",
        enemy_3_dir + "ATTAK_000.png"
    ],
    die: [
        enemy_3_dir + "DIE_000.png",
        enemy_3_dir + "DIE_001.png",
        enemy_3_dir + "DIE_002.png",
        enemy_3_dir + "DIE_003.png",
        enemy_3_dir + "DIE_004.png",
        enemy_3_dir + "DIE_005.png",
        enemy_3_dir + "DIE_006.png"
    ],
    hurt: [
        enemy_3_dir + "HURT_000.png",
        enemy_3_dir + "HURT_001.png",
        enemy_3_dir + "HURT_002.png",
        enemy_3_dir + "HURT_003.png",
        enemy_3_dir + "HURT_004.png",
        enemy_3_dir + "HURT_005.png",
        enemy_3_dir + "HURT_006.png",
        enemy_3_dir + "HURT_005.png",
        enemy_3_dir + "HURT_004.png",
        enemy_3_dir + "HURT_003.png",
        enemy_3_dir + "HURT_002.png",
        enemy_3_dir + "HURT_001.png",
        enemy_3_dir + "HURT_000.png"
    ]
};
///////////////////////////////////////////////////////////////////
const enemy_4_img_pack = {
    idle: [
        enemy_4_dir + "IDLE_000.png",
        enemy_4_dir + "IDLE_001.png",
        enemy_4_dir + "IDLE_002.png",
        enemy_4_dir + "IDLE_003.png",
        enemy_4_dir + "IDLE_004.png",
        enemy_4_dir + "IDLE_005.png",
        enemy_4_dir + "IDLE_006.png",
        enemy_4_dir + "IDLE_005.png",
        enemy_4_dir + "IDLE_004.png",
        enemy_4_dir + "IDLE_003.png",
        enemy_4_dir + "IDLE_002.png",
        enemy_4_dir + "IDLE_001.png",
        enemy_4_dir + "IDLE_000.png"
    ],
    attack: [
        enemy_4_dir + "ATTAK_000.png",
        enemy_4_dir + "ATTAK_001.png",
        enemy_4_dir + "ATTAK_002.png",
        enemy_4_dir + "ATTAK_003.png",
        enemy_4_dir + "ATTAK_004.png",
        enemy_4_dir + "ATTAK_005.png",
        enemy_4_dir + "ATTAK_006.png",
        enemy_4_dir + "ATTAK_005.png",
        enemy_4_dir + "ATTAK_004.png",
        enemy_4_dir + "ATTAK_003.png",
        enemy_4_dir + "ATTAK_002.png",
        enemy_4_dir + "ATTAK_001.png",
        enemy_4_dir + "ATTAK_000.png"
    ],
    die: [
        enemy_4_dir + "DIE_000.png",
        enemy_4_dir + "DIE_001.png",
        enemy_4_dir + "DIE_002.png",
        enemy_4_dir + "DIE_003.png",
        enemy_4_dir + "DIE_004.png",
        enemy_4_dir + "DIE_005.png",
        enemy_4_dir + "DIE_006.png"
    ],
    hurt: [
        enemy_4_dir + "HURT_000.png",
        enemy_4_dir + "HURT_001.png",
        enemy_4_dir + "HURT_002.png",
        enemy_4_dir + "HURT_003.png",
        enemy_4_dir + "HURT_004.png",
        enemy_4_dir + "HURT_005.png",
        enemy_4_dir + "HURT_006.png",
        enemy_4_dir + "HURT_005.png",
        enemy_4_dir + "HURT_004.png",
        enemy_4_dir + "HURT_003.png",
        enemy_4_dir + "HURT_002.png",
        enemy_4_dir + "HURT_001.png",
        enemy_4_dir + "HURT_000.png"
    ]
};
///////////////////////////////////////////////////////////////////
const enemy_5_img_pack = {
    idle: [
        enemy_5_dir + "IDLE_000.png",
        enemy_5_dir + "IDLE_001.png",
        enemy_5_dir + "IDLE_002.png",
        enemy_5_dir + "IDLE_003.png",
        enemy_5_dir + "IDLE_004.png",
        enemy_5_dir + "IDLE_005.png",
        enemy_5_dir + "IDLE_006.png",
        enemy_5_dir + "IDLE_005.png",
        enemy_5_dir + "IDLE_004.png",
        enemy_5_dir + "IDLE_003.png",
        enemy_5_dir + "IDLE_002.png",
        enemy_5_dir + "IDLE_001.png",
        enemy_5_dir + "IDLE_000.png"
    ],
    attack: [
        enemy_5_dir + "ATTAK_000.png",
        enemy_5_dir + "ATTAK_001.png",
        enemy_5_dir + "ATTAK_002.png",
        enemy_5_dir + "ATTAK_003.png",
        enemy_5_dir + "ATTAK_004.png",
        enemy_5_dir + "ATTAK_005.png",
        enemy_5_dir + "ATTAK_006.png",
        enemy_5_dir + "ATTAK_005.png",
        enemy_5_dir + "ATTAK_004.png",
        enemy_5_dir + "ATTAK_003.png",
        enemy_5_dir + "ATTAK_002.png",
        enemy_5_dir + "ATTAK_001.png",
        enemy_5_dir + "ATTAK_000.png"
    ],
    die: [
        enemy_5_dir + "DIE_000.png",
        enemy_5_dir + "DIE_001.png",
        enemy_5_dir + "DIE_002.png",
        enemy_5_dir + "DIE_003.png",
        enemy_5_dir + "DIE_004.png",
        enemy_5_dir + "DIE_005.png",
        enemy_5_dir + "DIE_006.png"
    ],
    hurt: [
        enemy_5_dir + "HURT_000.png",
        enemy_5_dir + "HURT_001.png",
        enemy_5_dir + "HURT_002.png",
        enemy_5_dir + "HURT_003.png",
        enemy_5_dir + "HURT_004.png",
        enemy_5_dir + "HURT_005.png",
        enemy_5_dir + "HURT_006.png",
        enemy_5_dir + "HURT_005.png",
        enemy_5_dir + "HURT_004.png",
        enemy_5_dir + "HURT_003.png",
        enemy_5_dir + "HURT_002.png",
        enemy_5_dir + "HURT_001.png",
        enemy_5_dir + "HURT_000.png"
    ]
};
///////////////////////////////////////////////////////////////////
const boss_img_pack = {
    idle: [
        boss_dir + "ceifador_idle_000.png",
        boss_dir + "ceifador_idle_001.png",
        boss_dir + "ceifador_idle_002.png",
        boss_dir + "ceifador_idle_003.png",
        boss_dir + "ceifador_idle_004.png",
        boss_dir + "ceifador_idle_005.png",
        boss_dir + "ceifador_idle_006.png",
        boss_dir + "ceifador_idle_007.png",
        boss_dir + "ceifador_idle_006.png",
        boss_dir + "ceifador_idle_005.png",
        boss_dir + "ceifador_idle_004.png",
        boss_dir + "ceifador_idle_003.png",
        boss_dir + "ceifador_idle_002.png",
        boss_dir + "ceifador_idle_001.png",
        boss_dir + "ceifador_idle_000.png"
    ],
    attack: [
        boss_dir + "ceifador_attack_000.png",
        boss_dir + "ceifador_attack_001.png",
        boss_dir + "ceifador_attack_002.png",
        boss_dir + "ceifador_attack_003.png",
        boss_dir + "ceifador_attack_004.png",
        boss_dir + "ceifador_attack_005.png",
        boss_dir + "ceifador_attack_006.png",
        boss_dir + "ceifador_attack_007.png",
        boss_dir + "ceifador_attack_008.png",
        boss_dir + "ceifador_attack_009.png",
        boss_dir + "ceifador_attack_010.png",
        boss_dir + "ceifador_attack_011.png",
        boss_dir + "ceifador_attack_012.png"
    ],
    die: [
        boss_dir + "ceifador_die_000.png",
        boss_dir + "ceifador_die_001.png",
        boss_dir + "ceifador_die_002.png",
        boss_dir + "ceifador_die_003.png",
        boss_dir + "ceifador_die_004.png",
        boss_dir + "ceifador_die_005.png",
        boss_dir + "ceifador_die_006.png",
        boss_dir + "ceifador_die_007.png",
        boss_dir + "ceifador_die_008.png",
        boss_dir + "ceifador_die_009.png",
        boss_dir + "ceifador_die_010.png",
        boss_dir + "ceifador_die_011.png",
        boss_dir + "ceifador_die_012.png",
        boss_dir + "ceifador_die_013.png",
        boss_dir + "ceifador_die_014.png",
        boss_dir + "ceifador_die_015.png",
        boss_dir + "ceifador_die_016.png",
        boss_dir + "ceifador_die_017.png"
    ],
    hurt: [
        boss_dir + "ceifador_hurt_000.png",
        boss_dir + "ceifador_hurt_000.png",
        boss_dir + "ceifador_hurt_000.png",
        boss_dir + "ceifador_hurt_000.png",
        boss_dir + "ceifador_hurt_000.png",
        boss_dir + "ceifador_hurt_000.png",
        boss_dir + "ceifador_hurt_000.png",
        boss_dir + "ceifador_hurt_000.png",
        boss_dir + "ceifador_hurt_001.png"
    ]
};
///////////////////////////////////////////////////////////////////