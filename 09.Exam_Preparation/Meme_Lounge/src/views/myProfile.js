import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import { getAll, getAllOfUser } from '../api/memes.js';


const profileTemplate = (profileData, memes) => html`
    <section id="user-profile-page" class="user-profile">
        <article class="user-info">
            <img id="user-avatar-url" alt="user-profile" src="/images/${profileData.gender}.png">
            <div class="user-content">
                <p>Username: ${profileData.username}</p>
                <p>Email: ${profileData.email}</p>
                <p>My memes count: ${memes.length}</p>
            </div>
        </article>
        <h1 id="user-listings-title">User Memes</h1>
        <div class="user-meme-listings">
            ${memes.length == 0 ? html`<p class="no-memes">No memes in database.</p>` 
            :
            memes.map(memeTemplate)
            }   
            
        </div>
    </section>
    `;

const memeTemplate = (meme) => html`
    <div class="user-meme">
        <p class="user-meme-title">${meme.title}</p>
        <img class="userProfileImage" alt="meme-img" src=${meme.imageUrl}>
        <a class="button" href="/catalog/${meme._id}">Details</a>
    </div>
    `;

export async function myProfileView(ctx) {
    let profileData = ctx.user;

    let memes = await getAllOfUser(ctx.user._id);
    ctx.render(profileTemplate(profileData, memes));
}


