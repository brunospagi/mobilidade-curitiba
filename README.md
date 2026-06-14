# Mobilidade Inteligente - Curitiba

Aplicativo educativo de mobilidade urbana para simular rotas turísticas em Curitiba, comparar meios de transporte e apoiar decisões com foco em custo, tempo, acessibilidade e sustentabilidade.

## Contexto acadêmico

**ILHA INTERDISCIPLINAR DE RACIONALIDADE (IIR)**  
**Tema:** Mundo Digital – Ensino Fundamental II (6º ao 9º ano)  
**Curso:** Licenciatura em Computação  
**Disciplina:** App

## Recursos principais

- Mapa interativo com pontos turísticos de Curitiba.
- Simulação de rota entre pontos turísticos.
- Opção de usar a localização atual como origem.
- Estimativa de distância e tempo.
- Cálculo de combustível para trajetos de carro.
- Cálculo do valor da passagem para ônibus.
- Mensagem de transporte sustentável para bicicleta e caminhada.
- Sugestão automática do transporte com melhor benefício.
- Narração por voz com Web Speech API.

## Acessibilidade

- VLibras para apoio em Libras.
- Alto contraste.
- Leitura de instruções por voz.
- Modo calmo para reduzir estímulos visuais e sonoros.
- Foco visual reforçado para navegação por teclado.
- Textos descritivos em controles e mapa.

## Métrica de melhor benefício

A sugestão de transporte considera:

- Tempo estimado.
- Custo estimado.
- Clima.
- Sustentabilidade.
- Distância confortável para caminhada e bicicleta.

Prioridades gerais:

- Trajetos muito curtos favorecem caminhada.
- Trajetos curtos/médios favorecem bicicleta.
- Trajetos médios favorecem ônibus.
- Trajetos longos podem favorecer carro.

## PWA

O projeto está preparado como PWA com:

- `manifest.webmanifest`
- `sw.js`
- Ícones em `icons/`
- Convite de instalação do app

> Para instalar como aplicativo, acesse por `localhost` ou `https`. O modo PWA não funciona corretamente via `file://`.

## Executar localmente

Você pode abrir com um servidor estático. Exemplo com Node.js:

```bash
npx serve .
```

Ou com Python:

```bash
python -m http.server 8000
```

Depois acesse:

```text
http://localhost:8000
```

## Docker

Criar a imagem:

```bash
docker build -t mobilidade-inteligente-curitiba .
```

Executar o container:

```bash
docker run -d -p 8080:80 --name mobilidade-curitiba mobilidade-inteligente-curitiba
```

Acessar:

```text
http://localhost:8080
```

## Tecnologias

- HTML5
- CSS3
- JavaScript
- Leaflet
- OSRM
- OpenStreetMap
- VLibras
- PWA
- Docker + Nginx

## Estudantes

- BRUNO GABRIEL DOS SANTOS DA SILVA
- CLÁUDIO ANDRÉ SOUZA DA SILVA
- DEISY CARLA ARMSTRONG DA CRUZ HAIDUK
- LEANDRO APARECIDO NEVES
- LUCÉLIA MOREIRA DA SILVA
- MÁRCIO SALES
- SIMONE MATHIAS CASTAMAN

## Créditos de dados

Dados do mapa: OpenStreetMap • OSRM
