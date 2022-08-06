import { getById } from '../api/offers.js';

export async function preload(ctx, next) {
    const offerId = ctx.params.id;

    let offer = await getById(offerId);
    ctx.offer = offer;

    if (ctx.user && ctx.user._id == offer._ownerId) {
        offer._isOwner = true;
    }

    next();
}
