window.addEventListener('userChecked', wishlistLoad, false);
let productsInWishlist = [];

/**
 * Wishlist load function.
 * Executes after the user identification event is dispatched (user_login.js)
 */
async function wishlistLoad() {
  try {
    const wishlistBodyDiv = document.getElementById('wishlist-body');

    if (wishlistBodyDiv) {
      if (!(await validateCustomerAccessToken())) {
        setInnerHtml(
          "<a class='wishlist-text'>Realize o login.</a>",
          wishlistBodyDiv,
        );
        return;
      }

      const variables = {
        customerAccessToken: pegaUsuario.customerAccessToken,
      };

      const response = await client.snippet.render(
        'wishlist_snippet.html',
        'SnippetQueries/wishlist.graphql',
        variables,
      );
      const content = response
        ? response
        : "<p class='wishlist-text'>Não foi possível buscar a lista de desejos.</p>";

      setInnerHtml(content, wishlistBodyDiv);
    }
    await updateProductsInWishlist();
  } catch (error) {
    console.log(error);
  }
}

/**
 * Gets the IDs of products added in the user's wishlist
 */
async function updateProductsInWishlist() {
  if (pegaUsuario && pegaUsuario.customerAccessToken) {
    const query =
      'query Wishlist($customerAccessToken: String!) {\
            customer(customerAccessToken: $customerAccessToken) {\
                wishlist {\
                    products {\
                        productId\
                    }\
                }\
            }\
        }';

    const variables = { customerAccessToken: pegaUsuario.customerAccessToken };

    let response = await client.query(query, variables);
    let result = response?.customer?.wishlist?.products;

    let ids = result ? result.map((a) => a.productId) : [];
    productsInWishlist.splice(0, ids.length, ...ids);

    if (productsInWishlist.length > 0)
      productsInWishlist.forEach(verifyProductsInWishlist);
  }
}

/**
 * Change the wishlist icon if the product is added in the user's wishlist
 */
function verifyProductsInWishlist(productId) {
  let productElement = document.getElementById(`wishlist-icon-${productId}`);
  let buttonElement = document.getElementById(`wishlist-button-${productId}`);

  if (buttonElement && productElement) {
    productElement.classList.add('wishlist-on');
    buttonElement.setAttribute(
      'onclick',
      `wishlistRemoveClick(this, ${productId})`,
    );
  }
}

/**
 * Add to wishlist button click.
 * @param {HTMLInputElement} button - Button reference from HTML.
 * @param {string} productId - Product ID to add to wishlist.
 */
async function wishlistAddClick(button, productId) {
  const element = document.getElementById(`wishlist-icon-${productId}`);
  const success = await addOrRemoveWishlist(productId, true);

  if (element && success) {
    element.classList.add('wishlist-on');
    button.setAttribute('onclick', `wishlistRemoveClick(this, ${productId})`);
  }
}

/**
 * Remove from wishlist button click.
 * @param {HTMLInputElement} button - Button reference from HTML.
 * @param {string} productId - Product ID to remove from wishlist.
 */
async function wishlistRemoveClick(button, productId) {
  const element = document.getElementById(`wishlist-icon-${productId}`);
  const success = await addOrRemoveWishlist(productId, false);

  if (element && success) {
    element.classList.remove('wishlist-on');
    button.setAttribute('onclick', `wishlistAddClick(this, ${productId})`);
  }
}

/**
 * Checks 'user' variable value and sets it if an user is logged in.
 */
async function setCustomerAccessToken() {
  if (pegaUsuario?.customerAccessToken) return;

  const user = await client.user.get();
  if (user == null) return;

  pegaUsuario = user;
}

/**
 * Validates if customer access token exists.
 */
async function validateCustomerAccessToken() {
  await setCustomerAccessToken();
  return pegaUsuario?.customerAccessToken != null;
}

/**
 * Build wishlist input.
 * @param {string} productId - Product ID to add to wishlist.
 */
function buildWishlistInput(productId) {
  return {
    customerAccessToken: pegaUsuario.customerAccessToken,
    productId: Number(productId),
  };
}

function redirectToLogin() {
  const loginUrl = document.getElementById('login-url')?.value;
  if (!loginUrl) return;

  window.location = loginUrl + window.location.href;
}

/**
 * Add or remove product from wishlist.
 * @param {string} productId - Product ID to add to wishlist.
 * @param {bool} add - True for add and false for remove.
 */
async function addOrRemoveWishlist(productId, add) {
  try {
    if (productId) {
      if (await validateCustomerAccessToken()) {
        const input = buildWishlistInput(productId);

        if (add) {
          await client.wishlist.add(input);
          await updateProductsInWishlist();
          return true;
        } else {
          await client.wishlist.remove(input);
          await wishlistLoad();
          return true;
        }
      } else {
        redirectToLogin();
        return false;
      }
    }
  } catch (error) {
    console.log(error);
    if (add) {
      return false;
    } else {
      return false;
    }
  }
}
