// ======================================================
// MOBILIDADE INTELIGENTE - CURITIBA
// Simulador educativo de rotas e mobilidade urbana
// ======================================================


// ======================================================
// CARREGA AS VOZES DO NAVEGADOR
// ======================================================

if ("speechSynthesis" in window) {

    speechSynthesis.onvoiceschanged = () => {

        speechSynthesis.getVoices();

    };

}


// ======================================================
// CONTROLE GLOBAL DA ANIMAÇÃO
// ======================================================

let intervaloAtual = null;

let timeoutDestino = null;

let linha = null;

let marcador = null;

let localizacaoAtual = null;

let marcadorLocalizacao = null;

let modoOrigem = "ponto";

let temporizadoresVoz = [];

let ultimaSugestaoTransporte = "";

let eventoInstalacaoPwa = null;

let ultimaRotaMapas = null;


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
    "Parque Tingui",
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
    "Parque Tingui": [-25.392, -49.298],
    "Santa Felicidade": [-25.403, -49.331],
    "Parque Barigui": [-25.425, -49.308],
    "Torre Panorâmica": [-25.416, -49.291],
    "Setor Histórico": [-25.429, -49.273]

};


// ======================================================
// INFORMAÇÕES DOS PONTOS TURÍSTICOS
// ======================================================

const informacoesPontos = {

    "Rua 24 Horas": {
        foto: "fotos/rua-24-horas.png",
        categoria: "Compras e gastronomia",
        horario: "Horário variável conforme lojas e restaurantes",
        descricao: "Galeria urbana tradicional com serviços, alimentação e circulação de pedestres."
    },

    "Praça Tiradentes": {
        foto: "fotos/praca-tiradentes.png",
        categoria: "História e espaço público",
        horario: "Espaço aberto",
        descricao: "Marco histórico central de Curitiba, próximo a construções importantes da cidade."
    },

    "Rua das Flores": {
        foto: "fotos/rua-das-flores.png",
        categoria: "Rua pedestrianizada",
        horario: "Espaço aberto",
        descricao: "Calçadão histórico com flores, comércio e circulação segura para pedestres."
    },

    "Museu Ferroviário": {
        foto: "fotos/museu-ferroviario.png",
        categoria: "Museu",
        horario: "Consulte o horário oficial antes da visita",
        descricao: "Espaço dedicado à memória ferroviária e ao desenvolvimento urbano ligado aos trilhos."
    },

    "Teatro Paiol": {
        foto: "fotos/teatro-paiol.png",
        categoria: "Cultura",
        horario: "Conforme programação cultural",
        descricao: "Teatro histórico conhecido por sua arquitetura circular e apresentações culturais."
    },

    "Jardim Botânico": {
        foto: "fotos/jardim-botanico.png",
        categoria: "Parque e natureza",
        horario: "Consulte o horário oficial antes da visita",
        descricao: "Um dos cartões-postais de Curitiba, com estufa, jardins e áreas para caminhada."
    },

    "Mercado Municipal": {
        foto: "fotos/mercado-municipal.png",
        categoria: "Gastronomia e compras",
        horario: "Horário comercial; consulte funcionamento oficial",
        descricao: "Mercado tradicional com alimentos, produtos regionais e diversidade gastronômica."
    },

    "Teatro Guaíra": {
        foto: "fotos/teatro-guaira.png",
        categoria: "Cultura",
        horario: "Conforme programação cultural",
        descricao: "Importante complexo cultural para teatro, música, dança e eventos artísticos."
    },

    "Passeio Público": {
        foto: "fotos/passeio-publico.png",
        categoria: "Parque urbano",
        horario: "Consulte o horário oficial antes da visita",
        descricao: "Parque histórico com áreas verdes, lago, trilhas e espaços de contemplação."
    },

    "Centro Cívico": {
        foto: "fotos/centro-civico.png",
        categoria: "Arquitetura e governo",
        horario: "Espaços externos abertos; prédios têm horários próprios",
        descricao: "Região administrativa com arquitetura institucional e importantes espaços públicos."
    },

    "Bosque do Papa": {
        foto: "fotos/bosque-do-papa.png",
        categoria: "Bosque e memória cultural",
        horario: "Consulte o horário oficial antes da visita",
        descricao: "Área verde com memória da cultura polonesa e casas tradicionais de madeira."
    },

    "Museu Oscar Niemeyer": {
        foto: "fotos/museu-oscar-niemeyer.png",
        categoria: "Museu e arquitetura",
        horario: "Consulte o horário oficial antes da visita",
        descricao: "Museu de arte e design conhecido pela arquitetura marcante em formato de olho."
    },

    "Bosque Alemão": {
        foto: "fotos/bosque-alemao.png",
        categoria: "Bosque e cultura",
        horario: "Consulte o horário oficial antes da visita",
        descricao: "Bosque temático com trilhas, mirante e referências à cultura alemã."
    },

    "Parque São Lourenço": {
        foto: "fotos/parque-sao-lourenco.png",
        categoria: "Parque e lazer",
        horario: "Consulte o horário oficial antes da visita",
        descricao: "Parque com lago, áreas verdes, ciclovia e espaços culturais."
    },

    "Ópera de Arame": {
        foto: "fotos/opera-de-arame.png",
        categoria: "Cultura e arquitetura",
        horario: "Consulte o horário oficial antes da visita",
        descricao: "Teatro de estrutura metálica em meio à natureza, lago e paisagem rochosa."
    },

    "Parque Tanguá": {
        foto: "fotos/parque-tangua.png",
        categoria: "Parque e mirante",
        horario: "Consulte o horário oficial antes da visita",
        descricao: "Parque com mirante, jardins, lagos e vista panorâmica."
    },

    "Parque Tingui": {
        foto: "fotos/parque-tingui.png",
        categoria: "Parque e natureza",
        horario: "Consulte o horário oficial antes da visita",
        descricao: "Amplo parque com lago, trilhas e áreas de lazer ao ar livre."
    },

    "Santa Felicidade": {
        foto: "fotos/santa-felicidade.png",
        categoria: "Gastronomia e cultura",
        horario: "Horário variável conforme restaurantes e comércio",
        descricao: "Bairro conhecido pela tradição gastronômica, cultura italiana e restaurantes."
    },

    "Parque Barigui": {
        foto: "fotos/parque-barigui.png",
        categoria: "Parque e lazer",
        horario: "Espaço aberto; consulte regras locais",
        descricao: "Um dos parques mais frequentados da cidade, com lago, pistas e áreas verdes."
    },

    "Torre Panorâmica": {
        foto: "fotos/torre-panoramica.png",
        categoria: "Mirante",
        horario: "Consulte o horário oficial antes da visita",
        descricao: "Mirante urbano para observar Curitiba de cima e compreender a paisagem da cidade."
    },

    "Setor Histórico": {
        foto: "fotos/setor-historico.png",
        categoria: "História e cultura",
        horario: "Espaço aberto; atrações têm horários próprios",
        descricao: "Região com casario antigo, memória urbana, cultura e espaços de convivência."
    }

};


// ======================================================
// ELEMENTOS DA TELA
// ======================================================

const btnModoPontoEl = document.getElementById("btnModoPonto");

const btnModoLocalizacaoEl = document.getElementById("btnModoLocalizacao");

const grupoOrigemEl = document.getElementById("grupoOrigem");

const grupoLocalizacaoEl = document.getElementById("grupoLocalizacao");

const statusLocalizacaoEl = document.getElementById("statusLocalizacao");

const conviteInstalacaoEl = document.getElementById("conviteInstalacao");

const btnInstalarAppEl = document.getElementById("btnInstalarApp");

const btnFecharInstalacaoEl = document.getElementById("btnFecharInstalacao");

const btnContrasteEl = document.getElementById("btnContraste");

const btnLeituraEl = document.getElementById("btnLeitura");

const btnModoCalmoEl = document.getElementById("btnModoCalmo");

const origemEl = document.getElementById("origem");

const destinoEl = document.getElementById("destino");

const transporteEl = document.getElementById("transporte");

const grupoCombustivelEl = document.getElementById("grupoCombustivel");

const precoCombustivelEl = document.getElementById("precoCombustivel");

const grupoPassagemEl = document.getElementById("grupoPassagem");

const valorPassagemEl = document.getElementById("valorPassagem");

const climaEl = document.getElementById("clima");

const btnLocalizacaoEl = document.getElementById("btnLocalizacao");

const btnSimularEl = document.getElementById("btnSimular");

const btnAbrirMapasEl = document.getElementById("btnAbrirMapas");

const resultadoEl = document.getElementById("resultado");

const chaveContraste = "mobilidadeAltoContraste";

const chaveModoCalmo = "mobilidadeModoCalmo";

const chaveConviteInstalacao = "mobilidadeConviteInstalacaoFechado";


// ======================================================
// REGISTRA O SERVICE WORKER
// ======================================================

if ("serviceWorker" in navigator) {

    window.addEventListener("load", () => {

        navigator.serviceWorker.register("sw.js")
            .catch(() => {

                console.warn("Não foi possível registrar o service worker.");

            });

    });

}


// ======================================================
// VERIFICA SE O APP JÁ ESTÁ INSTALADO
// ======================================================

function appJaInstalado() {

    const modoStandalone =
        window.matchMedia("(display-mode: standalone)").matches;

    const modoIos =
        window.navigator.standalone === true;

    return modoStandalone || modoIos;

}


// ======================================================
// MOSTRA CONVITE PARA INSTALAR O APP
// ======================================================

function mostrarConviteInstalacao() {

    if (appJaInstalado()) return;

    if (localStorage.getItem(chaveConviteInstalacao) === "true") return;

    conviteInstalacaoEl.classList.remove("oculto");

}


// ======================================================
// ESCONDE CONVITE PARA INSTALAR O APP
// ======================================================

function esconderConviteInstalacao() {

    conviteInstalacaoEl.classList.add("oculto");

}


// ======================================================
// EVENTO DE INSTALAÇÃO DO PWA
// ======================================================

window.addEventListener("beforeinstallprompt", event => {

    event.preventDefault();

    eventoInstalacaoPwa = event;

    mostrarConviteInstalacao();

});


// ======================================================
// BOTÃO INSTALAR APP
// ======================================================

btnInstalarAppEl.onclick = async function () {

    if (!eventoInstalacaoPwa) {

        resultadoEl.textContent =
            "Se o navegador permitir, use a opção instalar aplicativo no menu.";

        return;

    }


    eventoInstalacaoPwa.prompt();

    await eventoInstalacaoPwa.userChoice;

    eventoInstalacaoPwa = null;

    esconderConviteInstalacao();

};


// ======================================================
// BOTÃO FECHAR CONVITE
// ======================================================

btnFecharInstalacaoEl.onclick = function () {

    localStorage.setItem(chaveConviteInstalacao, "true");

    esconderConviteInstalacao();

};


// ======================================================
// APP INSTALADO
// ======================================================

window.addEventListener("appinstalled", () => {

    eventoInstalacaoPwa = null;

    esconderConviteInstalacao();

});


// ======================================================
// CONVITE AO ABRIR A PÁGINA
// ======================================================

window.addEventListener("load", () => {

    setTimeout(() => {

        mostrarConviteInstalacao();

    }, 1200);

});


// ======================================================
// APLICA O ALTO CONTRASTE
// ======================================================

function aplicarAltoContraste(ativo) {

    document.body.classList.toggle("alto-contraste", ativo);

    btnContrasteEl.setAttribute("aria-pressed", String(ativo));


    if (ativo) {

        btnContrasteEl.textContent = "◐ Desativar alto contraste";

        return;

    }


    btnContrasteEl.textContent = "◐ Alto contraste";

}


// ======================================================
// ALTERNA O ALTO CONTRASTE
// ======================================================

function alternarAltoContraste() {

    const ativo =
        !document.body.classList.contains("alto-contraste");


    aplicarAltoContraste(ativo);

    try {

        localStorage.setItem(chaveContraste, String(ativo));

    } catch (erro) {

        console.warn("Não foi possível salvar a preferência de contraste.");

    }


    if (ativo) {

        falar("Alto contraste ativado.");

        return;

    }


    falar("Alto contraste desativado.");

}


// ======================================================
// CARREGA PREFERÊNCIA DE CONTRASTE
// ======================================================

function carregarPreferenciaContraste() {

    try {

        const ativo =
            localStorage.getItem(chaveContraste) === "true";

        aplicarAltoContraste(ativo);

    } catch (erro) {

        aplicarAltoContraste(false);

    }

}


// ======================================================
// APLICA O MODO CALMO
// ======================================================

function aplicarModoCalmo(ativo) {

    document.body.classList.toggle("modo-calmo", ativo);

    btnModoCalmoEl.setAttribute("aria-pressed", String(ativo));


    if (ativo) {

        btnModoCalmoEl.textContent = "🧩 Desativar modo calmo";

        return;

    }


    btnModoCalmoEl.textContent = "🧩 Modo calmo";

}


// ======================================================
// VERIFICA SE O MODO CALMO ESTÁ ATIVO
// ======================================================

function modoCalmoAtivo() {

    return document.body.classList.contains("modo-calmo");

}


// ======================================================
// ALTERNA O MODO CALMO
// ======================================================

function alternarModoCalmo() {

    const ativo =
        !modoCalmoAtivo();


    aplicarModoCalmo(ativo);


    try {

        localStorage.setItem(chaveModoCalmo, String(ativo));

    } catch (erro) {

        console.warn("Não foi possível salvar a preferência do modo calmo.");

    }


    if (ativo) {

        falar("Modo calmo ativado.");

        return;

    }


    falar("Modo calmo desativado.");

}


// ======================================================
// CARREGA PREFERÊNCIA DO MODO CALMO
// ======================================================

function carregarPreferenciaModoCalmo() {

    try {

        const ativo =
            localStorage.getItem(chaveModoCalmo) === "true";

        aplicarModoCalmo(ativo);

    } catch (erro) {

        aplicarModoCalmo(false);

    }

}


// ======================================================
// MONTA TEXTO PARA LEITURA DA TELA
// ======================================================

function montarTextoLeitura() {

    const origemTexto =
        modoOrigem === "localizacao"
            ? "sua localização atual"
            : origemEl.value;

    const combustivelTexto =
        transporteEl.value === "Carro"
            ? `Preço do combustível: ${precoCombustivelEl.value} reais por litro.`
            : "";

    const passagemTexto =
        transporteEl.value === "Ônibus"
            ? `Valor da passagem: ${valorPassagemEl.value} reais.`
            : "";


    return `
        Mobilidade Inteligente Curitiba.
        Este simulador permite calcular uma rota turística.
        Primeiro escolha se deseja sair de um ponto turístico ou da sua localização atual.
        Origem selecionada: ${origemTexto}.
        Destino selecionado: ${destinoEl.value}.
        Transporte selecionado: ${transporteEl.value}.
        ${combustivelTexto}
        ${passagemTexto}
        Clima selecionado: ${climaEl.value}.
        ${ultimaSugestaoTransporte}
        Para iniciar, pressione o botão Simular rota.
        Você também pode ativar o VLibras pelo botão flutuante da página.
    `;

}


// ======================================================
// LÊ AS INSTRUÇÕES DA TELA
// ======================================================

function lerInstrucoesTela() {

    falar(montarTextoLeitura());

}


// ======================================================
// BOTÃO ALTO CONTRASTE
// ======================================================

btnContrasteEl.onclick = function () {

    alternarAltoContraste();

};


// ======================================================
// BOTÃO LER INSTRUÇÕES
// ======================================================

btnLeituraEl.onclick = function () {

    lerInstrucoesTela();

};


// ======================================================
// BOTÃO MODO CALMO
// ======================================================

btnModoCalmoEl.onclick = function () {

    alternarModoCalmo();

};


// ======================================================
//  CRIAÇÃO DO MAPA
// ======================================================

const map = L.map("map").setView([-25.43, -49.27], 13);


// ======================================================
// CAMADA VISUAL
// ======================================================

L.tileLayer(

"https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",

{
    attribution: "© OpenStreetMap © CARTO"
}

).addTo(map);


// ======================================================
// MARCADORES TURÍSTICOS
// ======================================================

function montarPopupPonto(nome) {

    const info =
        informacoesPontos[nome];


    if (!info) {

        return `<strong>${nome}</strong>`;

    }


    return `
        <article class="popup-ponto">
            <img src="${info.foto}" alt="Ilustração de ${nome}" class="foto-popup-ponto">

            <div class="conteudo-popup-ponto">

                <strong>${nome}</strong>

                <span class="categoria-popup-ponto">
                    ${info.categoria}
                </span>

                <p>
                    ${info.descricao}
                </p>

                <small>
                    <strong>Horário:</strong>
                    ${info.horario}
                </small>

            </div>
        </article>
    `;

}


function criarIconePonto(nome) {

    const info =
        informacoesPontos[nome];


    if (!info) {

        return undefined;

    }


    return L.divIcon({

        html: `
            <div class="icone-ponto-mapa">
                <img src="${info.foto}" alt="">
            </div>
        `,

        className: "",
        iconSize: [46, 46],
        iconAnchor: [23, 46],
        popupAnchor: [0, -42]

    });

}


Object.keys(pontos).forEach(nome => {

    L.marker(pontos[nome], {

        icon: criarIconePonto(nome)

    })
        .addTo(map)
        .bindPopup(montarPopupPonto(nome));

});


// ======================================================
// SELECTS
// ======================================================

rotaTurismo.forEach(ponto => {

    const opcaoOrigem = document.createElement("option");

    opcaoOrigem.value = ponto;

    opcaoOrigem.textContent = ponto;

    origemEl.appendChild(opcaoOrigem);


    const opcaoDestino = document.createElement("option");

    opcaoDestino.value = ponto;

    opcaoDestino.textContent = ponto;

    destinoEl.appendChild(opcaoDestino);

});


// ======================================================
// ATUALIZA O MODO DE ORIGEM
// ======================================================

function atualizarModoOrigem() {

    const usandoPonto =
        modoOrigem === "ponto";


    btnModoPontoEl.classList.toggle("ativa", usandoPonto);

    btnModoLocalizacaoEl.classList.toggle("ativa", !usandoPonto);

    grupoOrigemEl.classList.toggle("oculto", !usandoPonto);

    grupoLocalizacaoEl.classList.toggle("oculto", usandoPonto);


    if (usandoPonto) {

        btnSimularEl.disabled = false;

        resultadoEl.textContent =
            "Escolha um ponto de origem e um destino.";

        return;

    }


    if (localizacaoAtual) {

        btnSimularEl.disabled = false;

        btnLocalizacaoEl.textContent = "Atualizar minha localização";

        statusLocalizacaoEl.textContent =
            "Localização ativa. Agora escolha o destino e simule.";

        resultadoEl.textContent =
            "Sua localização será usada como origem da rota.";

        return;

    }


    btnSimularEl.disabled = true;

    btnLocalizacaoEl.disabled = false;

    btnLocalizacaoEl.textContent = "Liberar minha localização";

    statusLocalizacaoEl.textContent =
        "Clique no botão para permitir o uso da localização.";

    resultadoEl.textContent =
        "Libere sua localização para simular saindo de onde você está.";

}


// ======================================================
// ATUALIZA CAMPOS DE CUSTO
// ======================================================

function atualizarCamposCusto() {

    const usandoCarro =
        transporteEl.value === "Carro";

    const usandoOnibus =
        transporteEl.value === "Ônibus";


    grupoCombustivelEl.classList.toggle("oculto", !usandoCarro);

    grupoPassagemEl.classList.toggle("oculto", !usandoOnibus);

}


// ======================================================
// TRANSPORTE
// ======================================================

transporteEl.onchange = function () {

    atualizarCamposCusto();

};


// ======================================================
// GEOLOCALIZAÇÃO DO USUÁRIO
// ======================================================

function usarLocalizacaoAtual() {

    if (!navigator.geolocation) {

        resultadoEl.textContent =
            "Geolocalização não disponível neste navegador.";

        return;

    }


    btnLocalizacaoEl.disabled = true;

    btnSimularEl.disabled = true;

    statusLocalizacaoEl.textContent =
        "Buscando sua posição...";

    resultadoEl.textContent =
        "Buscando sua localização atual...";


    navigator.geolocation.getCurrentPosition(

        posicao => {

            localizacaoAtual = [
                posicao.coords.latitude,
                posicao.coords.longitude
            ];


            if (marcadorLocalizacao) {

                map.removeLayer(marcadorLocalizacao);

            }


            marcadorLocalizacao = L.marker(localizacaoAtual)
                .addTo(map)
                .bindPopup("Você está aqui")
                .openPopup();


            map.setView(localizacaoAtual, 15);

            btnLocalizacaoEl.disabled = false;

            atualizarModoOrigem();

        },

        erro => {

            let mensagem = "Não foi possível obter sua localização.";

            if (erro.code === erro.PERMISSION_DENIED) {

                mensagem = "Permissão de localização negada.";

            }

            if (erro.code === erro.POSITION_UNAVAILABLE) {

                mensagem = "Localização indisponível no momento.";

            }

            if (erro.code === erro.TIMEOUT) {

                mensagem = "Tempo esgotado ao buscar localização.";

            }


            btnLocalizacaoEl.disabled = false;

            btnSimularEl.disabled = true;

            statusLocalizacaoEl.textContent = mensagem;

            resultadoEl.textContent = mensagem;

        },

        {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
        }

    );

}


// ======================================================
// BOTÕES DO MODO DE ORIGEM
// ======================================================

btnModoPontoEl.onclick = function () {

    modoOrigem = "ponto";

    atualizarModoOrigem();

};


btnModoLocalizacaoEl.onclick = function () {

    modoOrigem = "localizacao";

    atualizarModoOrigem();

};


// ======================================================
// BOTÃO LOCALIZAÇÃO
// ======================================================

btnLocalizacaoEl.onclick = function () {

    usarLocalizacaoAtual();

};


// ======================================================
// FUNÇÃO DE VOZ FEMININA
// ======================================================

function falar(texto) {

    if (!("speechSynthesis" in window)) return;

    if (speechSynthesis.speaking) {

        speechSynthesis.cancel();

    }

    const msg = new SpeechSynthesisUtterance(texto);

    msg.lang = "pt-BR";

    msg.rate = 0.95;

    msg.pitch = 1;

    msg.volume = 1;


    const vozes = speechSynthesis.getVoices();


    const vozGoogle = vozes.find(

        voz => voz.name.includes("Google português do Brasil")

    );

    const vozPortugues = vozes.find(

        voz => voz.lang === "pt-BR" || voz.lang === "pt-PT"

    );


    if (vozGoogle) {

        msg.voice = vozGoogle;

    }

    if (!vozGoogle && vozPortugues) {

        msg.voice = vozPortugues;

    }

    speechSynthesis.speak(msg);

}


// ======================================================
// VERIFICA SE A VOZ ESTÁ FALANDO
// ======================================================

function vozEstaFalando() {

    if (!("speechSynthesis" in window)) return false;

    return speechSynthesis.speaking;

}


// ======================================================
// FALA APÓS UM TEMPO
// ======================================================

function falarDepois(texto, tempo) {

    const temporizador = setTimeout(() => {

        falar(texto);

    }, tempo);


    temporizadoresVoz.push(temporizador);

}


// ======================================================
// MENSAGEM INICIAL DA ROTA
// ======================================================

function anunciarInicioRota(transporte, destino) {

    if (modoCalmoAtivo()) return;

    if (transporte === "Carro") {

        falar("Bem vindo ao simulador de mobilidade urbana.");

        falarDepois("Utilize o cinto de segurança.", 3000);

    }


    if (transporte === "Bicicleta") {

        falar("Bem vindo ao simulador de mobilidade urbana.");

        falarDepois("Utilize capacete ao pedalar.", 3000);

        falarDepois("Você escolheu um transporte sustentável.", 6000);

    }


    if (transporte === "Ônibus") {

        falar("Bem vindo à linha turismo de Curitiba.");

        falarDepois("Próximo destino " + destino, 3500);

    }


    if (transporte === "A pé") {

        falar("Bem vindo ao simulador.");

        falarDepois("Atenção ao atravessar as ruas.", 3000);

        falarDepois("Você escolheu um transporte sustentável.", 6000);

    }

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
// CONSUMO MÉDIO DO CARRO
// ======================================================

const consumoMedioCarroKmPorLitro = 10;


// ======================================================
// TARIFA ESTIMADA DO ÔNIBUS
// ======================================================

const tarifaOnibusEstimativa = 6;


// ======================================================
// FATOR MÉDIO DE TRÂNSITO PARA COMPARAÇÃO
// ======================================================

const fatorTransitoMedio = 1.3;


// ======================================================
// SUGESTÃO DE MELHOR TRANSPORTE
// ======================================================

function sugerirMelhorTransporte(
    distanciaKm,
    clima,
    precoCombustivel,
    valorPassagem
) {

    const opcoes = [

        {
            icone: "🚶",
            transporte: "A pé",
            velocidade: velocidades["A pé"],
            custo: 0,
            sustentabilidade: 10,
            limiteConforto: 3
        },

        {
            icone: "🚴",
            transporte: "Bicicleta",
            velocidade: velocidades["Bicicleta"],
            custo: 0,
            sustentabilidade: 9,
            limiteConforto: 8
        },

        {
            icone: "🚌",
            transporte: "Ônibus",
            velocidade: velocidades["Ônibus"],
            custo: valorPassagem,
            sustentabilidade: 7,
            limiteConforto: 25
        },

        {
            icone: "🚗",
            transporte: "Carro",
            velocidade: velocidades["Carro"],
            custo: (distanciaKm / consumoMedioCarroKmPorLitro) * precoCombustivel,
            sustentabilidade: 3,
            limiteConforto: 999
        }

    ];


    const avaliadas = opcoes.map(opcao => {

        const fatorClimaOpcao =
            fatorClima(clima, opcao.transporte);

        const fatorTransitoOpcao =
            opcao.transporte === "Carro" || opcao.transporte === "Ônibus"
                ? fatorTransitoMedio
                : 1;

        const tempoHoras =
            distanciaKm / (opcao.velocidade * fatorClimaOpcao / fatorTransitoOpcao);

        const tempoMinutos =
            tempoHoras * 60;

        const penalidadeDistancia =
            distanciaKm > opcao.limiteConforto
                ? (distanciaKm - opcao.limiteConforto) * 8
                : 0;

        const bonusCurtaDistancia =
            distanciaKm <= 1.5 && opcao.transporte === "A pé"
                ? -25
                : distanciaKm <= 6 && opcao.transporte === "Bicicleta"
                    ? -18
                    : 0;

        const penalidadeChuva =
            clima === "Chuva" &&
            (opcao.transporte === "A pé" || opcao.transporte === "Bicicleta")
                ? 18
                : 0;

        const pontuacao =
            tempoMinutos * 0.45 +
            opcao.custo * 2 +
            (10 - opcao.sustentabilidade) * 5 +
            penalidadeDistancia +
            penalidadeChuva +
            bonusCurtaDistancia;


        return {
            ...opcao,
            tempoMinutos,
            pontuacao
        };

    });


    avaliadas.sort((a, b) => a.pontuacao - b.pontuacao);


    const melhor =
        avaliadas[0];


    return {
        icone: melhor.icone,
        transporte: melhor.transporte,
        motivo:
            `melhor equilíbrio entre tempo, custo, clima e sustentabilidade; tempo estimado ${Math.round(melhor.tempoMinutos)} min`
    };

}


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

    return "📍";

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
// LIMPA SIMULAÇÃO ANTERIOR
// ======================================================

function limparSimulacaoAnterior() {

    ultimaRotaMapas = null;

    atualizarBotaoMapas();


    if ("speechSynthesis" in window) {

        speechSynthesis.cancel();

    }


    if (intervaloAtual) {

        clearInterval(intervaloAtual);

    }


    if (timeoutDestino) {

        clearTimeout(timeoutDestino);

    }


    temporizadoresVoz.forEach(temporizador => {

        clearTimeout(temporizador);

    });


    temporizadoresVoz = [];


    if (marcador) {

        map.removeLayer(marcador);

    }


    if (linha) {

        map.removeLayer(linha);

    }

}


// ======================================================
// BUSCA COORDENADA DA ORIGEM
// ======================================================

function buscarCoordenadaOrigem() {

    if (modoOrigem === "localizacao") {

        return localizacaoAtual;

    }

    return pontos[origemEl.value];

}


// ======================================================
// MODO DO TRANSPORTE PARA MAPAS
// ======================================================

function modoTransporteMapas(transporte) {

    if (transporte === "Carro") return "driving";

    if (transporte === "Bicicleta") return "bicycling";

    if (transporte === "Ônibus") return "transit";

    if (transporte === "A pé") return "walking";

    return "driving";

}


// ======================================================
// MONTA LINK PARA O APLICATIVO DE MAPAS
// ======================================================

function montarLinkMapas(rota) {

    const origem =
        `${rota.origem[0]},${rota.origem[1]}`;

    const destino =
        `${rota.destino[0]},${rota.destino[1]}`;

    const modo =
        modoTransporteMapas(rota.transporte);


    return `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(origem)}&destination=${encodeURIComponent(destino)}&travelmode=${modo}`;

}


// ======================================================
// ATUALIZA BOTÃO DE MAPAS
// ======================================================

function atualizarBotaoMapas() {

    btnAbrirMapasEl.classList.toggle("oculto", !ultimaRotaMapas);

}


// ======================================================
// BOTÃO ABRIR MAPAS
// ======================================================

btnAbrirMapasEl.onclick = function () {

    if (!ultimaRotaMapas) {

        resultadoEl.textContent =
            "Simule uma rota antes de abrir no aplicativo de mapas.";

        return;

    }


    window.open(
        montarLinkMapas(ultimaRotaMapas),
        "_blank",
        "noopener"
    );

};


// ======================================================
// BOTÃO SIMULAR
// ======================================================

btnSimularEl.onclick = async function () {

    // limpa simulação anterior
    limparSimulacaoAnterior();


    // ==================================================
    // DADOS
    // ==================================================

    const origem = origemEl.value;

    const destino = destinoEl.value;

    const transporte = transporteEl.value;

    const clima = climaEl.value;

    const usandoLocalizacao =
        modoOrigem === "localizacao";


    // ==================================================
    // COORDENADAS
    // ==================================================

    const c1 = buscarCoordenadaOrigem();

    const c2 = pontos[destino];


    if (usandoLocalizacao && !localizacaoAtual) {

        resultadoEl.textContent =
            "Libere sua localização antes de simular.";

        atualizarModoOrigem();

        return;

    }


    if (!usandoLocalizacao && origem === destino) {

        resultadoEl.textContent =
            "Escolha pontos diferentes para origem e destino.";

        return;

    }


    if (!c1 || !c2) {

        resultadoEl.textContent =
            "Origem ou destino inválido.";

        return;

    }


    // ==================================================
    // MENSAGENS INICIAIS
    // ==================================================

    anunciarInicioRota(transporte, destino);


    // ==================================================
    // BUSCA ROTA
    // ==================================================

    const url =
`https://router.project-osrm.org/route/v1/driving/${c1[1]},${c1[0]};${c2[1]},${c2[0]}?overview=full&geometries=geojson`;


    resultadoEl.textContent =
        "Calculando rota...";


    let data = null;


    try {

        const res = await fetch(url);

        data = await res.json();

    } catch (erro) {

        resultadoEl.textContent =
            "Não foi possível conectar ao serviço de rotas.";

        return;

    }


    if (!data.routes || !data.routes[0]) {

        resultadoEl.textContent =
            "Não foi possível encontrar uma rota para esse trajeto.";

        return;

    }


    ultimaRotaMapas = {
        origem: c1,
        destino: c2,
        transporte
    };

    atualizarBotaoMapas();


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

            if (!modoCalmoAtivo()) {

                falar("Você chegou ao destino.");

            }

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

            if (!modoCalmoAtivo() && !vozEstaFalando()) {

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
            !modoCalmoAtivo() &&
            !vozEstaFalando()

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
    // COMBUSTÍVEL
    // ==================================================

    let textoCombustivel = "";


    if (transporte === "Carro") {

        const precoCombustivel =
            Number(precoCombustivelEl.value) || 0;

        const litrosGastos =
            dist / consumoMedioCarroKmPorLitro;

        const valorGasto =
            litrosGastos * precoCombustivel;


        textoCombustivel =
            ` |
         ⛽ ${litrosGastos.toFixed(2)} L |
         💰 R$ ${valorGasto.toFixed(2)}`;

    }


    // ==================================================
    // PASSAGEM DE ÔNIBUS
    // ==================================================

    let textoPassagem = "";


    if (transporte === "Ônibus") {

        const valorPassagem =
            Number(valorPassagemEl.value) || 0;

        textoPassagem =
            ` |
         💳 Passagem R$ ${valorPassagem.toFixed(2)}`;

    }


    // ==================================================
    // TRANSPORTE SUSTENTÁVEL
    // ==================================================

    let textoSustentavel = "";


    if (transporte === "Bicicleta" || transporte === "A pé") {

        textoSustentavel =
            ` |
         🌱 Transporte sustentável`;

    }


    // ==================================================
    // SUGESTÃO DE TRANSPORTE
    // ==================================================

    const precoCombustivelSugestao =
        Number(precoCombustivelEl.value) || 0;

    const valorPassagemSugestao =
        Number(valorPassagemEl.value) || tarifaOnibusEstimativa;

    const sugestao =
        sugerirMelhorTransporte(
            dist,
            clima,
            precoCombustivelSugestao,
            valorPassagemSugestao
        );

    const textoSugestao =
        `<br>
         💡 Melhor benefício: ${sugestao.icone} ${sugestao.transporte}
         (${sugestao.motivo})`;


    ultimaSugestaoTransporte =
        `Última sugestão de melhor benefício: ${sugestao.transporte}, ${sugestao.motivo}.`;


    // ==================================================
    // RESULTADO
    // ==================================================

    resultadoEl.innerHTML =

        `📏 ${dist.toFixed(2)} km |
         ⏱ ${tempoFormatado} |
         ${iconeTransporte(transporte)} ${transporte} |
         🌦 ${clima}${textoCombustivel}${textoPassagem}${textoSustentavel}
         ${textoSugestao}`;

};


// ======================================================
// ESTADO INICIAL
// ======================================================

carregarPreferenciaContraste();

carregarPreferenciaModoCalmo();

atualizarModoOrigem();

atualizarCamposCusto();
