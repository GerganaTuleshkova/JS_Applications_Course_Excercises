import { getById } from '../api/pets.js';

export async function preload(ctx, next) {
    const petId = ctx.params.id;

    let pet = await getById(petId);
    ctx.pet = pet;

    if (ctx.user && ctx.user._id == pet._ownerId) {
        pet._isOwner = true;
    }

    next();
}
