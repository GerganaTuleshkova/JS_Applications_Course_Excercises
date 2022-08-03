import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import { getRecent } from '../api/games.js';


const homeTemplate = (gamesRecent) => html`
<section id="welcome-world">

    <div class="welcome-message">
        <h2>ALL new games are</h2>
        <h3>Only in GamesPlay</h3>
    </div>
    <img src="./images/four_slider_img01.png" alt="hero">

    <div id="home-page">
        <h1>Latest Games</h1>

        ${gamesRecent.length == 0
            ? html`<p class="no-articles">No games yet</p>`
            : html`${gamesRecent.map(previewTemplate)}`}
       
    </div>
</section>
`;

function previewTemplate(game) {
    return html`
    <div class="game">
        <div class="image-wrap">
            <img src=${game.imageUrl}>
        </div>
        <h3>${game.title}</h3>
        <div class="rating">
            <span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>
        </div>
        <div class="data-buttons">
            <a href="/catalog/${game._id}" class="btn details-btn">Details</a>
        </div>
    </div>
    `
}

export async function homeView(ctx) {

    let gamesRecent = await getRecent();
    ctx.render(homeTemplate(gamesRecent));
}
