let userLinks = document.querySelector('.user');
let guestLinks =  document.querySelector('.guest');



export function updateNav(ctx, next) {
   
    // update nav bas based on logged user or guest    

    if(ctx.user) {
        userLinks.style.display = 'inline-block';
        guestLinks.style.display = 'none';
    } else {
        userLinks.style.display = 'none';
        guestLinks.style.display = 'inline-block';
    }
    next();
}