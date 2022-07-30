import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import { edit } from '../api/recipe.js';
import { createSubmitHandler } from '../util.js';



const editTemplate = (recipe, onSubmit) => html`
    <section id="create">
        <article>
            <h2>Edit Recipe</h2>
            <form @submit=${onSubmit} id="editForm">
            <input type="hidden" name="_id" value=${recipe._id}>
                <label>Name: <input type="text" name="name" placeholder="Recipe name" .value=${recipe.name}></label>
                <label>Image: <input type="text" name="img" placeholder="Image URL" .value=${recipe.img}></label>
                <label class="ml">Ingredients: <textarea name="ingredients"
                        placeholder="Enter ingredients on separate lines"
                        .value=${recipe.ingredients.join('\n')}></textarea></label>
                <label class="ml">Preparation: <textarea name="steps"
                        placeholder="Enter preparation steps on separate lines"
                        .value=${recipe.steps.join('\n')}></textarea></label>
                <input type="submit" value="Save Changes">
            </form>
        </article>
    </section>`;


export async function editView(ctx) {
    let recipe = ctx.recipe;

    ctx.render(editTemplate(recipe, createSubmitHandler(ctx, onSubmit)));
}

async function onSubmit(ctx, formData, event) {
    let name = formData.name.trim();
    let img = formData.img.trim();
    let ingredients = formData.ingredients.split('\n').map(line => line.trim()).filter(line => line != '');
    let steps = formData.steps.split('\n').map(line => line.trim()).filter(line => line != '');    

    if (name == '' || img == '') {
        return alert('All fields are required');
    }

    try {
        let updatedRecipe = await edit(ctx.recipe._id, {name, img, ingredients, steps});
        event.target.reset();
        ctx.page.redirect(`/catalog/${updatedRecipe._id}`);

    } catch (error) {
    }
}


export function setupDeleted() {
    return () => html`
    <section id="details">
        <article>
            <h2>Recipe deleted</h2>
        </article>
    </section>`;
}