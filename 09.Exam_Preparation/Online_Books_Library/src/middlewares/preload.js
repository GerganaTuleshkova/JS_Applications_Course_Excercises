import { getById } from '../api/books.js';

export async function preload(ctx, next) {
    const bookId = ctx.params.id;

    let book = await getById(bookId);
    ctx.book = book;

    if (ctx.user && ctx.user._id == book._ownerId) {
        book._isOwner = true;
    }

    if (ctx.user && ctx.user._id != book._ownerId) {
        book._isOwner = false;
    }

    next();
}
