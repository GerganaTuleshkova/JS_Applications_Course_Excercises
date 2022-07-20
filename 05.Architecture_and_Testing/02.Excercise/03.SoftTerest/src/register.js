import { post } from "./api.js";
// import { render } from "./dom.js";
import { showHome } from "./home.js";
import { checkUserNav, createSubmitHandler } from "./util.js";

const registerSection = document.getElementById('registerView');
let form = registerSection.querySelector('form');

// form.addEventListener('submit', onRegister);
createSubmitHandler(form, onRegister)

registerSection.remove();

export function showRegister(context) {
    context.render(registerSection);
}

async function onRegister({email, password, repeatPassword}) {
    
    if (email.length <= 3 || password.length <= 3) {
        return alert('Email and password should contain at leat 3 symbols each');
    }

    if (password != repeatPassword) {
        return alert('Passwords don\'t match');
    }

    let { accessToken, _id } =  await post('/users/register', {email, password, repeatPassword})

    let userData = {
        email,
        accessToken,
        id: _id,
    }
    // sessionStorage.setItem('userData', JSON.stringify(userData));
    // with localStorage instead of session storage
    localStorage.setItem('userData', JSON.stringify(userData));

    checkUserNav();
    showHome();
}
