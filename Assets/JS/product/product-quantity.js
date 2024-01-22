const manipulaQuantidade = (() => {
  document.body.addEventListener('click', function ({ target }) {
    let campoQuantidade = document.querySelector('#product-quantity__input');
    if (target.classList.contains('product-quantity__add')) {
      campoQuantidade.value = parseInt(campoQuantidade.value) + 1;
    } else if (target.classList.contains('product-quantity__remove')) {
      if (parseInt(campoQuantidade.value) > 1) {
        campoQuantidade.value = parseInt(campoQuantidade.value) - 1;
      }
    }
  });
})();
