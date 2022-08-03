import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import { getAll, deleteById, createComment, getCommentByGameId } from '../api/games.js';
import { createSubmitHandler } from '../util.js';



const detailsTemplate = (game, isOwner, isLoggedUser, commentsOnGame, onDelete, onCommentSubmit) => html`
    <section id="game-details">
        <h1>Game Details</h1>
        <div class="info-section">
    
            <div class="game-header">
                <img class="game-img" src=${game.imageUrl}/>
                <h1>${game.title}</h1>
                <span class="levels">MaxLevel: ${game.maxLevel}</span>
                <p class="type">${game.category}</p>
            </div>
    
            <p class="text">${game.summary}</p>
    
            <!-- Bonus ( for Guests and Users ) -->
            <div class="details-comments">
                <h2>Comments:</h2>
                <ul>
                    ${commentsOnGame.length == 0
                    ? html`<p class="no-comment">No comments.</p>`
                    : html`
                        ${commentsOnGame.map(c => html`
                                <li class="comment">
                                    <p>Content: ${c.comment}</p>
                                </li>`)}
                    `}                
                
            </div>
    
            ${isOwner
                ? html`
                    <!-- Edit/Delete buttons ( Only for creator of this game )  -->
                    <div class="buttons">
                        <a href="/edit/${game._id}" class="button">Edit</a>
                        <a href="javascript:void(0)" @click=${onDelete} class="button">Delete</a>
                    </div>`        
                : nothing}
        </div>
                    

        <!--Bonus -->
        <!--Add Comment (Only for logged -in users, which is not creators of the current game )-->

        ${!isOwner && isLoggedUser != null
        ? html`
            <article class="create-comment">
                <label>Add new comment:</label>
                <form @submit=${onCommentSubmit} class="form">
                    <textarea name="comment" placeholder="Comment......"></textarea>
                    <input class="btn submit" type="submit" value="Add Comment">
                </form>
            </article>
            `
    :nothing
        }
    
    </section >
    `;



export async function detailsView(ctx) {
    let game = ctx.game;
    let isLoggedUser = ctx.user;
    let isOwner = ctx.game._isOwner;
    let commentsOnGame = await getCommentByGameId(game._id);

    ctx.render(detailsTemplate(game, isOwner, isLoggedUser, commentsOnGame, () => onDelete(game, ctx), createSubmitHandler(ctx, onCommentSubmit)));
}

async function onDelete(game, ctx) {
    const confirmed = confirm(`Are you sure you want to delete ${ game.title }?`);
    if (confirmed) {
        try {
            await deleteById(game._id);
            ctx.page.redirect(`/`);
        } catch (err) {
            alert(err.message);
        }
    }
}

async function onCommentSubmit(ctx, formData, event) {
    let comment = formData.comment.trim();
    let gameId = ctx.game._id
    
    if (comment == '') {
        return alert('Empty comments are not alowed!');
    }
    try {
        let newComment = await createComment({ gameId, comment});
        event.target.reset();
        ctx.page.redirect(`/catalog/${gameId}`);

    } catch (error) {
    }
}

