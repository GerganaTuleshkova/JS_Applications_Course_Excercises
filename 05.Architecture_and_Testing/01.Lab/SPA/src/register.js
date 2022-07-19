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

async function onRegister({email, password, repass}) {
    
    if (email == '' || password == '') {
        return alert('All fields are required');
    }

    if (password != repass) {
        return alert('Passwords don\'t match');
    }

    let { accessToken, _id } =  await post('/users/register', {email, password, repass})

    let userData = {
        email,
        accessToken,
        id: _id,
    }

    sessionStorage.setItem('userData', JSON.stringify(userData));
    checkUserNav();
    showHome();
}

