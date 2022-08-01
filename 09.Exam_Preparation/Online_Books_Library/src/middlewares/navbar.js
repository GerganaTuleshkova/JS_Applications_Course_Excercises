let userLinks = document.getElementById('user');
let guestLinks =  document.getElementById('guest');

// let links = {
//     '/catalog': document.getElementById('catalogLink'),
//     '/create': document.getElementById('createLink'),
//     '/login':  document.getElementById('loginLink'),
//     '/register':  document.getElementById('registerLink')
// }

export function updateNav(ctx, next) {
    // // update style of clicked nav item/link
    // Object.values(links).forEach(l => l.classList.remove('active'));
    // let current = links[ctx.pathname];
    // if(current) {
    //     current.classList.add('active');
    // }


    // update nav bas based on logged user or guest      

    if(ctx.user) {
        userLinks.style.display = 'inline-block';
        guestLinks.style.display = 'none';
        userLinks.querySelector('span').textContent = `Welcome, ${ctx.user.email}`;
    } else {
        userLinks.style.display = 'none';
        guestLinks.style.display = 'inline-block';
    }
    next();
}