function calculaDatas(dataPublicacao) {
  let dataAtual = new Date();
  let diferencaDiasTotais = Math.ceil(
    Math.abs(dataPublicacao - dataAtual) / (1000 * 60 * 60 * 24)
  );
  let anos = Math.floor(diferencaDiasTotais / 365.25);
  let remainingdiasMes = Math.floor(diferencaDiasTotais - anos * 365.25);
  let meses = Math.floor((remainingdiasMes / 365.25) * 12);
  let diasMes = Math.ceil(
    diferencaDiasTotais - (anos * 365.25 + (meses / 12) * 365.25)
  );

  return {
    anos: anos,
    meses: meses,
    diasMes: diasMes,
  };
}

function exibeData() {
  document.querySelectorAll(".reviews-client__time").forEach((item) => {
    let dataPublicacao = new Date(item.innerHTML.trim());
    let resultado = calculaDatas(dataPublicacao);

    let mensagem;

    if (resultado.anos > 0) {
      mensagem = `${resultado.anos} ano${resultado.anos == 0 ? "" : "s"} atrás`;
    } else if (resultado.anos > 0 && resultado.meses > 0) {
      mensagem = `${resultado.anos} ano${resultado.anos == 0 ? "" : "s"} e ${
        resultado.meses
      } ${resultado.meses == 0 ? "mês" : "meses"} atrás`;
    } else if (resultado.meses > 0 && resultado.anos < 1) {
      mensagem = `Há ${resultado.meses} ${
        resultado.meses == 0 ? "mês" : "meses"
      }`;
    } else if (
      resultado.diasMes > 0 &&
      resultado.anos < 1 &&
      resultado.meses < 1
    ) {
      mensagem = `${resultado.diasMes} dia${
        resultado.diasMes == 0 ? "" : "s"
      } atrás`;
    }

    item.innerHTML = mensagem;
  });
}

exibeData();
