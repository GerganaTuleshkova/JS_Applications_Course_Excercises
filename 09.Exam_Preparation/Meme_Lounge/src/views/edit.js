import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import { edit } from '../api/memes.js';
import { notify } from '../notify.js';
import { createSubmitHandler } from '../util.js';



const editTemplate = (meme, onSubmit) => html`
    <section id="edit-meme">
        <form @submit=${onSubmit} id="edit-form">
            <h1>Edit Meme</h1>
            <div class="container">
                <label for="title">Title</label>
                <input id="title" type="text" placeholder="Enter Title" name="title" .value=${meme.title}>
                <label for="description">Description</label>
                <textarea id="description" placeholder="Enter Description" name="description" .value=${meme.description}>
                </textarea>
                <label for="imageUrl">Image Url</label>
                <input id="imageUrl" type="text" placeholder="Enter Meme ImageUrl" name="imageUrl" .value=${meme.imageUrl}>>
                <input type="submit" class="registerbtn button" value="Edit Meme">
            </div>
        </form>
    </section>
    `;


export async function editView(ctx) {
    let meme = ctx.meme;

    ctx.render(editTemplate(meme, createSubmitHandler(ctx, onSubmit)));
}

async function onSubmit(ctx, formData, event) {
    let title = formData.title.trim();
    let description = formData.description.trim();
    let imageUrl = formData.imageUrl.trim();
    

    if (title == '' || description == '' || imageUrl == '') {
        return notify('All fields are required');
    }


    try {
        let updatedMeme = await edit(ctx.meme._id, { title, description, imageUrl });
        event.target.reset();
        ctx.page.redirect(`/catalog/${ctx.meme._id}`);

    } catch (error) {
    }
}

