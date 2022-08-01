import page from '../node_modules/page/page.mjs';

import { updateNav } from './middlewares/navbar.js';
import { preload } from './middlewares/preload.js';
import { decorateContext } from './middlewares/render.js';
import { addSession } from './middlewares/session.js';

import { catalogView } from './views/catalog.js';
import { createView } from './views/create.js';
import { detailsView } from './views/details.js';
import { editView } from './views/edit.js';

import { loginView } from './views/login.js';
import { registerView } from './views/register.js';
import { logout } from './api/user.js';
import { myBooksView } from './views/myBooks.js';


document.getElementById('logoutBtn').addEventListener('click', onLogout);

page(addSession);
page(updateNav);
page(decorateContext);

page('/index.html', '/');
page('/', catalogView);
page('/catalog', catalogView);
page('/catalog/:id', preload, detailsView);
page('/edit/:id', preload, editView);
page('/create', createView);
page('/myBooks', myBooksView);

page('/login', loginView);
page('/register', registerView);

page.start();

async function onLogout() {
    try {
        logout();
        // updateNav();
        page.redirect('/catalog');
    } catch (error) {
        alert(error.message);
    }
}

function notFound(ctx) {
    ctx.render('404 Not Found');
}