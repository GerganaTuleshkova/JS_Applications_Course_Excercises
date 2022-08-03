import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import { create } from '../api/games.js';
import { createSubmitHandler, getUserData } from '../util.js';


const createTemplate = (onSubmit) => html`
    <section id="create-page" class="auth">
        <form @submit=${onSubmit} id="create">
            <div class="container">
    
                <h1>Create Game</h1>
                <label for="leg-title">Legendary title:</label>
                <input type="text" id="title" name="title" placeholder="Enter game title...">
    
                <label for="category">Category:</label>
                <input type="text" id="category" name="category" placeholder="Enter game category...">
    
                <label for="levels">MaxLevel:</label>
                <input type="number" id="maxLevel" name="maxLevel" min="1" placeholder="1">
    
                <label for="game-img">Image:</label>
                <input type="text" id="imageUrl" name="imageUrl" placeholder="Upload a photo...">
    
                <label for="summary">Summary:</label>
                <textarea name="summary" id="summary"></textarea>
                <input class="btn submit" type="submit" value="Create Game">
            </div>
        </form>
    </section>
    `;


export function createView(ctx) {
    ctx.render(createTemplate(createSubmitHandler(ctx, onSubmit)));
}

async function onSubmit(ctx, formData, event) {
    let title = formData.title.trim();
    let category = formData.category.trim();
    let maxLevel = formData.maxLevel.trim();
    let imageUrl = formData.imageUrl.trim();
    let summary = formData.summary.trim();


    if (title == ''
        || category == ''
        || maxLevel == ''
        || imageUrl == ''
        || summary == ''
    ) {
        return alert('All fields are required');
    }

    try {
        await create({ title, category, maxLevel, imageUrl, summary });
        event.target.reset();
        ctx.page.redirect(`/`);

    } catch (error) {
    }
}


