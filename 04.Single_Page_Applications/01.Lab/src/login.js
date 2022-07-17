import { showHome } from "./home.js";
import { checkUserNav } from "./util.js";

const loginSection = document.getElementById('loginView');
loginSection.remove();
let form = loginSection.querySelector('form');

form.addEventListener('submit', onSubmit);

export function showLogin() {
    document.querySelector('main').replaceChildren(loginSection);
}

async function onSubmit(event) {
    event.preventDefault();

    let formData = new FormData(form);

    let email = formData.get('email').trim();
    let password = formData.get('password').trim();

    try {
        let response = await fetch('http://localhost:3030/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
            })
        });

        if (response.ok == false) {
            let error = await response.json()
            throw new Error(error.message)
        }

        console.log('Logged')

        let data = await response.json();
        let userData = {
            email: data.email,
            accessToken: data.accessToken,
            id: data._id,
        }

        sessionStorage.setItem('userData', JSON.stringify(userData));
        checkUserNav()
        showHome()

    } catch (error) {
        alert(error.message)
    }
};