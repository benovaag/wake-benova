//Componente de cep ============================================================
document.addEventListener('DOMContentLoaded', function () {
  var campo = document.getElementById('cep');
  campo.addEventListener('input', function () {
    var valor = this.value.replace(/\D/g, '').trim();
    this.value = valor.substr(0, 5) + '-' + valor.substr(5);
  });
});

async function exibeFrete() {
  //Adiciona HTML INICIAL
  document.body.insertAdjacentHTML(
    'beforeend',
    `

      <style type="text/css">
      .dados-frete {
          background: #FFF;
          border-radius: 5px;
          margin: 30px 0 0 0;
          transition: all .3s;
      }
      .dados-frete__item {
          display: grid;
          grid-template-columns: 1fr 90px 90px;
          grid-gap: 20px;
          margin: 5px 0;
          font-size: 13px;
          padding: 5px;
      }
      .dados-frete > ul:nth-child(even) {
          background: #eee;
      }
      .dados-frete__destaque {
          font-weight: 600;
      }
      .botao-fechar {
          margin: 30px 0 0 0;
          display: grid;
          grid-template-columns: 200px;
          justify-content: center;
      }
      .botao-fechar_item {
        background: #f6720e;
        color: #fff;
        border: 0;
        height: 40px;
        line-height: 35px;
        font-weight: 600;
        border-radius: 5px;
        cursor: pointer;
        font-family: inherit;
        font-size: 14px;
        letter-spacing: 1px;
      }
      @media(max-width: 700px) {
          .dados-frete {
              width: 100%;
          }
      }
      </style>

  `,
  );

  document.querySelector('.product').addEventListener('click', async (e) => {
    if (e.target?.classList.contains('product-cep__button')) {
      e.preventDefault();
      let varianteId = document.querySelector('.product-buy')?.value;

      //Verifica se falta selecionar uma variante
      if (varianteId == '') {
        alert('Por favor, selecione a variação desejada.');
        return;
      }

      let cep = document.querySelector('#cep')?.value;

      let resultado = await buscaFrete(cep, varianteId);

      if (resultado?.errors) {
        alert('Nenhum resultado encontado para esse CEP.');
        return;
      }

      adicionaFrete(resultado?.data?.shippingQuotes);
    }
  });
}

function adicionaFrete(lista) {
  let $modalFrete = document.querySelector('.dados-frete');
  $modalFrete.innerHTML = '';

  $modalFrete.insertAdjacentHTML(
    'beforeend',
    `
      <ul class="dados-frete__item dados-frete__destaque">
          <li>Transportadora</li>
          <li>Entrega</li>
          <li>Preço</li>
      </ul>
  `,
  );

  lista.forEach((item) => {
    $modalFrete.insertAdjacentHTML(
      'beforeend',
      `
          <ul class="dados-frete__item">
              <li>${item.name}</li>
              <li>${item.deadline} dia(s)</li>
              <li>${item.value.toLocaleString('pt-br', {
                style: 'currency',
                currency: 'BRL',
              })}</li>
          </ul>
      `,
    );
  });
}

async function buscaFrete(cep, varianteId) {
  let requisicao = await fetch('https://storefront-api.fbits.net/graphql', {
    headers: {
      'content-type': 'application/json',
      'tcs-access-token': 'tcs_curip_92c58fca55f44e1da2f05058f2da993b',
    },
    body:
      '{"operationName":"shippingQuotes","variables":{"cep":"' +
      cep +
      '","productVariantId":' +
      varianteId +
      '},"query":"query shippingQuotes($cep: CEP, $productVariantId: Long) {\\n  shippingQuotes(cep: $cep, productVariantId: $productVariantId) {\\n    name\\n    shippingQuoteId\\n    deadline\\n    type\\n    value\\n  }\\n}\\n"}',
    method: 'POST',
    mode: 'cors',
    credentials: 'omit',
  });
  return requisicao.json();
}

exibeFrete();
