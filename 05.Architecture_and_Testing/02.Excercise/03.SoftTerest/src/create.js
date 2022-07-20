import { post } from "./api.js";
import {showDashboard} from './dashboard.js';
import { showHome } from "./home.js";
import { createSubmitHandler } from "./util.js";
// import { render } from "./dom.js";

const createSection = document.getElementById('createView');
createSection.remove();
let form = createSection.querySelector('form');

// form.addEventListener('submit', onSubmit);
createSubmitHandler(form, onSubmit)

export function showCreate(context) {
    context.render(createSection);
}

async function onSubmit({title, description, img}) {
    await post('/data/ideas', {title, description, img});
    // showDashboard();
    showHome();
};