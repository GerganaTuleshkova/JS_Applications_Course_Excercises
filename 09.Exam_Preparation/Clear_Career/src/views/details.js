import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import { getAll, deleteOfferById, applyForOfferById, getApplicationsCountByOfferId, getUserApplierForOffer } from '../api/offers.js';


const detailsTemplate = (offer, isOwner, isLoggedUser, applicationsOnOffer, hasUserAppliedForOffer, onDelete, onApplyClick) => html`      
    <section id="details">
        <div id="details-wrapper">
            <img id="details-img" src=${offer.imageUrl} alt="example1" />
            <p id="details-title">${offer.title}</p>
            <p id="details-category">
                Category: <span id="categories">${offer.category}</span>
            </p>
            <p id="details-salary">
                Salary: <span id="salary-number">${offer.salary}</span>
            </p>
            <div id="info-wrapper">
                <div id="details-description">
                    <h4>Description</h4>
                    <span>${offer.description}</span>
                </div>
                <div id="details-requirements">
                    <h4>Requirements</h4>
                    <span>${offer.requirements}</span>
                </div>
            </div>
            <p>Applications: <strong id="applications">${applicationsOnOffer}</strong></p>
    
            <!--Edit and Delete are only for creator-->
    
            <div id="action-buttons">
                ${isOwner
                    ? html`
                        <a href="/edit/${offer._id}" id="edit-btn">Edit</a>
                        <a href="javascript:void(0)" @click=${onDelete} id="delete-btn">Delete</a>`
                    : html`
                        ${isLoggedUser != null
                            ? html`
                                ${hasUserAppliedForOffer == 0
                                    ? html`<a href="javascript:void(0)" @click=${onApplyClick} id="apply-btn">Apply</a>`
                                    : nothing}`
                            : nothing}`
                    }       
            </div>
        </div>
    </section>
    `;



export async function detailsView(ctx) {
    let offer = ctx.offer;
    let isOwner = ctx.offer._isOwner;
    let isLoggedUser = ctx.user;

    let applicationsOnOffer = await getApplicationsCountByOfferId(offer._id);

    let hasUserAppliedForOffer = 1;

    if (isLoggedUser) {
        hasUserAppliedForOffer = await getUserApplierForOffer(offer._id, ctx.user._id);
    }


    ctx.render(detailsTemplate(offer, isOwner, isLoggedUser, applicationsOnOffer, hasUserAppliedForOffer, () => onDelete(offer, ctx), () => onApplyClick(offer, ctx)));
}

async function onDelete(offer, ctx) {
    const confirmed = confirm(`Are you sure you want to delete ${offer.title}?`);
    if (confirmed) {
        try {
            await deleteOfferById(offer._id);
            ctx.page.redirect(`/catalog`);
        } catch (err) {
            alert(err.message);
        }
    }
}


async function onApplyClick(offer, ctx) {
    let offerId = offer._id
    await applyForOfferById({offerId});
    ctx.page.redirect(`/catalog/${offerId}`);
}


