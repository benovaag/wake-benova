// Caso o usuário click no botão voltar do navegador, por exemplo, o carrinho não irá atualizar, por isso se isso acontecer, recarregamos a página
window.addEventListener(
  'pageshow',
  function (event) {
    if (event.persisted) {
      window.location.reload();
    }
  },
  false,
);

window.addEventListener('load', function () {
  loadMiniCart();
});

async function loadMiniCart() {
  try {
    const checkout = await client.checkout.get();

    let variables = {
      checkoutId: '',
      hasCheckout: false,
    };

    if (checkout && checkout.data.checkoutId != '') {
      variables.checkoutId = checkout.data.checkoutId;
      variables.hasCheckout = true;
    }

    const response = await client.snippet.render(
      'mini_cart_snippet.html',
      'SnippetQueries/mini_cart.graphql',
      variables,
    );
    document.getElementById('header-cart').innerHTML = response;
  } catch (error) {
    console.log(error);
  }
}

function cartMouseOver() {
  document.getElementById('modal-cart').classList.add('modal-cart__open');
  document.getElementById('overlay').classList.add('overlay-open');
}

function cartMouseOut() {
  document.getElementById('modal-cart').classList.remove('modal-cart__open');
  document.getElementById('overlay').classList.remove('overlay-open');
}

function overlayMouseOut() {
  document.getElementById('modal-cart').classList.remove('modal-cart__open');
  // document.getElementById('modal-login').classList.remove('modal-login__open');
  document.getElementById('open-mobile').classList.remove('open-mobile');
  document.getElementById('overlay').classList.remove('overlay-open');
}

async function removeProductFromCart(id, qty) {
  try {
    const input = [
      {
        productVariantId: Number(id),
        quantity: Number(qty),
      },
    ];

    await client.checkout.remove(input, await client.checkout.get().checkoutId);
    await loadMiniCart();
    document.getElementById('overlay').classList.remove('overlay-open');
  } catch (error) {
    console.log(error);
  }
}
