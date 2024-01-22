let checkoutUrl = '';
let alertDiv = '';

async function SelectAttribute(element) {
  const attrId = element.id.split('__')[0];
  const productId = element.id.split('__')[2];
  let attributeList = GetSelectedAttributes(attrId, element.value, productId);
  await RenderAttributes(attributeList, productId);
}

function GetSelectedAttributes(
  selectedAttributeId,
  selectedAttributeValue,
  productId,
) {
  let attributeList = [];
  let attr = new Object();
  attr.attributeId = Number(selectedAttributeId);
  attr.value = selectedAttributeValue;
  attributeList.push(attr);

  const selectedAttributes = document.querySelectorAll(
    `[id^="hidden-selected-attribute-${productId}-"]`,
  );
  if (selectedAttributes) {
    selectedAttributes.forEach((element) => {
      const splittedId = element.id.split('-');
      const attributeId = splittedId[splittedId.length - 1];
      if (attributeId != selectedAttributeId) {
        attr = new Object();
        attr.attributeId = Number(attributeId);
        attr.value = element.value;
        attributeList.push(attr);
      }
    });
  }

  return attributeList;
}

async function RenderAttributes(attributeList, productId) {
  const variables = {
    productId: Number(productId),
    selections: attributeList,
  };
  const elementId = `product-view__${productId}`;
  const response = await client.snippet.render(
    'product_view_snippet.html',
    'product.graphql',
    variables,
  );
  document.getElementById(elementId).innerHTML = response;
}

async function addToCartClick(productVariantId) {
  if (productVariantId != '') {
    const input = getAttributeProductAndQuantity(productVariantId);
    const success = await addOrCreateCheckout(input);
    if (success) {
      alertSuccess();
      await loadMiniCart();
    }
  } else {
    alert('Por favor, selecione a variante desejada.');
  }
}

async function buyClick(productVariantId) {
  if (productVariantId != '') {
    const input = getAttributeProductAndQuantity(productVariantId);
    const success = await addOrCreateCheckout(input);
    if (success && checkoutUrl != '') {
      window.location = checkoutUrl;
    }
  } else {
    alert('Por favor, selecione a variante desejada.');
  }
}

function getAttributeProductAndQuantity(variantId) {
  let input = null;
  const quantity = getQuantity();

  if (quantity > 1) {
    let products = [];
    products.push({
      productVariantId: Number(variantId),
      quantity: quantity,
    });
    input = products;
  } else {
    input = Number(variantId);
  }

  return input;
}

function getQuantity() {
  const selectedQuantity = document.getElementById('product-quantity__input');
  const quantityValue = selectedQuantity.value;
  const maxValue = selectedQuantity.getAttribute('max');
  const quantity = Number(quantityValue);
  const max = Number(maxValue);

  if (quantity < 1) {
    return 1;
  }
  if (quantity > max) {
    return max;
  }
  return quantity;
}

async function addOrCreateCheckout(input) {
  try {
    alertDiv = document.getElementById('add-cart-alert');
    const checkout = await client.checkout.get();

    if (checkout && checkout.data.checkoutId) {
      const checkoutResponse = await client.checkout.add(input);
      if (checkoutUrl == '') {
        checkoutUrl = checkoutResponse.data.url;
      }
    } else {
      const checkoutResponse = await client.checkout.create(input);
      checkoutUrl = checkoutResponse.data.url;
    }

    return true;
  } catch (error) {
    alertFail();
    console.log(error);
    return false;
  }
}

async function addToCartMatrixClick() {
  const input = getMatrixProductsAndQuantities();
  const success = await addOrCreateCheckout(input);
  if (success) {
    alertSuccess();
    await loadMiniCart();
  }
}

async function buyMatrixClick() {
  const input = getMatrixProductsAndQuantities();
  const success = await addOrCreateCheckout(input);
  if (success && checkoutUrl != '') {
    window.location = checkoutUrl;
  }
}

function getMatrixProductsAndQuantities() {
  let returnList = [];
  const allInputNumbers = document.querySelectorAll('[id^="matrix-number-"]');

  allInputNumbers.forEach((element) => {
    if (element.value && element.value > 0) {
      returnList.push({
        productVariantId: Number(element.getAttribute('product-variant-id')),
        quantity: Number(element.value),
      });
    }
  });

  return returnList;
}

/**
 * Builds the object for adding the product to the cart.
 * @param {HTMLElement} rowDiv - HTML row div element.
 * @param {object[]} input - Object to add the product to the cart.
 */
function pushProductInput(rowDiv, input) {
  let hasProduct = false;

  const elements = rowDiv.querySelectorAll(
    'input[product-variant-id][type=number]',
  );
  if (elements) {
    for (const element of elements) {
      const variantId = element.getAttribute('product-variant-id');
      const quantity = element.value;
      if (quantity > 0 && variantId > 0) {
        input.push({
          productVariantId: Number(variantId),
          quantity: Number(quantity),
        });

        hasProduct = true;
      }
    }
  }

  return hasProduct;
}

function hideAlertDiv() {
  alertDiv.style.visibility = 'hidden';
  alertDiv.innerHTML = '';
}

function alertSuccess() {
  alertDiv.innerHTML = `
    <div class="add-cart-alert" id="add-cart-alert">

    <div class="product-modal" role="alert"> 
    <b class="cart-message">Produto adicionado ao carrinho!</b>
    
    <button class="btn-concluded" onclick="window.location.href = 'https://checkout.benova.com.br'">Finalizar compra</button>
    <button class="btn-continue" onclick="hideAlertDiv()">Continuar comprando</button>
    </div>
    
    </div>
    `;
  alertDiv.style.visibility = 'visible';
}

function alertFail() {
  alertDiv.innerHTML =
    '<div class="alert alert-danger container col-2" role="alert" style="position: fixed; text-align: center; margin-bottom: auto; z-index: 1;"> Erro ao adicionar produto ao carrinho </div>';
  alertDiv.style.visibility = 'visible';
  setTimeout(hideAlertDiv, 2000);
}

/**
 * Calls the quantity validation function and and calls the function that enables or disables the buy and add to cart buttons.
 * @param {HTMLElement} rowDiv - HTML row div element.
 */
function setButtonsEnabledByAvailability(rowDiv) {
  const available = validateAvailability(rowDiv);
  setDisabledBuyButtons(rowDiv, !available);
}

/**
 * Validates that the selected quantity of the product is sufficient to enable the buy and add to cart buttons.
 * @param {HTMLElement} rowDiv - HTML row div element.
 */
function validateAvailability(rowDiv) {
  const productDivs = rowDiv.querySelectorAll('[product-view-div]');
  return Array.from(productDivs).every((div) => {
    const elements = div.querySelectorAll('[product-available]');
    if (elements.length > 0)
      return Array.from(elements).every((x) => x.value == 'true');
    const quantityInputs = rowDiv.querySelectorAll('[matrix-input-quantity]');
    const nonEmpty = Array.from(quantityInputs).filter((x) => x.value != '');
    return Array.from(nonEmpty).some((x) => Number(x.value) > 0);
  });
}

/**
 * Enable or disable buy and add to cart buttons.
 * @param {HTMLElement} rowDiv - HTML row div element.
 * @param {bool} disabled - True to disable and false to enable.
 */
function setDisabledBuyButtons(rowDiv, disabled) {
  rowDiv.querySelector('[add-to-cart-button]').disabled = disabled;
}

/**
 * Function for when quantity is changed in matrix attributes.
 * @param {HTMLElement} element - Input type number from matrix.
 */
function productMatrixOnChange(element) {
  const row = element.closest('[product-view-row]');
  setButtonsEnabledByAvailability(row);
}

/**
 * Gets the current buy together row and adds it to a checkout.
 * the operation uses scope context to search only in the contained div
 * for data attributes, since there could be repetition of ids in the page,
 * we avoid using getElementById.
 * @param {HTMLInputElement} element - The button originating the operation, for context.
 * @param {string} attrName - Name of the attribute to search and fetch the div.
 */
async function checkoutOperations(element, attrName) {
  const input = [];
  const div = element.closest('[' + attrName + ']');
  const pushedProducts = pushProductInput(div, input);

  if (pushedProducts) {
    const success = await addOrCreateCheckout(input);
    return success;
  }

  return false;
}
