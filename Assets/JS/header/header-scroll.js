window.addEventListener('scroll', function () {
  var header = document.querySelector('.header-top');
  var headerMenu = document.querySelector('.navigate');

  if (window.scrollY > 0) {
    header.classList.add('cabecalho-bye');
  } else {
    header.classList.remove('cabecalho-bye');
  }
});
