import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import { getAll } from '../api/recipe.js';


const catalogTemplate = (recipes, page, pages, search) => html`
    <section id="catalog">
        <div class="section-title">
            <form id="searchForm">
                <input type="text" name="search">
                <input type="submit" value="Search">
            </form>
        </div>
        ${pagerTemplate(page, pages, search)}
        ${recipes.map(recipePreviewTemplate)}
        ${pagerTemplate(page, pages, search)}
    </section>
    `;

const pagerTemplate = (page, pages, search) => html`
    <header class="section-title">
        Page ${page} of ${pages}
        ${page != 1 ? html`<a class="pager" href=${compileHrefPrev(page, search)}>&lt; Prev</a>` : nothing}
        ${page < pages ? html`<a class="pager" href=${compileHrefNext(page, search)}>Next &gt;</a>` : nothing}
    </header>
    `;

function compileHrefNext(page, search) {
    let href = `/catalog?page=${page + 1}`;
    if (search) {
        href += `&search=${search}`;
    }

    return href;
}

function compileHrefPrev(page, search) {
    let href = `/catalog?page=${page - 1}`;
    if (search) {
        href += `&search=${search}`;
    }

    return href;
}


const recipePreviewTemplate = (recipe) => html`
    <a class="card" href="/catalog/${recipe._id}">
        <article class="preview">
            <div class="title">
                <h2>${recipe.name}</h2>
            </div>
            <div class="small"><img src=${recipe.img}></div>
        </article>
    </a>
    `;


export async function catalogView(ctx) {
    let query = parseQuearyString(ctx.querystring);

    let page = Number(query.page) || 1;
    let search = query.search || '';

    let { recipes, pages } = await getAll(page, search);

    ctx.render(catalogTemplate(recipes, page, pages, search));
}


export function parseQuearyString(query = '') {
    return Object.fromEntries(query.split('&').map(kvp => kvp.split('=')));
}


