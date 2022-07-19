import { get } from "./api.js";
// import { render } from "./dom.js";

const catalogSection = document.getElementById('catalogView');
const list = catalogSection.querySelector('ul');
catalogSection.remove()


export async function showCatalog(context) {
    context.render(catalogSection);

    list.replaceChildren('Loading...');

    const movies = await get('/data/movies');

    let fragment = document.createDocumentFragment();

    movies.map(createMovieItem).forEach(c => fragment.appendChild(c))

    list.replaceChildren(fragment);
}
 
function createMovieItem(movie) {
    let li = document.createElement('li');
    li.textContent = movie.title;

    return li;
}
