export function checkUser() {
    const token = sessionStorage.getItem('accessToken');
    const email = sessionStorage.getItem('email');
    let navSpan = document.querySelector('nav span');
    let addButton = document.querySelector('.add');


    if (token != null) {
        document.getElementById('user').style.display = 'inline-block';
        document.getElementById('guest').style.display = 'none';
        navSpan.textContent = email;
        addButton.disabled = false;

    } else {
        document.getElementById('user').style.display = 'none';
        document.getElementById('guest').style.display = 'inline-block';
    }
}

checkUser()
