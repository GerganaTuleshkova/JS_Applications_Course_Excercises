import { getById } from '../api/recipe.js';

export async function preload(ctx, next) {
    const recipeId = ctx.params.id;

    let recipe = await getById(recipeId);
    ctx.recipe = recipe;

    if (ctx.user && ctx.user._id == recipe._ownerId) {
        recipe._isOwner = true;
    }

    next();
}
