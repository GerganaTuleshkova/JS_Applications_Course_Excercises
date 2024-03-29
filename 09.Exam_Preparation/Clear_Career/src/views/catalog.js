import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import { getAll } from '../api/offers.js';


const catalogTemplate = (offers) => html`
    <section id="dashboard">
        <h2>Job Offers</h2>
        ${offers.length == 0
            ? html` <h2>No offers yet.</h2>`
            : html`${offers.map(offerPreviewTemplate)}`
        }
    
    </section>
    `;


const offerPreviewTemplate = (offer) => html`
    <div class="offer">
            <img src=${offer.imageUrl} alt="example1" />
            <p>
                <strong>Title: </strong><span class="title">${offer.title}</span>
            </p>
            <p><strong>Salary:</strong><span class="salary">${offer.salary}</span></p>
            <a class="details-btn" href="/catalog/${offer._id}">Details</a>
        </div>
    `;


export async function catalogView(ctx) {

    let offers = await getAll();

    ctx.render(catalogTemplate(offers));
}




