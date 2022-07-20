import {  post } from "./api.js";
import { showHome } from "./home.js";
import { checkUserNav, createSubmitHandler } from "./util.js";
// import { render } from "./dom.js";

const loginSection = document.getElementById('loginView');
loginSection.remove();
let form = loginSection.querySelector('form');

// form.addEventListener('submit', onSubmit);
createSubmitHandler(form, onSubmit)

export function showLogin(context) {   
    context.render(loginSection);
}

async function onSubmit({email, password}) {

    console.log(email)


    if (email == '' || password == '') {
        return alert('All fields are required');
    }


    let data = await post('/users/login', {email, password});
    
    let userData = {
        email: data.email,
        accessToken: data.accessToken,
        id: data._id,
    }
    console.log(userData)

    sessionStorage.setItem('userData', JSON.stringify(userData));

    console.log(sessionStorage)

    checkUserNav();
    showHome();
};