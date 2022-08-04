let userLinks = Array.from(document.querySelectorAll('nav ul li')).slice(4, 6);
let guestLinks = Array.from(document.querySelectorAll('nav ul li')).slice(2, 4);



export function updateNav(ctx, next) {
    
    if (ctx.user) {
        userLinks.map(l => l.style.display = 'inline-block');
        guestLinks.map(l => l.style.display = 'none');
    } else {
        userLinks.map(l => l.style.display = 'none');
        guestLinks.map(l => l.style.display = 'inline-block');
    }
    next();
}