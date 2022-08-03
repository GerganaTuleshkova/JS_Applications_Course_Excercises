import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import { getAll } from '../api/games.js';


const catalogTemplate = (games) => html`
    <section id="catalog-page">
            <h1>All Games</h1>

            ${games.length == 0
                ? html`<h3 class="no-articles">No articles yet</h3>`
                : html`${games.map(gameTemplate)}`}            
    </section>
    `;



const gameTemplate = (game) => html`
    <div class="allGames">
        <div class="allGames-info">
            <img src=${game.imageUrl}>
            <h6>${game.category}</h6>
            <h2>${game.title}</h2>
            <a href="/catalog/${game._id}" class="details-button">Details</a>
        </div>
    </div>
    `;


export async function catalogView(ctx) {
    
    let games = await getAll();

    ctx.render(catalogTemplate(games));
}



