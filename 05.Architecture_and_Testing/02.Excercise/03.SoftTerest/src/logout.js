
import { showHome } from "./home.js";
import { checkUserNav } from "./util.js";


export function showLogout() {
    // let userData = JSON.parse(sessionStorage.getItem('userData'));
    let userData = JSON.parse(localStorage.getItem('userData'));

    fetch('http://localhost:3030/users/logout', {
        method:'GET',
        headers: {
            'X-Authorization': userData.accessToken,
        },
    })
    // sessionStorage.removeItem('userData');
    localStorage.removeItem('userData');
    checkUserNav();
    showHome();
}