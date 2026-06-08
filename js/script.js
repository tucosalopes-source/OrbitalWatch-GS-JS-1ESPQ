var slideAtual = 0;
var slides = document.querySelectorAll('.slide');
var pontos = document.querySelectorAll('.ponto');
var totalSlides = slides.length;
var intervaloSlide;


function mostrarSlide(n) {
  for (var i = 0; i < slides.length; i++) {
    slides[i].classList.remove('ativo');
    pontos[i].classList.remove('ativo');
  }

  slideAtual = n;
  if (slideAtual >= totalSlides) {
    slideAtual = 0;
  }
  if (slideAtual < 0) {
    slideAtual = totalSlides - 1;
  }

  slides[slideAtual].classList.add('ativo');
  pontos[slideAtual].classList.add('ativo');
}
function mudarSlide(direcao) {
  mostrarSlide(slideAtual + direcao);

  clearInterval(intervaloSlide);
  intervaloSlide = setInterval(function () {
    mostrarSlide(slideAtual + 1);
  }, 4000);
}

function irParaSlide(n) {
  mostrarSlide(n);

  clearInterval(intervaloSlide);
  intervaloSlide = setInterval(function () {
    mostrarSlide(slideAtual + 1);
  }, 4000);
}

intervaloSlide = setInterval(function () {
  mostrarSlide(slideAtual + 1);
}, 4000);

function validarFormulario(evento) {
  evento.preventDefault();

  var nome     = document.getElementById('form-nome').value.trim();
  var email    = document.getElementById('form-email').value.trim();
  var assunto  = document.getElementById('form-assunto').value.trim();
  var mensagem = document.getElementById('form-mensagem').value.trim();

  var temErro = false;

  document.getElementById('erro-nome').textContent     = '';
  document.getElementById('erro-email').textContent    = '';
  document.getElementById('erro-assunto').textContent  = '';
  document.getElementById('erro-mensagem').textContent = '';

  if (nome === '') {
    document.getElementById('erro-nome').textContent = 'Por favor, preencha o seu nome.';
    temErro = true;
  }

  if (email === '') {
    document.getElementById('erro-email').textContent = 'Por favor, preencha o seu e-mail.';
    temErro = true;
  } else if (email.indexOf('@') === -1 || email.indexOf('.') === -1) {
    document.getElementById('erro-email').textContent = 'Por favor, insira um e-mail válido.';
    temErro = true;
  }

  if (assunto === '') {
    document.getElementById('erro-assunto').textContent = 'Por favor, preencha o assunto.';
    temErro = true;
  }

  if (mensagem === '') {
    document.getElementById('erro-mensagem').textContent = 'Por favor, escreva a sua mensagem.';
    temErro = true;
  }

  if (!temErro) {
    document.getElementById('form-sucesso').style.display = 'block';
    document.getElementById('form-contato').reset();

    setTimeout(function () {
      document.getElementById('form-sucesso').style.display = 'none';
    }, 4000);
  }
}

var formulario = document.getElementById('form-contato');
if (formulario) {
  formulario.addEventListener('submit', validarFormulario);
}

var perguntas = [
  {
    pergunta: 'Qual foi o primeiro satélite artificial lançado ao espaço?',
    opcoes: ['Explorer 1', 'Sputnik 1', 'Vostok 1', 'Luna 1'],
    resposta: 1
  },
  {
    pergunta: 'Em que ano o Sputnik 1 foi lançado?',
    opcoes: ['1955', '1957', '1961', '1969'],
    resposta: 1
  },
  {
    pergunta: 'O que é telemetria em satélites?',
    opcoes: [
      'Sistema de propulsão do satélite',
      'Coleta e transmissão de dados do satélite para a Terra',
      'Tipo de órbita espacial',
      'Software de navegação'
    ],
    resposta: 1
  },
  {
    pergunta: 'O que significa a sigla GPS?',
    opcoes: [
      'Global Positioning System',
      'General Prediction Satellite',
      'Geographic Position Service',
      'Global Patrol System'
    ],
    resposta: 0
  },
  {
    pergunta: 'Qual é a principal fonte de energia dos satélites artificiais?',
    opcoes: ['Bateria nuclear', 'Energia solar', 'Combustível fóssil', 'Energia eólica'],
    resposta: 1
  },
  {
    pergunta: 'O que é uma órbita geoestacionária?',
    opcoes: [
      'Órbita que passa pelos polos da Terra',
      'Órbita onde o satélite acompanha a rotação da Terra',
      'Órbita muito baixa, próxima à superfície',
      'Órbita elíptica ao redor da Lua'
    ],
    resposta: 1
  },
  {
    pergunta: 'Quantos satélites GPS são necessários para fornecer uma localização precisa?',
    opcoes: ['2', '3', '4', '6'],
    resposta: 2
  },
  {
    pergunta: 'O que é debris espacial (lixo espacial)?',
    opcoes: [
      'Asteroides próximos à Terra',
      'Fragmentos e satélites inativos em órbita',
      'Poeira cósmica do universo',
      'Meteoros que entram na atmosfera'
    ],
    resposta: 1
  },
  {
    pergunta: 'Qual agência espacial americana é responsável por muitas missões de satélites?',
    opcoes: ['ESA', 'INPE', 'NASA', 'JAXA'],
    resposta: 2
  },
  {
    pergunta: 'O que o OrbitalWatch monitora nos satélites?',
    opcoes: [
      'Tráfego aéreo',
      'Temperatura, energia solar e comunicação dos satélites',
      'Previsão do tempo na Terra',
      'Atividade vulcânica'
    ],
    resposta: 1
  }
];

var perguntaAtual = 0;
var pontuacao     = 0;

function mostrarPergunta() {
  var info  = perguntas[perguntaAtual];
  var total = perguntas.length;

  document.getElementById('quiz-contador').textContent =
    'Pergunta ' + (perguntaAtual + 1) + ' de ' + total;
  document.getElementById('quiz-pergunta').textContent = info.pergunta;

  var opcoesDiv = document.getElementById('quiz-opcoes');
  opcoesDiv.innerHTML = '';

  for (var i = 0; i < info.opcoes.length; i++) {
    var btn = document.createElement('button');
    btn.textContent = info.opcoes[i];
    btn.className   = 'btn-opcao';
    btn.setAttribute('data-indice', i);
    btn.onclick     = verificarResposta;
    opcoesDiv.appendChild(btn);
  }

  document.getElementById('btn-proxima').style.display = 'none';
  document.getElementById('quiz-feedback').textContent = '';
  document.getElementById('quiz-feedback').className   = 'quiz-feedback';

  atualizarBarraQuiz(); // atualiza a barra de progresso a cada pergunta
}

function verificarResposta() {
  var indiceEscolhido = parseInt(this.getAttribute('data-indice'));
  var respostaCorreta = perguntas[perguntaAtual].resposta;

  var botoes = document.querySelectorAll('.btn-opcao');
  for (var i = 0; i < botoes.length; i++) {
    botoes[i].disabled = true;
    if (i === respostaCorreta) botoes[i].classList.add('correta');
  }

  if (indiceEscolhido === respostaCorreta) {
    pontuacao++;
    document.getElementById('quiz-feedback').textContent = '✓ Correto!';
    document.getElementById('quiz-feedback').className   = 'quiz-feedback acerto';
  } else {
    this.classList.add('errada');
    document.getElementById('quiz-feedback').textContent = '✗ Errado! A resposta correta está marcada em verde.';
    document.getElementById('quiz-feedback').className   = 'quiz-feedback erro';
  }

  document.getElementById('btn-proxima').style.display = 'block';
}

function proximaPergunta() {
  perguntaAtual++;
  if (perguntaAtual < perguntas.length) {
    mostrarPergunta();
  } else {
    mostrarResultado();
  }
}

function mostrarResultado() {
  document.getElementById('quiz-area').style.display      = 'none';
  document.getElementById('quiz-resultado').style.display = 'block';

  var percentual = Math.round((pontuacao / perguntas.length) * 100);
  document.getElementById('resultado-pontuacao').textContent  = pontuacao + ' / ' + perguntas.length;
  document.getElementById('resultado-percentual').textContent = percentual + '%';

  var mensagem = '';
  if      (percentual >= 80) mensagem = 'Parabéns! Você é um especialista em satélites!';
  else if (percentual >= 60) mensagem = 'Bom trabalho! Você conhece bastante sobre o espaço.';
  else if (percentual >= 40) mensagem = 'Continue estudando! O universo tem muito a ensinar.';
  else                       mensagem = 'Não desanime! Explore o OrbitalWatch e aprenda mais.';

  document.getElementById('resultado-mensagem').textContent = mensagem;

  // Preenche a barra de progresso até 100% ao terminar
  var fill = document.getElementById('barra-quiz-fill');
  if (fill) fill.style.width = '100%';

  salvarMelhorPontuacao(); // salva e mostra a melhor pontuação
}

function iniciarQuiz() {
  document.getElementById('quiz-inicio').style.display = 'none';
  document.getElementById('quiz-area').style.display   = 'block';
  mostrarPergunta();
}

function reiniciarQuiz() {
  perguntaAtual = 0;
  pontuacao     = 0;

  // Remove o elemento de recorde anterior para recriar depois
  var recordAntigo = document.getElementById('resultado-record');
  if (recordAntigo) recordAntigo.remove();

  document.getElementById('quiz-resultado').style.display = 'none';
  document.getElementById('quiz-area').style.display      = 'block';
  mostrarPergunta();
}

function mudarTema(tema) {
  var raiz   = document.documentElement;
  var botoes = document.querySelectorAll('.btn-tema');

  for (var i = 0; i < botoes.length; i++) {
    botoes[i].classList.remove('ativo');
  }
  document.querySelector('.btn-tema[data-tema="' + tema + '"]').classList.add('ativo');

  if (tema === 'escuro') {
    raiz.style.setProperty('--cor-fundo',             '#080a0f');
    raiz.style.setProperty('--cor-fundo-secundario',  '#0d1117');
    raiz.style.setProperty('--cor-card',              '#0f1520');
    raiz.style.setProperty('--cor-card-borda',        '#1a2233');
    raiz.style.setProperty('--cor-acento',            '#00d4ff');
    raiz.style.setProperty('--cor-acento-secundario', '#0077ff');
  } else if (tema === 'oceano') {
    raiz.style.setProperty('--cor-fundo',             '#020c1b');
    raiz.style.setProperty('--cor-fundo-secundario',  '#041525');
    raiz.style.setProperty('--cor-card',              '#061a2e');
    raiz.style.setProperty('--cor-card-borda',        '#0a2a45');
    raiz.style.setProperty('--cor-acento',            '#00aaff');
    raiz.style.setProperty('--cor-acento-secundario', '#0055cc');
  } else if (tema === 'aurora') {
    raiz.style.setProperty('--cor-fundo',             '#0a0515');
    raiz.style.setProperty('--cor-fundo-secundario',  '#12052a');
    raiz.style.setProperty('--cor-card',              '#150830');
    raiz.style.setProperty('--cor-card-borda',        '#2a1050');
    raiz.style.setProperty('--cor-acento',            '#bb44ff');
    raiz.style.setProperty('--cor-acento-secundario', '#7700cc');
  }

  localStorage.setItem('tema-orbital', tema);
}

var temaSalvo = localStorage.getItem('tema-orbital');
if (temaSalvo) {
  mudarTema(temaSalvo);
}

var barraLeitura = document.createElement('div');
barraLeitura.id  = 'barra-leitura';
barraLeitura.style.cssText =
  'position:fixed; top:0; left:0; width:0%; height:3px;' +
  'background:var(--cor-acento); z-index:9999; transition:width 0.1s ease; pointer-events:none;';
document.body.prepend(barraLeitura);

// Atualiza a largura da barra conforme o usuário scrolla
window.addEventListener('scroll', function () {
  var totalAltura  = document.body.scrollHeight - window.innerHeight;
  var porcentagem  = (window.scrollY / totalAltura) * 100;
  barraLeitura.style.width = porcentagem + '%';
});