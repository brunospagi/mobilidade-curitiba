// ======================================================
// MOBILIDADE INTELIGENTE - CURITIBA
// Simulador educativo de rotas e mobilidade urbana
// ======================================================


// ======================================================
// CARREGA AS VOZES DO NAVEGADOR
// ======================================================

speechSynthesis.onvoiceschanged = () => {

    speechSynthesis.getVoices();

};


// ======================================================
// CONTROLE GLOBAL DA ANIMAÇÃO
// ======================================================

let intervaloAtual = null;

let timeoutDestino = null;

let linha = null;

let marcador = null;


// ======================================================
// LISTA DE PARADAS DA LINHA TURISMO
// ======================================================

const rotaTurismo = [

    "Rua 24 Horas",
    "Praça Tiradentes",
    "Rua das Flores",
    "Museu Ferroviário",
    "Teatro Paiol",
    "Jardim Botânico",
    "Mercado Municipal",
    "Teatro Guaíra",
    "Passeio Público",
    "Centro Cívico",
    "Bosque do Papa",
    "Museu Oscar Niemeyer",
    "Bosque Alemão",
    "Parque São Lourenço",
    "Ópera de Arame",
    "Parque Tanguá",
    "Parque Tinguí",
    "Santa Felicidade",
    "Parque Barigui",
    "Torre Panorâmica",
    "Setor Histórico"

];


// ======================================================
// COORDENADAS DOS PONTOS
// ======================================================

const pontos = {

    "Rua 24 Horas": [-25.432, -49.273],
    "Praça Tiradentes": [-25.428, -49.273],
    "Rua das Flores": [-25.430, -49.271],
    "Museu Ferroviário": [-25.428, -49.266],
    "Teatro Paiol": [-25.441, -49.268],
    "Jardim Botânico": [-25.443, -49.246],
    "Mercado Municipal": [-25.428, -49.265],
    "Teatro Guaíra": [-25.428, -49.269],
    "Passeio Público": [-25.427, -49.267],
    "Centro Cívico": [-25.417, -49.269],
    "Bosque do Papa": [-25.408, -49.267],
    "Museu Oscar Niemeyer": [-25.410, -49.267],
    "Bosque Alemão": [-25.406, -49.282],
    "Parque São Lourenço": [-25.399, -49.268],
    "Ópera de Arame": [-25.407, -49.276],
    "Parque Tanguá": [-25.379, -49.275],
    "Parque Tinguí": [-25.392, -49.298],
    "Santa Felicidade": [-25.403, -49.331],
    "Parque Barigui": [-25.425, -49.308],
    "Torre Panorâmica": [-25.416, -49.291],
    "Setor Histórico": [-25.429, -49.273]

};


// ======================================================
//  CRIAÇÃO DO MAPA
// ======================================================

const map = L.map('map').setView([-25.43, -49.27], 13);


// ======================================================
// CAMADA VISUAL
// ======================================================

L.tileLayer(

'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',

{
    attribution: '© OpenStreetMap © CARTO'
}

).addTo(map);


// ======================================================
// MARCADORES TURÍSTICOS
// ======================================================

Object.keys(pontos).forEach(nome => {

    L.marker(pontos[nome])
        .addTo(map)
        .bindPopup(nome);

});


// ======================================================
// SELECTS
// ======================================================

const origemEl = document.getElementById("origem");

const destinoEl = document.getElementById("destino");


rotaTurismo.forEach(ponto => {

    origemEl.innerHTML += `<option>${ponto}</option>`;

    destinoEl.innerHTML += `<option>${ponto}</option>`;

});


// ======================================================
// FUNÇÃO DE VOZ FEMININA
// ======================================================

function falar(texto) {

    if (speechSynthesis.speaking) return;

    const msg = new SpeechSynthesisUtterance(texto);

    msg.lang = "pt-BR";

    msg.rate = 0.95;

    msg.pitch = 1;

    msg.volume = 1;


    const vozes = speechSynthesis.getVoices();


    const vozGoogle = vozes.find(

        voz => voz.name.includes("Google português do Brasil")

    );


    if (vozGoogle) {

        msg.voice = vozGoogle;

    }

    speechSynthesis.speak(msg);

}


// ======================================================
// VELOCIDADES
// ======================================================

const velocidades = {

    "Carro": 40,
    "Bicicleta": 18,
    "Ônibus": 25,
    "A pé": 5

};


// ======================================================
// TRÂNSITO
// ======================================================

function fatorTransito() {

    const r = Math.random();

    if (r < 0.3) return 1;

    if (r < 0.7) return 1.3;

    return 1.6;

}


// ======================================================
// CLIMA
// ======================================================

function fatorClima(clima, transporte) {

    if (clima === "Chuva") {

        if (transporte === "Bicicleta") return 0.6;

        if (transporte === "A pé") return 0.7;

        return 0.75;

    }

    if (clima === "Sol") {

        if (transporte === "A pé") return 0.85;

        return 0.95;

    }

    return 1;

}


// ======================================================
// ÍCONES
// ======================================================

function iconeTransporte(t) {

    if (t === "Carro") return "🚗";

    if (t === "Bicicleta") return "🚴";

    if (t === "Ônibus") return "🚌";

    if (t === "A pé") return "🚶";

}


// ======================================================
// DISTÂNCIA
// ======================================================

function distancia(a, b) {

    return Math.sqrt(

        (a[0] - b[0]) ** 2 +

        (a[1] - b[1]) ** 2

    );

}


// ======================================================
// PROXIMIDADE
// ======================================================

function estaProximo(pos, destinoCoord) {

    return distancia(pos, destinoCoord) < 0.002;

}


// ======================================================
// FRASES EDUCATIVAS
// ======================================================

function fraseSeguranca(transporte) {

    const frases = {

        "Carro": [

            "Use sempre o cinto de segurança.",
            "Evite usar o celular ao dirigir.",
            "Respeite os limites de velocidade."

        ],

        "Bicicleta": [

            "Utilize capacete ao pedalar.",
            "Respeite a sinalização de trânsito.",
            "Use equipamentos refletivos à noite."

        ],

        "Ônibus": [

            "Segure-se ao andar dentro do ônibus.",
            "Respeite os assentos preferenciais."

        ],

        "A pé": [

            "Use a faixa de pedestres.",
            "Olhe para os dois lados antes de atravessar.",
            "Evite distrações ao caminhar."

        ]

    };

    let lista = frases[transporte];

    return lista[Math.floor(Math.random() * lista.length)];

}


// ======================================================
// BOTÃO SIMULAR
// ======================================================

document.getElementById("btnSimular").onclick = async function () {

    // limpa voz anterior
    speechSynthesis.cancel();


    // limpa animação anterior
    if (intervaloAtual) {

        clearInterval(intervaloAtual);

    }


    // limpa timeout
    if (timeoutDestino) {

        clearTimeout(timeoutDestino);

    }


    // remove marcador antigo
    if (marcador) {

        map.removeLayer(marcador);

    }


    // remove rota antiga
    if (linha) {

        map.removeLayer(linha);

    }


    // ==================================================
    // DADOS
    // ==================================================

    const origem = origemEl.value;

    const destino = destinoEl.value;

    const transporte =
        document.getElementById("transporte").value;

    const clima =
        document.getElementById("clima").value;


    // ==================================================
    // MENSAGENS INICIAIS
    // ==================================================

    setTimeout(() => {

        if (transporte === "Carro") {

            falar("Bem vindo ao simulador de mobilidade urbana.");

            setTimeout(() => {

                falar("Utilize o cinto de segurança.");

            }, 3000);

        }


        if (transporte === "Bicicleta") {

            falar("Bem vindo ao simulador de mobilidade urbana.");

            setTimeout(() => {

                falar("Utilize capacete ao pedalar.");

            }, 3000);

        }


        if (transporte === "Ônibus") {

            falar("Bem vindo à linha turismo de Curitiba.");

            setTimeout(() => {

                falar("Próximo destino " + destino);

            }, 3500);

        }


        if (transporte === "A pé") {

            falar("Bem vindo ao simulador.");

            setTimeout(() => {

                falar("Atenção ao atravessar as ruas.");

            }, 3000);

        }

    }, 500);


    // ==================================================
    // COORDENADAS
    // ==================================================

    const c1 = pontos[origem];

    const c2 = pontos[destino];


    // ==================================================
    // BUSCA ROTA
    // ==================================================

    const url =
`https://router.project-osrm.org/route/v1/driving/${c1[1]},${c1[0]};${c2[1]},${c2[0]}?overview=full&geometries=geojson`;

    const res = await fetch(url);

    const data = await res.json();


    // ==================================================
    // CONVERTE COORDENADAS
    // ==================================================

    const coords =
        data.routes[0].geometry.coordinates.map(c => [c[1], c[0]]);


    // ==================================================
    // DESENHA ROTA
    // ==================================================

    linha = L.polyline(coords, {

        color: "blue",
        weight: 5

    }).addTo(map);


    map.fitBounds(linha.getBounds());


    // ==================================================
    // ÍCONE
    // ==================================================

    const icon = L.divIcon({

        html:
        `<div style="font-size:30px">
            ${iconeTransporte(transporte)}
        </div>`,

        className: ""

    });


    marcador =
        L.marker(coords[0], {icon}).addTo(map);


    // ==================================================
    // VELOCIDADE ANIMAÇÃO
    // ==================================================

    let velocidadeAnimacao = 120;


    if (transporte === "Carro") {

        velocidadeAnimacao = 80;

    }


    if (transporte === "Ônibus") {

        velocidadeAnimacao = 140;

    }


    if (transporte === "Bicicleta") {

        velocidadeAnimacao = 180;

    }


    if (transporte === "A pé") {

        velocidadeAnimacao = 250;

    }


    // ==================================================
    // ANIMAÇÃO
    // ==================================================

    let i = 0;


    intervaloAtual = setInterval(() => {

        // evita erro final
        if (!coords[i]) {

            falar("Você chegou ao destino.");

            clearInterval(intervaloAtual);

            return;

        }


        // move marcador
        marcador.setLatLng(coords[i]);


        // ==================================================
        // CHEGADA ÔNIBUS
        // ==================================================

        if (

            transporte === "Ônibus" &&

            estaProximo(coords[i], pontos[destino])

        ) {

            if (!speechSynthesis.speaking) {

                falar(
                    "Atenção. Chegando ao destino " + destino
                );

            }

        }


        // ==================================================
        // ALERTAS
        // ==================================================

        if (

            i > 0 &&
            i % 150 === 0 &&
            !speechSynthesis.speaking

        ) {

            falar(fraseSeguranca(transporte));

        }


        // próxima posição
        i++;

    }, velocidadeAnimacao);


    // ==================================================
    // DISTÂNCIA E TEMPO
    // ==================================================

    let dist = data.routes[0].distance / 1000;

    let vel = velocidades[transporte];

    vel =
        vel *
        fatorClima(clima, transporte) /
        fatorTransito();

    // tempo em horas decimais
let tempo = dist / vel;


// converte para horas e minutos
let horas = Math.floor(tempo);

let minutos = Math.round((tempo - horas) * 60);


// texto final formatado
let tempoFormatado = `${horas}h ${minutos}min`;


    // ==================================================
    // RESULTADO
    // ==================================================

    document.getElementById("resultado").innerHTML =

        `📏 ${dist.toFixed(2)} km |
         ⏱ ${tempoFormatado} |
         🚍 ${transporte} |
         🌦 ${clima}`;

};