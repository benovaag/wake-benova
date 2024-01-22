/* ABAS */

const tabEvaluate = document.getElementById('tab-evaluate');
const tabOpinions = document.getElementById('tab-opinions');

const evaluateContent = document.getElementById('reviews-forms');

tabEvaluate.addEventListener('click', () => {
  tabEvaluate.classList.add('reviews-tab-active');
  tabOpinions.classList.remove('reviews-tab-active');
  evaluateContent.style.display = 'block';

  const opinionsContent = document.getElementById('reviews-client');
  if (opinionsContent) {
    opinionsContent.style.display = 'none';
  }
});

tabOpinions.addEventListener('click', () => {
  tabEvaluate.classList.remove('reviews-tab-active');
  tabOpinions.classList.add('reviews-tab-active');
  evaluateContent.style.display = 'none';

  const opinionsContent = document.getElementById('reviews-client');
  if (opinionsContent) {
    opinionsContent.style.display = 'block';
  }
});
/* ABAS */

/* REVIEWS */
window.addEventListener('userChecked', enableReviewButton, true);
let reviewAlert = '';

/**
 * Sends a product review form.
 */
async function reviewSubmit(e) {
  e.preventDefault();

  const ratingElement = document.getElementById('review-form-rating');
  const textElement = document.getElementById('review-form-text');
  const productVariantIdElement = document.getElementById('product-variant-id');

  const input = {
    review: textElement.value,
    rating: Number(ratingElement.value),
    email: pegaUsuario.email,
    name: pegaUsuario.name,
    productVariantId: Number(productVariantIdElement.value),
  };

  await client.product.createReview(input);
  showReviewAlert('Avaliação enviada com sucesso!');
}

function VerifyPageUser() {
  if (pegaUsuario != null) {
    document.getElementById('review-form-div').style.display = 'block';
    document.getElementById('review-login-div').style.display = 'none';
  } else {
    const loginElement = document.getElementById('review-login-action-div');
    loginElement.href += window.location.href;
  }
}

function showReviewAlert(message) {
  const alertElement = document.getElementById('alert-review');
  alertElement.textContent = message;
}

function enableReviewButton() {
  if (pegaUsuario) {
    document.getElementById('review-form-div').style.display = 'block';
    document.getElementById('review-login-div').style.display = 'none';
  }
}
/* REVIEWS */
