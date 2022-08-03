import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import { getAll, getAllByUserId } from '../api/theaters.js';


const catalogTemplate = (currentUser, theaters) => html`
    <section id="profilePage">
            <div class="userInfo">
                <div class="avatar">
                    <img src="./images/profilePic.png">
                </div>
                <h2>${currentUser.email}</h2>
            </div>
            <div class="board">
                ${theaters.length == 0
                ? html`<div class="no-events">
                        <p>This user has no events yet!</p>
                        </div>`
                : html`${theaters.map(theaterPreviewTemplate)}`}               
            </div>
        </section>
    `;


const theaterPreviewTemplate = (theater) => html`
    <div class="eventBoard">
        <div class="event-info">
            <img src=${theater.imageUrl}>
            <h2>${theater.title}</h2>
            <h6>${theater.date}</h6>
            <a href="/catalog/${theater._id}" class="details-button">Details</a>
        </div>
    </div>
    `;


export async function profileView(ctx) {
    let currentUser = ctx.user
    let theaters = await getAllByUserId(currentUser._id);

    ctx.render(catalogTemplate(currentUser, theaters));
}



