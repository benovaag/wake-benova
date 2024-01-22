const ulTag = document.querySelector(".pagination ul");

// Definir o número total de páginas
  const totalPages_ = parseInt(document.querySelector('.totalpages').innerHTML);

  // Página atual
  let pageCurrent_ = new URLSearchParams(window.location.search).get("pagina");

  if(pageCurrent_) {
      pageCurrent_ = parseInt(pageCurrent_)
  } else {
      pageCurrent_ = 1;
  }

  // Tamanho da página - se não existir o parametro tamanho na URL, adiciona
  let size = new URLSearchParams(window.location.search).get("tamanho");

  if (!size) {
    size = 24;
    let searchParams = new URLSearchParams(window.location.search);
    searchParams.append("tamanho", size);
    window.history.replaceState({}, "", `${window.location.pathname}?${searchParams.toString()}`);
  } else {
    size = parseInt(size);
  }

  function pagination(totalPages, page) {
      let liTag = "";
      let beforePage = page - 1; //4
      let afterPage = page + 1; //5
      let activeLi = "";
      let totalP = totalPages;

    // Adiciona ou atualiza o pamametro "pagina" na URL
    let searchParams = new URLSearchParams(window.location.search);

    if (!searchParams.has("pagina")) {
      searchParams.append("pagina", page);
      window.history.replaceState({}, "", `${window.location.pathname}?${searchParams.toString()}`);
    } else {
      let pageParam = parseInt(searchParams.get("pagina"));
      if (pageParam !== page) {
        searchParams.set("pagina", page);
        window.location.href = `${window.location.pathname}?${searchParams.toString()}`;
      }
    }

      // Se a página é maior do que 1 irá mostrar o botão prev
      if (page > 1) {
          liTag += `<li class="pagination-item prev"onClick="pagination(${totalP}, ${page - 1})">
                    <
                </li>`;
      }

      // Adiciona a página 1 se houver mais de 2 páginas
      if (page > 2) {
          liTag += `        <li class="pagination-item " onClick="pagination(${totalPages}, ${1})"><span class="pagination-item__href">1</span></li>
      `;
          //add dots   if there is more than 3 pages

          if (page > 3) {
              liTag += `        <li class="dots"><span>...</span></li>
        `;
          }
      }
      if (page == totalPages) {
          // Estou na última página, quero trazer três páginas antes de mim, e se houver apenas duas antes de mim
          beforePage = beforePage - 2;
      } else if (page == totalPages - 1) {
          beforePage = beforePage - 1;
      }
      if (page == 1) {
          // Estou na última página, quero trazer três páginas antes de mim, e se houver apenas duas antes de mim
          afterPage = afterPage + 2;
      } else if (page == totalPages - 1) {
          afterPage = afterPage + 1;
      }
      // display prev page and current page and after page
      for (let pageNum = beforePage; pageNum <= afterPage; pageNum++) {
          if (pageNum > totalPages) {
              continue;
          }
          if (pageNum == 0) {
              // pageNum = pageNum + 1;
              continue;
          }
          page == pageNum ? (activeLi = "active") : (activeLi = "");
					
        	if(pageNum > 0) { 
          	liTag += `<li class="pagination-item ${activeLi}" onClick="pagination(${totalPages}, ${pageNum})"><span class="pagination-item__href">${pageNum}</span></li>`;
          }
          //4 5 6
      }

      // display next button
      //add page one if there is more than 2 pages
      if (page < totalPages - 1) {
          //add dots   if there is more than 3 pages
          if (page < totalPages - 2) {
              liTag += `<li class="dots"><span>...</span></li>`;
          }
          liTag += `<li class="pagination-item" onClick="pagination(${totalPages}, ${totalPages})"><span class="pagination-item__href">${totalPages}</span></li>`;
      }

      if (page < totalPages) {
          liTag += `<li class="pagination-item next" onClick="pagination(${totalP}, ${page + 1})">
                        >
                    </li>`;
      }

      ulTag.innerHTML = liTag;
  }

  pagination(totalPages_, pageCurrent_)