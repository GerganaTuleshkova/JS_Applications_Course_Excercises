let userLinks = Array.from(document.querySelectorAll('nav ul li')).slice(0, 3);
let guestLinks = Array.from(document.querySelectorAll('nav ul li')).slice(3, 5);



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