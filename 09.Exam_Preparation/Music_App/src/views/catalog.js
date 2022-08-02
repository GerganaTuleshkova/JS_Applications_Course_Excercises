import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import { getAll } from '../api/albums.js';


const catalogTemplate = (albums, currentLoggedUser) => html`
    <section id="catalogPage">
        <h1>All Albums</h1>

        ${albums.length == 0
            ? html`<p>No Albums in Catalog!</p>`
            : html`${albums.map(album => albumTemplate(album, currentLoggedUser))}`
        }   
         
    </section>
    `;

const albumTemplate = (album, currentLoggedUser) => html`
    <div class="card-box">
        <img src=${album.imgUrl}>
        <div>
            <div class="text-center">
                <p class="name">Name: ${album.name}</p>
                <p class="artist">Artist: ${album.artist}</p>
                <p class="genre">Genre: ${album.genre}</p>
                <p class="price">Price: $${album.price}</p>
                <p class="date">Release Date: ${album.releaseDate}</p>
            </div>
            ${currentLoggedUser
            ? html`<div class="btn-group">
                        <a href="/catalog/${album._id}" id="details">Details</a>
                    </div>`
            : nothing
        }  
            
        </div>
    </div>
    `;


export async function catalogView(ctx) {
    let albums = await getAll();

    let currentLoggedUser = ctx.user;

    ctx.render(catalogTemplate(albums, currentLoggedUser));
}
