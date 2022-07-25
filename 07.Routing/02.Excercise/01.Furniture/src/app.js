import page from '../../node_modules/page/page.mjs';
import { render as litRender } from '../../node_modules/lit-html/lit-html.js';
import { homeView } from './views/home.js';
import { detailsView } from './views/details.js';
import { loginView } from './views/login.js';
import { registerView } from './views/register.js';
import { createView } from './views/create.js';
import { showLogout } from './views/logout.js';
import { editView } from './views/edit.js';
import { deleteView } from './views/delete.js';
import { myPublicationsView } from './views/myFurniture.js';
import { checkUserNav, getUserData } from './views/utils.js';


const container = document.querySelector('.container');

page(decorateContext);

page('/index.html', '/');
page('/', homeView);
page('/myFurniture', myPublicationsView);
page('/catalog/:productId', detailsView);
page('/create', createView);
page('/edit/:productId', editView);
page('/delete/:productId', deleteView);
page('/login', loginView);
page('/register', registerView);
page('/logout', showLogout);
page('*', notFound);


page.start();

function render(templateResult) {
    litRender(templateResult, container);
}

function decorateContext(ctx, next) {
    ctx.render = render;
    ctx.checkUser = checkUserNav;
    ctx.userData = getUserData;
    next();
}

function notFound(ctx) {
    ctx.render('404 Not Found');
}
