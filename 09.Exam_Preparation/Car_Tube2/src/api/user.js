import { clearUserData, setUserData } from "../util.js";
import * as api from "./api.js";


const endpoints = {
    login: '/users/login',
    register: '/users/register',
    logout: '/users/logout',
}

export async function login(username, password) {
    let user = await api.post(endpoints.login, { username, password });
    setUserData(user);
    return user;

}

export async function register(username, password) {
    let user = await api.post(endpoints.register, { username, password });
    setUserData(user);
    return user;
}

export function logout() {
    api.get(endpoints.logout);
    clearUserData();
}
