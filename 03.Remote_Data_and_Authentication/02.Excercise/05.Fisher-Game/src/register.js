let form = document.querySelector('form');
let submitButton = document.querySelector('button');

submitButton.addEventListener('click', register);

async function register(event) {
    event.preventDefault();

    const formData = new FormData(form);

    const email = formData.get('email');
    const password = formData.get('password');
    const repass = formData.get('rePass');


    try {
        if (email == '' || password == '') {
            throw new Error("All fields are required");
        }

        if ( password != repass) {
            throw new Error('Passwords don\'t match');
        }

        const response = await fetch('http://localhost:3030/users/register', {
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
            const error = await response.json();
            throw new Error(error.message);
        }

        let data = await response.json()

        sessionStorage.setItem('accessToken', data.accessToken);
        sessionStorage.setItem('email', email);
        sessionStorage.setItem('_id', data._id);

        window.location = '/src';

    } catch (err) {
        alert(err.message)
    }
}