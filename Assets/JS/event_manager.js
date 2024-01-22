// Event dispatched in user_login.js
window.addEventListener('userChecked', configureGtag, false);

// Events dispatched in mini_cart.js
window.addEventListener('cartViewed', viewCartEvent, false);
window.addEventListener('productRemovedFromCart', removeFromCartEvent, false);

// Events dispatched in product.js
window.addEventListener('searchPageViewed', searchPageEvent, false);
window.addEventListener('hotsitePageViewed', hotsitePageEvent, false);
window.addEventListener('productAddedToCart', addToCartEvent, false);
window.addEventListener('productPageViewed', productPageEvent, false);

// Event dispatched in wishlist.js
window.addEventListener('productAddedToWishlist', addToWishlistEvent, false);
window.addEventListener(
  'productRemovedFromWishlist',
  removeFromWishlistEvent,
  false,
);

/***********************************************************************/

function configureGtag(eventInput) {
  setTimeout(() => setUserIdGtag(eventInput), 5000);

  const scrollListener = () => setUserIdGtag(eventInput);
  const mousemoveListener = () => setUserIdGtag(eventInput);
  const touchstartListener = () => setUserIdGtag(eventInput);

  window.addEventListener('scroll', scrollListener);
  window.addEventListener('mousemove', mousemoveListener);
  window.addEventListener('touchstart', touchstartListener);

  function setUserIdGtag(eventInput) {
    gtagSetup(eventInput?.detail?.email);

    window.removeEventListener('scroll', scrollListener);
    window.removeEventListener('mousemove', mousemoveListener);
    window.removeEventListener('touchstart', touchstartListener);
  }
}

// Functions called by custom events
function viewCartEvent() {
  //gtag("event", "view_cart", data_layer_cart_details);
}

function removeFromCartEvent(eventInput) {
  gtag('event', 'remove_from_cart', getProductData(eventInput.detail.products));
  gtag('event', 'view_item_list', getCartData(eventInput.detail.cart));
}

function searchPageEvent(eventInput) {
  gtag('event', 'search', { search_term: eventInput.detail.term });
  gtag('event', 'view_item_list', data_layer_search_details);
}

function hotsitePageEvent(eventInput) {
  gtag('event', 'view_item_list', data_layer_hotsite_details);
}

function addToCartEvent(eventInput) {
  gtag('event', 'add_to_cart', getProductData(eventInput.detail.products));
  gtag('event', 'view_item_list', getCartData(eventInput.detail.cart));
}

function productPageEvent(eventInput) {
  if (eventInput.detail.type == 'product')
    gtag('event', 'view_item', data_layer_product_details);
}

function addToWishlistEvent(eventInput) {
  gtag('event', 'add_to_wishlist', getProductData(eventInput.detail.products));
}

function removeFromWishlistEvent(eventInput) {
  gtag(
    'event',
    'remove_from_wishlist',
    getProductData(eventInput.detail.products),
  );
}

function getProductData(productData) {
  const cartProducts = [];
  for (productToAdd of productData)
    cartProducts.push({
      item_id: productToAdd.productId ?? productToAdd.productVariantId,
    });
  return { items: cartProducts };
}

function getCartData(checkoutData) {
  const cartProducts = [];
  for (productToAdd of checkoutData.products)
    cartProducts.push({
      item_id: productToAdd.productId,
      item_name: productToAdd.name,
      discount:
        productToAdd.price == 0
          ? 0
          : productToAdd.listPrice - productToAdd.price,
      index: 0,
      price: productToAdd.price == 0 ? productToAdd.price : productToAdd.price,
      quantity: 1,
    });
  const formated = {
    item_list_name: 'Cart List',
    currency: 'BRL',
    price: checkoutData.total,
    items: cartProducts,
  };
  return formated;
}
