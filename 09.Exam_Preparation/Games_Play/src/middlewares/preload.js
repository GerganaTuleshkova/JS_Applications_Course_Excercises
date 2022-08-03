import { getById } from '../api/games.js';

export async function preload(ctx, next) {
    const gameId = ctx.params.id;

    let game = await getById(gameId);
    ctx.game = game;

    if (ctx.user && ctx.user._id == game._ownerId) {
        game._isOwner = true;
    }

    next();
}
