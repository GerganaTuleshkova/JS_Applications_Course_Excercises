import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import { create } from '../api/posts.js';
import { createSubmitHandler, getUserData } from '../util.js';


const createTemplate = (onSubmit) => html`
    <section id="create-page" class="auth">
        <form @submit=${onSubmit} id="create">
            <h1 class="title">Create Post</h1>
    
            <article class="input-group">
                <label for="title">Post Title</label>
                <input type="title" name="title" id="title">
            </article>
    
            <article class="input-group">
                <label for="description">Description of the needs </label>
                <input type="text" name="description" id="description">
            </article>
    
            <article class="input-group">
                <label for="imageUrl"> Needed materials image </label>
                <input type="text" name="imageUrl" id="imageUrl">
            </article>
    
            <article class="input-group">
                <label for="address">Address of the orphanage</label>
                <input type="text" name="address" id="address">
            </article>
    
            <article class="input-group">
                <label for="phone">Phone number of orphanage employee</label>
                <input type="text" name="phone" id="phone">
            </article>
    
            <input type="submit" class="btn submit" value="Create Post">
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
    let address = formData.address.trim();
    let phone = formData.phone.trim();


    if (title == ''
        || description == ''
        || imageUrl == ''
        || address == ''
        || phone == ''
    ) {
        return alert('All fields are required');
    }

    try {
        await create({ title, description, imageUrl, address, phone });
        event.target.reset();
        ctx.page.redirect(`/catalog`);

    } catch (error) {
    }
}


