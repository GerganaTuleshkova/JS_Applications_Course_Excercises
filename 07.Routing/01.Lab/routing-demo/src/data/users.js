import { post } from './api.js';

const endpoints = {
    login: '/users/login',
    register: '/users/register',
};

export async function login(email, password) {

    if (email == '' || password == '') {
        return alert('All fields are required');
    }
    const data = await post(endpoints.login, { email, password });

    const userData = {
        id: data._id,
        email: data.email,
        accessToken: data.accessToken,
    };
    sessionStorage.setItem('userData', JSON.stringify(userData));
}

export async function register(email, password, repass) {

    if (email == '' || password == '') {
        return alert('All fields are required');
    }

    if (password != repass) {
        return alert('Passwords don\'t match');
    }

    const data = await post(endpoints.register, { email, password });

    const userData = {
        id: data._id,
        email: data.email,
        accessToken: data.accessToken,
    };
    
    sessionStorage.setItem('userData', JSON.stringify(userData));
}