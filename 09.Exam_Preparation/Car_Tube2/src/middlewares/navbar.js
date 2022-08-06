let userLinks = document.getElementById('profile');
let guestLinks =  document.getElementById('guest');

// let links = {
//     '/catalog': document.getElementById('catalogLink'),
//     '/create': document.getElementById('createLink'),
//     '/login':  document.getElementById('loginLink'),
//     '/register':  document.getElementById('registerLink')
// }

export function updateNav(ctx, next) {
    
    // update nav bas based on logged user or guest

    

    if(ctx.user) {
        userLinks.style.display = 'inline-block';
        guestLinks.style.display = 'none';
        userLinks.querySelector('a').textContent = `Welcome ${ctx.user.username}`
    } else {
        userLinks.style.display = 'none';
        guestLinks.style.display = 'inline-block';
    }
    next();
}