/**
 * Associates a checkout with a partner access token taken from the cookies
 * @param {string} checkoutId - The id of the checkout to be associated
 */
async function checkoutPartnerAssociate(checkoutId) {
  const partnerAccessToken = getCookie('sf_partner_access_token');
  if (partnerAccessToken)
    return await client.checkout.partnerAssociate(
      checkoutId,
      partnerAccessToken,
    );
}

/**
 * If there is a partner access token registered in the cookies, loads a snippet to get a custom logo in the navbar
 */
async function loadPartnerLogo() {
  const partnerAccessToken = getCookie('sf_partner_access_token');
  if (!partnerAccessToken) return;

  const partnerLogo = await client.snippet.render(
    'partner_logo_snippet.html',
    'SnippetQueries/partner_logo.graphql',
    { partnerAccessToken: partnerAccessToken },
  );
  if (partnerLogo) setInnerHtmlById(partnerLogo, 'navbar-logo');
}

/**
 * Returns a given cookie's value
 * @param {string} name - The cookie key
 */
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}
