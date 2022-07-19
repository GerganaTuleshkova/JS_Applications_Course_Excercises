import { showHome } from "./home.js";

export function checkUserNav() {
    const userData = JSON.parse(sessionStorage.getItem('userData'));

    if (userData != null) {
        document.getElementById('userNav').style.display = 'inline-block';
        document.getElementById('guestNav').style.display = 'none';
        document.getElementById('greeting').textContent = `Welcome ${userData.email}!`;
        
    } else {
        document.getElementById('userNav').style.display = 'none';
        document.getElementById('guestNav').style.display = 'inline-block';
    }
};

export function onLogout() {
    let userData = JSON.parse(sessionStorage.getItem('userData'));

    fetch('http://localhost:3030/users/logout', {
        method:'GET',
        headers: {
            'X-Authorization': userData.accessToken,
        },
    })
    sessionStorage.removeItem('userData');
    checkUserNav();
    showHome();
}

export function createSubmitHandler(form, callback) {
    form.addEventListener('submit', onSubmit)

    function onSubmit(event) {
        event.preventDefault();
        let formData = new FormData(form);
        callback(Object.fromEntries([...formData.entries()]))
    }
}
