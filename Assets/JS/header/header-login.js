window.addEventListener('load', getUser, false);
let pegaUsuario = null;

async function getUser() {
  try {
    const USER_LOGIN = await client.user.get();
    if (USER_LOGIN != null) {
      pegaUsuario = USER_LOGIN;

      const userLoggedElements = document.querySelectorAll('.user-logged');
      const userNotLoggedElements =
        document.querySelectorAll('.user-not__logged');
      const userNameElements = document.querySelectorAll('.user-name');

      userLoggedElements.forEach((element) => {
        element.style.display = 'block';
      });

      userNotLoggedElements.forEach((element) => {
        element.style.display = 'none';
      });

      userNameElements.forEach((element) => {
        element.textContent = USER_LOGIN.name.split(' ')[0] + '!';
      });
    } else {
      const userNotLoggedElements =
        document.querySelectorAll('.user-not__logged');

      userNotLoggedElements.forEach((element) => {
        element.style.display = 'block';
      });
    }

    window.dispatchEvent(new Event('userChecked'));
  } catch (error) {
    console.log(error);
  }
}

getUser();

// function loginMouseOver() {
//   document.getElementById('modal-login').classList.add('modal-login__open');
//   document.getElementById('overlay').classList.add('overlay-open');
// }

// function loginMouseOut() {
//   document.getElementById('modal-login').classList.remove('modal-login__open');
//   document.getElementById('overlay').classList.remove('overlay-open');
// }

function callMouseOver() {
  document
    .getElementById('header-icon__wpp')
    .classList.toggle('header-icon__open');
  document.getElementById('header-wpp').classList.toggle('header-wpp__open');
}
