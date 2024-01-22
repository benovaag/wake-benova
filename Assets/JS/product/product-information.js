var addActive = function () {
  // Seleciona todas as <li>
  const liList = document.querySelectorAll('.informations-items__item');

  // Seleciona a primeira <li> visível que não contém o texto "tabela de medidas" e tem o maior valor negativo de "order"
  let maxNegativeOrder = Infinity;
  let maxNegativeOrderLi = null;
  for (let i = 0; i < liList.length; i++) {
    const li = liList[i];
    const order = parseFloat(
      window.getComputedStyle(li).getPropertyValue('order'),
    );
    if (order < maxNegativeOrder && li.getBoundingClientRect().top >= 0) {
      maxNegativeOrder = order;
      maxNegativeOrderLi = li;
    }
  }

  // Adiciona a classe na primeira <li> visível e também na descrição referente
  if (maxNegativeOrderLi) {
    // Ativa o titulo
    maxNegativeOrderLi.classList.add('informations-items__active');
    // Ativa a descrição
    document
      .querySelector(
        `${maxNegativeOrderLi.querySelector('a').getAttribute('href')}`,
      )
      ?.classList.add('descriptions-text__active');
  }
};

window.addEventListener('load', function () {
  if (window.innerWidth > 1025) {
    addActive();
  }
});

document.querySelectorAll('.informations-items__item')?.forEach((item) => {
  item.addEventListener('click', (e) => {
    e.preventDefault();

    let id = item.querySelector('a').getAttribute('href');

    if (window.innerWidth > 1025) {
      // //Remove a classe de item ativo de algum outro item da descrição
      document
        .querySelector('.descriptions-text__active')
        ?.classList.remove('descriptions-text__active');

      // //Remove a classe de item ativo de algum outro item do menu
      document
        .querySelector('.informations-items__active')
        ?.classList.remove('informations-items__active');

      // //Ativa o item na descrição
      document
        .querySelector(`${id}`)
        ?.classList.add('descriptions-text__active');

      // //Ativa o item no menu
      item.classList.add('informations-items__active');
    } else {
      // Exibe ou oculta titulo e descrição
      document
        .querySelector(`${id}`)
        ?.classList.toggle('descriptions-text__active');
      item.classList.toggle('informations-items__active');
    }
  });
});

$(document).ready(function () {
  if ($(window).width() < 1026) {
    $('.informations-items__title').each((indice, item) => {
      let code = $(item).attr('href');

      $(code).appendTo($(item).parent());
    });
  }
});

function exibeMedidas() {
  if (document.querySelector('.modal-medidas') == null) {
    document.querySelectorAll('.informations-items__title').forEach((item) => {
      if (
        item.innerText.toLowerCase().trim().indexOf('tabela de medidas') >= 0
      ) {
        let idConteudo = item.getAttribute('href');
        let conteudo = document.querySelector(idConteudo);

        let modal_medidas = document.createElement('section');
        modal_medidas.classList.add('modal-medidas');
        modal_medidas.classList.add('modal-medidas--exibe');
        let botao = document.createElement('button');
        botao.classList.add('fechar-medidas');
        botao.innerHTML = 'Fechar';
        botao.setAttribute(
          'onclick',
          'document.querySelector(".modal-medidas").classList.remove("modal-medidas--exibe");',
        );
        modal_medidas.appendChild(botao);
        modal_medidas.appendChild(conteudo.cloneNode(true));
        document.body.appendChild(modal_medidas);
      }
    });
  } else {
    document
      .querySelector('.modal-medidas')
      .classList.add('modal-medidas--exibe');
  }
}
