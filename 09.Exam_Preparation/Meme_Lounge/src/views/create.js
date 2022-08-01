import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import { create } from '../api/memes.js';
import { notify } from '../notify.js';
import { createSubmitHandler, getUserData } from '../util.js';


const createTemplate = (onSubmit) => html`
    <section id="create-meme">
        <form @submit=${onSubmit}id="create-form">
            <div class="container">
                <h1>Create Meme</h1>
                <label for="title">Title</label>
                <input id="title" type="text" placeholder="Enter Title" name="title">
                <label for="description">Description</label>
                <textarea id="description" placeholder="Enter Description" name="description"></textarea>
                <label for="imageUrl">Meme Image</label>
                <input id="imageUrl" type="text" placeholder="Enter meme ImageUrl" name="imageUrl">
                <input type="submit" class="registerbtn button" value="Create Meme">
            </div>
        </form>
    </section>
    `;


export function createView(ctx) {
    ctx.render(createTemplate(createSubmitHandler(ctx, onSubmit)));
}

async function onSubmit(ctx, formData, event) {
    let title = formData.title.trim();
    let description = formData.description.trim();
    let imageUrl = formData.imageUrl.trim();
    

    if (title == '' || description == '' || imageUrl == '') {
        return notify('All fields are required');
    }

    try {
        await create({ title, description, imageUrl });
        event.target.reset();
        ctx.page.redirect(`/catalog`);

    } catch (error) {
    }
}


