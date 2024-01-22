window.addEventListener("DOMContentLoaded", function() {
  document.querySelector(".product.content").addEventListener("click", function(e) {
    if (e.target.classList.contains("avise-me__button")) {
      e.preventDefault();

      var nome = document.querySelector(".avise-me__nome")?.value;
      var email = document.querySelector(".avise-me__email")?.value;
      var variante = parseInt(document.querySelector("#Product-variant-id")?.value);
      var msg = document.querySelector(".avise-me__msg");

      if (nome.length > 1 && email.length >= 8 && email.indexOf("@") >= 0) {
        msg.innerHTML = "<b style='color: #37bc9b'>Tudo certo!</b> <br> Você será avisado quando o produto voltar em estoque.";
        client.product.createRestockAlert({
          name: nome,
          email: email,
          productVariantId: variante
        }).then(function() {
        }).catch(function(error) {
          console.log(error);
        });
      } else {
        msg.innerHTML = "<b style='color: red'>Cadastro não realizado!</b> <br> Verifique os campos e tente novamente.";
      }
    }
  });
});