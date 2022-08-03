import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import { getAll, deleteTheaterById, gateLikesCount, getIsLikedByUserId, like } from '../api/theaters.js';


const detailsTemplate = (theater, isOwner, isLoggedUser, likesCount, isLiked, onLikeClick, onDelete) => html`
    <section id="detailsPage">
            <div id="detailsBox">
                <div class="detailsInfo">
                    <h1>Title: ${theater.title}</h1>
                    <div>
                        <img src=${theater.imageUrl} />
                    </div>
                </div>

                <div class="details">
                    <h3>Theater Description</h3>
                    <p>${theater.description}</p>
                    <h4>Date: ${theater.date}</h4>
                    <h4>Author: ${theater.author}</h4>

                    <div class="buttons">

                        ${isOwner == true
                        ? html`                        
                                <a class="btn-delete" href="javascript:void(0)" @click=${onDelete}>Delete</a>
                                <a class="btn-edit" href="/edit/${theater._id}">Edit</a>                            
                            `
                        : html`${isLoggedUser != null && isLiked == 0
                                ? html`<a class="btn-like" href="javascript:void(0)" @click=${onLikeClick}>Like</a>`
                                : nothing}`
                        }                   

                    </div>
                    <p class="likes">Likes: ${likesCount}</p>
                </div>
            </div>
        </section>
    `;



export async function detailsView(ctx) {
    let theater = ctx.theater;
    let isOwner = ctx.theater._isOwner;
    let isLoggedUser = ctx.user;
    // let userId = ctx.user?._id;

    let isLiked = 1;

    let likesCount = await gateLikesCount(theater._id);
    if (ctx.user) {
        isLiked = await getIsLikedByUserId(theater._id, ctx.user._id);
    }
    

    ctx.render(detailsTemplate(theater, isOwner, isLoggedUser, likesCount, isLiked, () => onLikeClick(theater, ctx), () => onDelete(theater, ctx)));
}

async function onDelete(theater, ctx) {
    const confirmed = confirm(`Are you sure you want to delete ${theater.title}?`);
    if (confirmed) {
        try {
            await deleteTheaterById(theater._id);
            ctx.page.redirect(`/profile`);
        } catch (err) {
            alert(err.message);
        }
    }
}

async function onLikeClick(theater, ctx) {
    let theaterId = theater._id;

    try {
        await like({ theaterId });
        ctx.page.redirect(`/catalog/${theaterId}`);

    } catch (err) {
        alert(err.message);
    }
}

