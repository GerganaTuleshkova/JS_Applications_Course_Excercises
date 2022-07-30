import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import { getRecent } from '../api/recipe.js';


const homeTemplate = (recentRecipes) => html`
<section id="home">
    <div class="hero">
        <h2>Welcome to My Cookbook</h2>
    </div>
    <header class="section-title">Recently added recipes</header>
    <div class="recent-recipes">
        ${recentRecipes.map(previewTemplate)}
    </div>
    <footer class="section-title">
        <p>Browse all recipes in the <a href="/catalog">Catalog</a></p>
    </footer>
</section>
`;

function previewTemplate(recipe, i) {
    return html`
    <a class="card" href=${`/catalog/${recipe._id}`}> 
        <article class="recent">
        <div class="recent-preview"><img src=${recipe.img}></div>
        <div class="recent-title">${recipe.name}</div>
        </article>
    </a>
    ${i != 2 ? html`<div class="recent-space"></div>` : nothing}
    `
}

export async function homeView(ctx) {

    let recentRecipes = await getRecent();
    ctx.render(homeTemplate(recentRecipes));
}
