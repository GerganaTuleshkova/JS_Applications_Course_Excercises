import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import { getAll, deleteBookById, like, likesCount, isLikedByUser } from '../api/books.js';


const detailsTemplate = (book, likes, isOwner, bookLikedByUser, onDelete, onLike) => html`
    <section id="details-page" class="details">
        <div class="book-information">
            <h3>${book.title}</h3>
            <p class="type">Type: ${book.type}</p>
            <p class="img"><img src=${book.imageUrl}></p>
            <div class="actions">
                ${isOwner == true 
                    ? html`
                        <!-- Edit/Delete buttons ( Only for creator of this book )  -->
                        <a class="button" href="/edit/${book._id}">Edit</a>
                        <a class="button" href="javascript:void(0)" @click=${onDelete}>Delete</a>`
                    : nothing
                }
    
                ${(isOwner == false && bookLikedByUser == 0) 
                    ? html`
                        <!-- Like button ( Only for logged-in users, which is not creators of the current book ) -->
                        <a class="button" href="javascript:void(0)" @click=${onLike}>Like</a>`
                    : nothing
                }
    
                <!-- Bonus -->    
                <!-- ( for Guests and Users )  -->
                <div class="likes">
                    <img class="hearts" src="/images/heart.png">
                    <span id="total-likes">Likes: ${likes}</span>
                </div>
                <!-- Bonus -->
            </div>
        </div>
        <div class="book-description">
            <h3>Description:</h3>
            <p>${book.description}</p>
        </div>
    </section>
    `;

let likeButton = document.querySelector('.button');

export async function detailsView(ctx) {
    let book = ctx.book;
    let isOwner = ctx.book._isOwner;

    let likes = await likesCount(book._id);

    let bookLikedByUser = 1;

    if (ctx.user) {
        bookLikedByUser = await isLikedByUser(book._id, ctx.user._id);
    }

    ctx.render(detailsTemplate(book, likes, isOwner, bookLikedByUser, () => onDelete(book, ctx), () => onLike(book, ctx)));
}

async function onDelete(book, ctx) {
    const confirmed = confirm(`Are you sure you want to delete ${book.title}?`);
    if (confirmed) {
        try {
            await deleteBookById(book._id);
            ctx.page.redirect(`/catalog`);
        } catch (err) {
            alert(err.message);
        }
    }
}

async function onLike(book, ctx) {
    let bookId = book._id;

    try {
        await like({ bookId });
        ctx.page.redirect(`/catalog/${book._id}`);

    } catch (err) {
        alert(err.message);
    }
}


