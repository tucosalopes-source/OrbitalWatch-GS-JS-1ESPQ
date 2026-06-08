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