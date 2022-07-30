import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import { getAll, deleteRecipeById } from '../api/recipe.js';


const detailsTemplate = (recipe, isOwner, onDelete) => html`
    <section id="details">
        <article>
            <h2>${recipe.name}</h2>
            <div class="band">
                <div class="thumb"><img src=${recipe.img}></div>
                <div class="ingredients">
                    <h3>Ingredients:</h3>
                    <ul>
                        ${recipe.ingredients.map(i => html`<li>${i}</li>`)}
                    </ul>
                </div>
            </div>
            <div class="description">
                <h3>Preparation:</h3>
                ${recipe.steps.map(step => html`<p>${step}</p>`)}
            </div>
            ${isOwner
            ? html`
    
            <div class="controls">
                <a class="actionLink" href="/edit/${recipe._id}">✎ Edit</a>
                <a class="actionLink" href="javascript:void(0)" @click=${onDelete}>✖ Delete</a>
            </div>`
            :
            nothing}
    
        </article>
    </section>
    `;



export async function detailsView(ctx) {
    let recipe = ctx.recipe;
    let isOwner = ctx.recipe._isOwner;
    ctx.render(detailsTemplate(recipe, isOwner, () => onDelete(recipe, ctx)));
}

async function onDelete(recipe, ctx) {
    const confirmed = confirm(`Are you sure you want to delete ${recipe.name}?`);
    if (confirmed) {
        try {
            await deleteRecipeById(recipe._id);
            ctx.page.redirect(`/catalog`);
        } catch (err) {
            alert(err.message);
        }
    }
}

