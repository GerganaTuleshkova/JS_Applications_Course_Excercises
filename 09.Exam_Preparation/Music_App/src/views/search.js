import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import { getAll, getBySearch } from '../api/albums.js';



const searchTemplate = (albums, onSearchedTextChange, onSearchButtonClick, currentLoggedUser) => html`
    <section id="searchPage">
        <h1>Search by Name</h1>
    
        <div class="search">
            <input @input=${onSearchedTextChange} id="search-input" type="text" name="search"
                placeholder="Enter desired albums's name">
            <button @click=${onSearchButtonClick} class="button-list">Search</button>
        </div>
    
        <h2>Results:</h2>
    
        <!--Show after click Search button-->
        <div class="search-result">
    
            ${albums.length == 0
            ? html`<p class="no-result">No result.</p>`
            : html`${albums.map(album => albumTemplate(album, currentLoggedUser))}`
        }
        </div>
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


export async function searchView(ctx) {
    let currentSearch = '';
    let currentLoggedUser = ctx.user;


    ctx.render(searchTemplate([], onSearchedTextChange, onSearchButtonClick));

    function onSearchedTextChange(event) {
        currentSearch = event.target.value;


    }

    async function onSearchButtonClick(event) {


        let query = currentSearch;
        let albums = await getBySearch(query);
        ctx.render(searchTemplate(albums, onSearchedTextChange, onSearchButtonClick, currentLoggedUser));
        event.target.value = ''

    }
}


