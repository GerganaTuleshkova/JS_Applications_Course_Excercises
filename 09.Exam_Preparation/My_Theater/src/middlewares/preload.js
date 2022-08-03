import { getById } from '../api/theaters.js';

export async function preload(ctx, next) {
    const theaterId = ctx.params.id;

    let theater = await getById(theaterId);
    ctx.theater = theater;

    if (ctx.user && ctx.user._id == theater._ownerId) {
        theater._isOwner = true;
    }

    next();
}
