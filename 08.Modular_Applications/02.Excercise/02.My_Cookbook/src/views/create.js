import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import { create } from '../api/recipe.js';
import { createSubmitHandler, getUserData } from '../util.js';


const createTemplate = (onSubmit) => html`
    <section id="create">
        <article>
            <h2>New Recipe</h2>
            <form @submit=${onSubmit} id="createForm">
                <label>Name: <input type="text" name="name" placeholder="Recipe name"></label>
                <label>Image: <input type="text" name="img" placeholder="Image URL"></label>
                <label class="ml">Ingredients: <textarea name="ingredients"
                        placeholder="Enter ingredients on separate lines"></textarea></label>
                <label class="ml">Preparation: <textarea name="steps"
                        placeholder="Enter preparation steps on separate lines"></textarea></label>
                <input type="submit" value="Create Recipe">
            </form>
        </article>
    </section>
    `;


export function createView(ctx) {
    ctx.render(createTemplate(createSubmitHandler(ctx, onSubmit)));
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
        let newRecipe = await create({name, img, ingredients, steps});
        event.target.reset();
        ctx.page.redirect(`/catalog/${newRecipe._id}`);

    } catch (error) {
    }
}


