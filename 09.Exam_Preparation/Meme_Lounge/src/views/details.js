import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import { getAll, deleteMemeById } from '../api/memes.js';


const detailsTemplate = (meme, isOwner, onDelete) => html`
    <section id="meme-details">
        <h1>Meme Title: ${meme.title}</h1>
        <div class="meme-details">
            <div class="meme-img">
                <img alt="meme-alt" src=${meme.imageUrl}>
            </div>
            <div class="meme-description">
                <h2>Meme Description</h2>
                <p>
                ${meme.description}
                </p>
    
                <!-- Buttons Edit/Delete should be displayed only for creator of this meme  -->
                ${isOwner? html`
                <a class="button warning" href="/edit/${meme._id}">Edit</a>
                <button class="button danger" href="javascript:void(0)" @click=${onDelete}>Delete</button>
                ` : nothing}                
    
            </div>
        </div>
    </section>
    `;



export async function detailsView(ctx) {
    let meme = ctx.meme;
    let isOwner = ctx.meme._isOwner;
    ctx.render(detailsTemplate(meme, isOwner, () => onDelete(meme, ctx)));
}

async function onDelete(meme, ctx) {
    const confirmed = confirm(`Are you sure you want to delete ${meme.title}?`);
    if (confirmed) {
        try {
            await deleteMemeById(meme._id);
            ctx.page.redirect('/catalog');
        } catch (err) {
            alert(err.message);
        }
    }
}

