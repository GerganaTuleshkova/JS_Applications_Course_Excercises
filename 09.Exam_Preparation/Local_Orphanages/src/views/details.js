import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import { deletePostById, donate, getDonationsForPostByPostId, getHasUserDonatedToPost } from '../api/posts.js';


const detailsTemplate = (post, isOwner, isLoggedUser, donationsForPost, hasCurrentUserDonated, onDelete, onDonateClick) => html`  
    <section id="details-page">
        <h1 class="title">Post Details</h1>
    
        <div id="container">
            <div id="details">
                <div class="image-wrapper">
                    <img src=${post.imageUrl} alt="Material Image" class="post-image">
                </div>
                <div class="info">
                    <h2 class="title post-title">${post.title}</h2>
                    <p class="post-description">Description: ${post.description}</p>
                    <p class="post-address">Address: ${post.address}</p>
                    <p class="post-number">Phone number: ${post.phone}</p>
                    <p class="donate-Item">Donate Materials: ${donationsForPost}</p>
    
                       
                    ${isLoggedUser != null
                    ? html`<div class="btns">
                                ${isOwner
                                ? html`<a href="/edit/${post._id}" class="edit-btn btn">Edit</a>
                                        <a href="javascript:void(0)" @click=${onDelete} class="delete-btn btn">Delete</a>`
                                : html`${hasCurrentUserDonated == 0
                                            ? html`<a href="javascript:void(0)" @click=${onDonateClick} class="donate-btn btn">Donate</a>`
                                            : nothing
                                        }`
                                
                                }
                            </div>`
                    : nothing}
                        
                </div>
            </div>
        </div>
    </section>
    `;



export async function detailsView(ctx) {
    let post = ctx.post;
    let postId = post._id
    let isOwner = ctx.post._isOwner;
    let isLoggedUser = ctx.user;

    let donationsForPost = await getDonationsForPostByPostId(postId);     

    let hasCurrentUserDonated = 1;

    if (ctx.user != null) {
        hasCurrentUserDonated = await getHasUserDonatedToPost(postId, ctx.user._id)
    }


    ctx.render(detailsTemplate(post, isOwner, isLoggedUser, donationsForPost, hasCurrentUserDonated, () => onDelete(post, ctx), () => onDonateClick(post, ctx)));
}

async function onDelete(post, ctx) {
    const confirmed = confirm(`Are you sure you want to delete ${post.title}?`);
    if (confirmed) {
        try {
            await deletePostById(post._id);
            ctx.page.redirect(`/catalog`);
        } catch (err) {
            alert(err.message);
        }
    }
}


async function onDonateClick(post, ctx) {
    let postId = post._id
    await donate({postId});
    ctx.page.redirect(`/catalog/${postId}`);
}
