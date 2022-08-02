import { getById } from '../api/albums.js';

export async function preload(ctx, next) {
    const albumId = ctx.params.id;

    let album = await getById(albumId);
    ctx.album = album;

    if (ctx.user && ctx.user._id == album._ownerId) {
        album._isOwner = true;
    }

    next();
}
