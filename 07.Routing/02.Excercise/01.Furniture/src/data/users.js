import { get, post } from './api.js';

const endpoints = {
    login: '/users/login',
    register: '/users/register',
    logout: '/users/logout',
};

export async function login(email, password) {
    try {
        const data = await post(endpoints.login, { email, password });

        const userData = {
            id: data._id,
            email: data.email,
            accessToken: data.accessToken,
        };
        sessionStorage.setItem('userData', JSON.stringify(userData));
    } catch (error) {
        // alert(error.message)
    }
}

export async function register(email, password, repass) {

    const data = await post(endpoints.register, { email, password });

    const userData = {
        id: data._id,
        email: data.email,
        accessToken: data.accessToken,
    };

    sessionStorage.setItem('userData', JSON.stringify(userData));
}

export async function logout() {

    get(endpoints.logout);
    sessionStorage.removeItem('userData');
}