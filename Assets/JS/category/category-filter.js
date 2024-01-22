// Ordena o filtro tamanhos em ordem crescente
const itemList = document.querySelector('.filter-items');
const items = itemList?.getElementsByClassName('filter-items__item')
  ? Array.from(itemList?.getElementsByClassName('filter-items__item'))
  : null;

items?.sort((a, b) => {
  const valueA = parseInt(a.querySelector('label').getAttribute('for'));
  const valueB = parseInt(b.querySelector('label').getAttribute('for'));
  return valueA - valueB;
});

items?.forEach((item) => itemList.appendChild(item));

//Filter
window?.addEventListener('load', filterSetCurrent, false);

function filterSetCurrent() {
  const filterQueryStringValue = queryStringParams.getAll('filtro');
  if (filterQueryStringValue.length > 0) {
    filterQueryStringValue.forEach((element) => {
      const container = document.querySelector(
        'input[value="' + element + '"]',
      );
      if (container) {
        container.checked = true;
      }
    });
  }

  const priceFilterQueryStringValue = queryStringParams.getAll('precoPor');
  if (priceFilterQueryStringValue.length > 0) {
    priceFilterQueryStringValue.forEach((price) => {
      const minPriceFilter = document.getElementById('minimum-price-filter');
      const maxPriceFilter = document.getElementById('maximum-price-filter');

      if (minPriceFilter !== null && maxPriceFilter !== null) {
        const splitedPrice = price.split(';');
        minPriceFilter.value = splitedPrice[0];
        maxPriceFilter.value = splitedPrice[1];
      } else {
        const elementId = price.replace(';', '-');
        const elementFilter = document.getElementById(elementId);
        if (elementFilter !== null) {
          elementFilter.checked = true;
        }
      }
    });
  }
}

function setFilter(filterId) {
  const filterQueryStringValue = queryStringParams.getAll('filtro');
  if (filterQueryStringValue.includes(filterId)) {
    if (filterQueryStringValue.length == 1) {
      queryStringParams.delete('filtro');
    } else {
      const index = filterQueryStringValue.indexOf(filterId);
      filterQueryStringValue.splice(index, 1);
      queryStringParams.set('filtro', filterQueryStringValue);
    }
  } else {
    queryStringParams.append('filtro', filterId);
  }

  queryStringParams.delete('pagina');
  queryStringParams.set('pagina', 1);
  window.location.search = queryStringParams.toString();
}

function clearFilters() {
  queryStringParams.delete('filtro');
  queryStringParams.delete('precoPor');
  queryStringParams.delete('pagina');
  queryStringParams.set('pagina', 1);
  window.location.search = queryStringParams.toString();
}

function setFieldPriceFilter() {
  const minPrice = document.getElementById('minimum-price-filter').value;
  const maxPrice = document.getElementById('maximum-price-filter').value;
  const filter = minPrice + ';' + maxPrice;
  applyPriceFilterUrl(filter);
}

function setRangePriceFilter(filterId) {
  const filterIsChecked = document.getElementById(filterId).checked;

  if (filterIsChecked) {
    const splitedPrice = filterId.split('-');
    const minPrice = splitedPrice[0];
    const maxPrice = splitedPrice[1];
    const filter = minPrice + ';' + maxPrice;
    applyPriceFilterUrl(filter);
  } else {
    queryStringParams.delete('precoPor');
    queryStringParams.delete('pagina');
    queryStringParams.set('pagina', 1);
    window.location.search = queryStringParams.toString();
  }
}

function applyPriceFilterUrl(filter) {
  const filterQueryStringValue = queryStringParams.getAll('precoPor');
  if (filterQueryStringValue.length == 1) {
    queryStringParams.delete('precoPor');
  }

  queryStringParams.set('precoPor', filter);
  queryStringParams.delete('pagina');
  queryStringParams.set('pagina', 1);
  window.location.search = queryStringParams.toString();
}

// filtro mobile
document
  .querySelector('.category-filter__button')
  ?.addEventListener('click', () => {
    const filterClick = document.querySelector('.category-items');
    filterClick.classList.add('open-filter');

    // Adicionar ou remover uma classe do botão
    const categoryButton = document.querySelector('.category-filter__button');
    categoryButton.classList.add('active-button');
  });

document
  .querySelector('.category-filter__button-close')
  ?.addEventListener('click', () => {
    const filterClick = document.querySelector('.category-items');
    filterClick.classList.remove('open-filter');

    // Adicionar ou remover uma classe do botão
    const categoryButton = document.querySelector(
      '.category-filter__button-close',
    );
    categoryButton.classList.remove('active-button');
  });

// Filtro - Veja mais e Veja menos
document.addEventListener('DOMContentLoaded', function () {
  const filterCombos = document.querySelectorAll('.filter-combo');

  filterCombos.forEach(function (combo) {
    const itemList = combo.querySelector('.filter-items');
    const verMaisBtn = combo.querySelector('#verMaisBtn');

    const items = itemList.querySelectorAll('.filter-items__item');

    const itemsParaExibir = 5;
    let mostrandoTodos = false;

    function toggleItens() {
      for (let i = 0; i < items.length; i++) {
        if (!mostrandoTodos && i >= itemsParaExibir) {
          items[i].style.display = 'none';
        } else {
          items[i].style.display = 'flex';
        }
      }

      verMaisBtn.textContent = mostrandoTodos ? '- Ver menos' : '+ Veja mais';
      mostrandoTodos = !mostrandoTodos;
    }

    if (items.length > itemsParaExibir) {
      verMaisBtn.style.display = 'flex';
    }

    toggleItens();

    verMaisBtn.addEventListener('click', toggleItens);
  });
});
