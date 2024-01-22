/**
 * Sends the configured newsletter from the provided informtation on page
 */
async function newsletterSubmit(e) {
  e.preventDefault();

  const nameElement = document.getElementById('newsletter-form-name');
  const emailElement = document.getElementById('newsletter-form-email');

  const input = {
    name: 'Cliente',
    email: emailElement.value,
  };

  await client.newsletter.create(input);

  showNewsletterAlert('Cadastro realizado com sucesso!');
  nameElement.value = '';
  emailElement.value = '';
}

function showNewsletterAlert(message) {
  const alertElement = document.getElementById('alert-newsletter');
  alertElement.textContent = message;
}
