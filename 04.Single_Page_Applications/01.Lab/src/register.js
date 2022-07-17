import { showHome } from "./home.js";
import { checkUserNav } from "./util.js";

const registerSection = document.getElementById('registerView');
let form = registerSection.querySelector('form');
form.addEventListener('submit', onRegister);
registerSection.remove();

export function showRegister() {
    document.querySelector('main').replaceChildren(registerSection);
}

async function onRegister(event) {
    event.preventDefault();
    let formData = new FormData(form);

    let email = formData.get('email').trim();
    let password = formData.get('password').trim();
    let repass = formData.get('repass').trim();

    try {

        if (email == '' || password == '') {
            throw new Error('All fields are required')
        }

        if (password != repass) {
            throw new Error('Passwords don\'t match')
        }

        let response = await fetch('http://localhost:3030/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
            }),
        });

        if (response.ok == false) {
            let error = await response.json();
            throw new Error(error.message)
        }

        let { accessToken, _id } = response.json();

        let userData = {
            email,
            accessToken,
            id: _id,
        }

        sessionStorage.setItem('userData', JSON.stringify(userData));
        checkUserNav();
        showHome();

    } catch (error) {
        alert(error.message)
    }
}