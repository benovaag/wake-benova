function imagemDesktop() {
  $('.product-thumbnails').slick({
    dots: false,
    arrows: true,
    infinite: false,
    speed: 300,
    autoplay: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    vertical: true,
    responsive: [
      {
        breakpoint: 900,
        settings: 'unslick',
      },
    ],
  });
}

function imagemMobile() {
  $('.product-thumbnails').slick({
    lazyLoad: 'ondemand',
    dots: false,
    arrows: false,
    slidesToShow: 4,
    slidesToScroll: 1,
  });
}

function alteraImagemDestaqueAoSelecionarMiniatura() {
  document.querySelector('body').addEventListener('click', ({ target }) => {
    if (target.classList.contains('product-thumbnails__image')) {
      let urlImage = target.getAttribute('src');
      let novaUrlImage = urlImage.replace(
        urlImage.substr(urlImage.indexOf('?w=')),
        '?w=1000&h1000',
      );

      //Altera a imagem em destaque
      document
        .querySelector('.product-image__image')
        .setAttribute('src', novaUrlImage);

      document
        .querySelector('.product-principal')
        .setAttribute('style', `background: url(${novaUrlImage})`);

      //Remove a opção ativa de alguma outra miniatura
      document
        .querySelector('.product-thumbnails__ativa')
        .classList.remove('product-thumbnails__ativa');

      //Ativa a opção nas miniaturas
      target
        .closest('.product-thumbnails__item')
        .classList.add('product-thumbnails__ativa');
    }
  });
}

function selecionaImagemInicialDestaque() {
  let primeiraImagemDestaque = document?.querySelector(
    '.product-thumbnails__item',
  );
  if (primeiraImagemDestaque) {
    let urlPrimeiraImagemMiniatura = primeiraImagemDestaque
      .querySelector('img')
      .getAttribute('src');
    let novaUrlImage = urlPrimeiraImagemMiniatura.replace(
      urlPrimeiraImagemMiniatura.substr(
        urlPrimeiraImagemMiniatura.indexOf('?w='),
      ),
      '?w=1000&h1000',
    );

    //Adiciona imagem em destaque inicial
    let imagemDestaque = document.querySelector('.product-principal');
    imagemDestaque.setAttribute('style', `background: url(${novaUrlImage})`);

    document
      .querySelector('.product-principal')
      .querySelector('img')
      .setAttribute('src', novaUrlImage);

    //Ativa a primeira opção nas miniaturas
    primeiraImagemDestaque.classList.add('product-thumbnails__ativa');
  }
}

function zoom(e) {
  var zoomer = e.currentTarget;
  e.offsetX ? (offsetX = e.offsetX) : (offsetX = e.pageX);
  e.offsetY ? (offsetY = e.offsetY) : (offsetX = e.pageX);
  x = (offsetX / zoomer.offsetWidth) * 100;
  y = (offsetY / zoomer.offsetHeight) * 100;
  zoomer.style.backgroundPosition = x + '% ' + y + '%';
}

//Inicia funções
alteraImagemDestaqueAoSelecionarMiniatura();
selecionaImagemInicialDestaque();
imagemDesktop();
imagemMobile();

//Monitora mudanças na página
let observer = new MutationObserver((mutations) => {
  mutations.forEach((item) => {
    if (item.addedNodes.length > 1) {
      if (item.addedNodes[1].id.indexOf('product-view__') >= 0) {
        alteraImagemDestaqueAoSelecionarMiniatura();
        selecionaImagemInicialDestaque();
        imagemDesktop();
        imagemMobile();
      }
    }
  });
});
observer.observe(document.querySelector('.product.content'), {
  childList: true,
  subtree: true,
});
