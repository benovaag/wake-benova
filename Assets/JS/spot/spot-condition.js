// Selecionar todos os elementos com a classe "spot-condition"
var elementos = document.querySelectorAll('.spot-condition');

// Iterar sobre os elementos
elementos.forEach(function (elemento) {
  // Verificar se o conteúdo é "Novo" e adicionar a classe "novo" se for
  if (elemento.textContent === 'Novo') {
    elemento.classList.add('novo');
  }
});
