import {showHome} from './home.js';
import {showDashboard} from './dashboard.js';
import {showLogin} from './login.js';
import {showRegister} from './register.js';
import {showCreate} from './create.js';
// import {showLogout} from './logout';
// import {showDetails} from './ideaDetails.js';
import {render} from './dom.js';
import {checkUserNav, onLogout } from './util.js';


document.querySelector('nav').addEventListener('click', onNavigate);
document.querySelector('main').addEventListener('click', onNavigate);
document.getElementById('logout').addEventListener('click', onLogout);
// document.querySelector('.btn').addEventListener('click', showDetails);

checkUserNav();

const sections = {
    'home': showHome,
    'dashboard': showDashboard,
    // 'idea-details': showIdeaDetails,
    'login': showLogin,
    'register': showRegister,
    'create': showCreate,
    // 'logout': showLogout,
}

goTo('home');

function onNavigate(event) {
    let target = event.target;
    if (target.tagName == 'IMG') {
        target = target.parentElement;
    }
    if (target.tagName == 'A') {
        const viewName = target.id;

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