document
  .querySelector('.institutional-button')
  ?.addEventListener('click', () => {
    const filterClick = document.querySelector('.institutional-menu__items');
    filterClick.classList.toggle('active');

    // Adicionar ou remover uma classe do botão
    const categoryButton = document.querySelector('.institutional-button');
    categoryButton.classList.toggle('active');
  });

// Ativar menu correspondendo a página
const currentPath = window.location.pathname;
const links = document.querySelectorAll('.institutional-menu__href');

links.forEach((link) => {
  if (link.getAttribute('href') === currentPath) {
    link.classList.add('active');
  }
});
