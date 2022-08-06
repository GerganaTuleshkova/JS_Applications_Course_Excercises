import { getById } from '../api/cars.js';

export async function preload(ctx, next) {
    const carId = ctx.params.id;

    let car = await getById(carId);
    ctx.car = car;

    if (ctx.user && ctx.user._id == car._ownerId) {
        car._isOwner = true;
    }

    next();
}
