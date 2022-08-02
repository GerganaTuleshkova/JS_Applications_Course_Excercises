import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import { getAll, deleteAlbumById } from '../api/albums.js';


const detailsTemplate = (album, isOwner, onDelete) => html`
     <section id="detailsPage">
            <div class="wrapper">
                <div class="albumCover">
                    <img src=${album.imgUrl}>
                </div>
                <div class="albumInfo">
                    <div class="albumText">

                        <h1>Name: ${album.name}</h1>
                        <h3>Artist: ${album.artist}</h3>
                        <h4>Genre: ${album.genre}</h4>
                        <h4>Price: $${album.price}</h4>
                        <h4>Date: ${album.releaseDate}</h4>
                        <p>Description: ${album.description}</p>
                    </div>

                    ${isOwner == true 
                    ? html`
                        <div class="actionBtn">
                            <a href="/edit/${album._id}" class="edit">Edit</a>
                            <a href="javascript:void(0)" @click=${onDelete} class="remove">Delete</a>
                        </div>`
                    : nothing
                    } 

                </div>
            </div>
        </section>
    `;



export async function detailsView(ctx) {
    let album = ctx.album;
    let isOwner = ctx.album._isOwner;
    ctx.render(detailsTemplate(album, isOwner, () => onDelete(album, ctx)));
}

async function onDelete(album, ctx) {
    const confirmed = confirm(`Are you sure you want to delete ${album.name}?`);
    if (confirmed) {
        try {
            await deleteAlbumById(album._id);
            ctx.page.redirect(`/catalog`);
        } catch (err) {
            alert(err.message);
        }
    }
}

