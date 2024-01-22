autocomplete(document.getElementById('search-bar'));

function search(e, term) {
  if (e) {
    e.preventDefault();
  }

  let query = term;

  if (!term) {
    query = document.getElementById('search-bar').value;
  }

  let searchPage =
    document.location.protocol +
    '//' +
    document.location.host +
    '/busca?busca=' +
    query;

  document.location.href = searchPage;
  return false;
}

async function renderAutocompleteSnippet(val) {
  if (!val) {
    return false;
  }

  const response = await client.snippet.render(
    'autocomplete_snippet.html',
    'SnippetQueries/autocomplete.graphql',
    {
      query: val,
    },
  );

  replaceAutoComplete(response);
}

function replaceAutoComplete(html) {
  const autocompleteListDiv = document.getElementById('autocomplete-list');
  if (autocompleteListDiv) {
    autocompleteListDiv.innerHTML = html;
  }
}

function delayInput(callback, delay) {
  let timer = 0;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(callback.bind(this, ...args), delay || 0);
  };
}

function autocomplete(inp) {
  let currentFocus;

  inp.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      search(e, null);
    }
  });

  inp.addEventListener(
    'keyup',
    delayInput(async function (e) {
      if (e.keyCode != 40 && e.keyCode != 38 && e.keyCode != 13) {
        currentFocus = -1;
        await renderAutocompleteSnippet(this.value);
      }
    }, 500),
  );

  inp.addEventListener('keydown', function (e) {
    var x = document.getElementById('autocomplete-list');
    if (x) x = x.getElementsByTagName('div');

    if (e.keyCode == 40) {
      currentFocus++;
      addActive(x);
    } else if (e.keyCode == 38) {
      currentFocus--;
      addActive(x);
    } else if (e.keyCode == 13) {
      e.preventDefault();
      if (currentFocus > -1) {
        if (x) {
          const selectedDiv = x[currentFocus];
          if (!selectedDiv.classList.value.includes('product-suggestion')) {
            search(null, selectedDiv.innerHTML.trim());
          } else {
            window.location.href = '/' + selectedDiv.id;
          }
        }
      }
    }
  });

  document.addEventListener('click', function (e) {
    replaceAutoComplete('');
  });

  function addActive(items) {
    if (!items) return false;
    removeActive(items);
    if (currentFocus >= items.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = items.length - 1;
    items[currentFocus].classList.add('autocomplete-active');
  }

  function removeActive(items) {
    for (let i = 0; i < items.length; i++) {
      items[i].classList.remove('autocomplete-active');
    }
  }
}

document
  .getElementById('close-trigger__menu')
  .addEventListener('click', closeMenu);

function closeMenu() {
  document.getElementById('open-mobile').classList.remove('open-mobile');
  document.getElementById('overlay').classList.remove('overlay-open');
}

document
  .getElementById('open-trigger__menu')
  .addEventListener('click', openMenu);

function openMenu() {
  document.getElementById('open-mobile').classList.add('open-mobile');
  document.getElementById('overlay').classList.add('overlay-open');
}

const aberturaEfechamentoSubCategorias = (() => {
  document
    .querySelectorAll('.hasChildren .navigate-item__link')
    .forEach(abreSubmenus);

  function abreSubmenus(item) {
    item.addEventListener('click', function (e) {
      if (window.innerWidth < 1026) {
        e.preventDefault();
        e.stopPropagation();
        const submenu =
          this.closest('.hasChildren').querySelector('.navigate-child');
        const arrow = this.closest('.hasChildren').querySelector(
          '.navigate-item__link',
        );
        if (
          submenu.classList.contains('navigate-container__exibe-subcategoria')
        ) {
          submenu.classList.remove('navigate-container__exibe-subcategoria');
          arrow.classList.remove('arrow-open');
        } else {
          submenu.classList.add('navigate-container__exibe-subcategoria');
          arrow.classList.add('arrow-open');
        }
      }
    });
  }
})();

const aberturaEfechamentoNetos = (() => {
  document
    .querySelectorAll(
      '.navigate-children.hasChildren > a.navigate-children__link',
    )
    .forEach(abreGrandSubmenus);

  function abreGrandSubmenus(item) {
    item.addEventListener('click', function (e) {
      if (window.innerWidth < 1026) {
        e.preventDefault();
        e.stopPropagation();
        this.parentElement
          .querySelector('.navigate-grandchild')
          .classList.toggle('navigate-container__exibe-grandsubcategoria');
        this.classList.toggle('arrow-open');
      }
    });
  }
})();

// todas as categorias
document.addEventListener('DOMContentLoaded', function () {
  var titleElement = document.querySelector('.navigate-categories__title');
  var childElement = document.querySelector('.navigate-categories__child');

  titleElement.addEventListener('click', function () {
    childElement.classList.toggle('show');
  });
});

function opensubMenu(elem, option) {
  //addEventListener on mouse click
  document.addEventListener('click', function (e) {
    //check is the right element clicked
    if (!e.target.matches('.menu-dropdown')) return;
    else {
      //check if element contains active class
      if (!e.target.parentElement.classList.contains('active')) {
        if (option == true) {
          //if option true remove active class from all other accordions
          var elementList = document.querySelectorAll(
            elem + ' .navigate-child',
          );
          Array.prototype.forEach.call(elementList, function (e) {
            e.classList.remove('active');
          });
        }
        //add active class on cliked accordion
        e.target.parentElement.classList.add('active');
      } else {
        //remove active class on cliked accordion
        e.target.parentElement.classList.remove('active');
      }
    }
  });
}

//activate accordion function
opensubMenu('.navigate-container__item', true);
