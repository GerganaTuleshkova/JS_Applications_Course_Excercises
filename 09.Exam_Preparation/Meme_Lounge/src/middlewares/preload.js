import { getById } from '../api/memes.js';

export async function preload(ctx, next) {
    const memeId = ctx.params.id;

    let meme = await getById(memeId);
    ctx.meme = meme;

    if (ctx.user && ctx.user._id == meme._ownerId) {
        meme._isOwner = true;
    }

    next();
}
