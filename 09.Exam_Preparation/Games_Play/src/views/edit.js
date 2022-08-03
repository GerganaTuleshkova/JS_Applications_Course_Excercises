import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import { edit } from '../api/games.js';
import { createSubmitHandler } from '../util.js';



const editTemplate = (game, onSubmit) => html` 
    <section id="edit-page" class="auth">
        <form @submit=${onSubmit} id="edit">
            <div class="container">
    
                <h1>Edit Game</h1>
                <label for="leg-title">Legendary title:</label>
                <input type="text" id="title" name="title" .value=${game.title}>
    
                <label for="category">Category:</label>
                <input type="text" id="category" name="category" value=${game.category}>
    
                <label for="levels">MaxLevel:</label>
                <input type="number" id="maxLevel" name="maxLevel" min="1" value=${game.maxLevel}>
    
                <label for="game-img">Image:</label>
                <input type="text" id="imageUrl" name="imageUrl" value=${game.imageUrl}>
    
                <label for="summary">Summary:</label>
                <textarea name="summary" id="summary">${game.summary}</textarea>
                <input class="btn submit" type="submit" value="Edit Game">
    
            </div>
        </form>
    </section>    
    `;


export async function editView(ctx) {
    let game = ctx.game;

    ctx.render(editTemplate(game, createSubmitHandler(ctx, onSubmit)));
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
        let updatedGame = await edit(ctx.game._id, { title, category, maxLevel, imageUrl, summary });
        event.target.reset();
        ctx.page.redirect(`/catalog/${updatedGame._id}`);

    } catch (error) {
    }
}
