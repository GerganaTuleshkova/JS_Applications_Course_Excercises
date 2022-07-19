import { post } from "./api.js";
import { showCatalog } from "./catalog.js";
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

async function onSubmit({title}) {
    await post('/data/movies', {title});
    showCatalog();
};