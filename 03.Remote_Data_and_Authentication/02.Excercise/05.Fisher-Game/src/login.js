// import { checkUser } from './app.js';
// import { checkUser } from './utils'
// checkUser()

// checkUser();

let navSpan = document.querySelector('nav span');
let submitButton = document.querySelector('button');

submitButton.addEventListener('click', login);
let form = document.querySelector('form');

async function login(event) {
    event.preventDefault();
    
    const formData = new FormData(form);

    const email = formData.get('email');
    const password = formData.get('password');

    try {
        if (email == '' || password == '') {
            throw new Error('All fields are required');
        }

        const response = await fetch('http://localhost:3030/users/login', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',                
            },
            body: JSON.stringify({
                email,
                password,
            })
        });

        if (response.ok == false) {
            const error = await response.json();
            throw new Error(error.message);
        }

        const data = await response.json();

        sessionStorage.setItem('accessToken', data.accessToken);
        sessionStorage.setItem('email', email);
        sessionStorage.setItem('_id', data._id);

        navSpan.textContent = email;

        window.location = '/src';
        

    } catch(err) {
        alert(err.message)
    }
}

// function checkUser() {
//     const token = sessionStorage.getItem('accessToken');

//     if (token != null) {
//         document.getElementById('user').style.display = 'inline-block';
//         document.getElementById('guest').style.display = 'none';
//         navSpan.textContent = email;        
//     } else {
//         document.getElementById('user').style.display = 'none';
//         document.getElementById('guest').style.display = 'inline-block';
//     }
// }