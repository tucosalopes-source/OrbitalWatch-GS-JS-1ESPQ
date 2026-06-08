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

