/**
 * Global variable to simplify the manipulation of query string parameters
 */
const queryStringParams = new URLSearchParams(window.location.search);

/**
 * Replaces the content of a given element with the passed html parameter.
 * @param {string} html - The content that will replace the element's inner html
 * @param {Element} div - The div element to replace content
 */
function setInnerHtml(html, div) {
  if (div == null || html === undefined) return;
  div.innerHTML = html;
}

/**
 * Replaces the content of a given element with the passed html parameter.
 * @param {string} html - The content that will replace the element's inner html
 * @param {string} id - The id used to search for the element in the document
 */
function setInnerHtmlById(html, id) {
  if (id == null) return;
  const div = document.getElementById(id);
  setInnerHtml(html, div);
}
