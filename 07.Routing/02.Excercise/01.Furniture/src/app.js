import page from '../../node_modules/page/page.mjs';
import { render as litRender } from '../../node_modules/lit-html/lit-html.js';
import { showHome } from './views/home.js';
import { showDetails } from './views/details.js';
import { showLogin } from './views/login.js';
import { showRegister } from './views/register.js';
import { showCreate } from './views/create.js';
import { showLogout } from './views/logout.js';
import { showEdit } from './views/edit.js';
import { showDelete } from './views/delete.js';
import { showMyPublications } from './views/myFurniture.js';
import { checkUserNav, getUserData } from './views/utils.js';


const container = document.querySelector('.container');

page(decorateContext);

page('/index.html', '/');
page('/', showHome);
page('/myFurniture', showMyPublications);
page('/catalog/:productId', showDetails);
page('/create', showCreate);
page('/edit/:productId', showEdit);
page('/delete/:productId', showDelete);
page('/login', showLogin);
page('/register', showRegister);
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
