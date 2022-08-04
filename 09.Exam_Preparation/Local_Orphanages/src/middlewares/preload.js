import { getById } from '../api/posts.js';

export async function preload(ctx, next) {
    const postId = ctx.params.id;

    let post = await getById(postId);
    ctx.post = post;

    if (ctx.user && ctx.user._id == post._ownerId) {
        post._isOwner = true;
    }

    next();
}
