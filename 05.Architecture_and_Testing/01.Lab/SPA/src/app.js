import { showHome } from './home.js';
import { showCatalog } from './catalog.js';
import { showAbout } from './about.js';
import { showLogin } from './login.js';
import { showRegister } from './register.js';
import { showCreate } from './create.js';
import { checkUserNav, onLogout } from './util.js';
import { render } from './dom.js';


document.querySelector('nav').addEventListener('click', onNavigate);
document.getElementById('logoutBtn').addEventListener('click', onLogout);

checkUserNav();

const sections = {
    'homeBtn': showHome,
    'catalogBtn': showCatalog,
    'aboutBtn': showAbout,
    'loginBtn': showLogin,
    'registerBtn': showRegister,
    'createBtn': showCreate,
}

goTo('homeBtn');

function onNavigate(event) {
    if (event.target.tagName == 'A') {
        const viewName = event.target.id;
        if (goTo(viewName)) {
            event.preventDefault();
        };
    }
}

function goTo(viewName) {
    const view = sections[viewName];

    if (typeof view == 'function') {
        view({
            render,
            goTo,
        });
        return true;
    } else {
        return false;
    }
}


