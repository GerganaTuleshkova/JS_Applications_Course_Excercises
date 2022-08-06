import * as api from "./api.js";



let endpoints = {
    byId: '/data/offers/',
    edit: '/data/offers/',
    delete: '/data/offers/',
    create: '/data/offers',
    offersAll: '/data/offers?sortBy=_createdOn%20desc',
    applyForOffer: '/data/applications',
    offersAllByOfferId: '/data/applications',

}


export async function getById(id) {
    return api.get(endpoints.byId + id);
}

export async function getAll() {
    return api.get(endpoints.offersAll);
}

export async function create(data) {
    return api.post(endpoints.create, data);
}

export async function edit(id, data) {
    return api.put(endpoints.edit + id, data);
}

export async function deleteOfferById(id) {
    return api.del(endpoints.delete + id);
}

export async function applyForOfferById(data) {
    return api.post(endpoints.applyForOffer, data);
}

export async function getApplicationsCountByOfferId(offerId) {
    return api.get(endpoints.offersAllByOfferId + `?where=offerId%3D%22${offerId}%22&distinct=_ownerId&count`);
}

export async function getUserApplierForOffer(offerId, userId) {
    return api.get(endpoints.offersAllByOfferId + `?where=offerId%3D%22${offerId}%22%20and%20_ownerId%3D%22${userId}%22&count`);
}