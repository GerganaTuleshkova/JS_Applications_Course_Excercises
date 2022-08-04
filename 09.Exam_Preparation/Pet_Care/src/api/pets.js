import * as api from "./api.js";




let endpoints = {
    byId: '/data/pets/',
    edit: '/data/pets/',
    delete: '/data/pets/',
    create: '/data/pets',    
    petsAll: '/data/pets?sortBy=_createdOn%20desc&distinct=name',
    donate: '/data/donation',
}

export async function getRecent() {
    return api.get(endpoints.recent);
}

export async function getById(id) {
    return api.get(endpoints.byId + id);
}

export async function getAll() {
    return api.get(endpoints.petsAll);
}

export async function create(data) {
    return api.post(endpoints.create, data);
}

export async function edit(id, data) {
    return api.put(endpoints.edit + id, data);
}

export async function deletePetById(id) {
    return api.del(endpoints.delete + id);
}

export async function donateToPetById(data) {
    return api.post(endpoints.donate, data);
}

export async function getDonationForPetByPetId(petId) {
    return api.get(endpoints.donate + `?where=petId%3D%22${petId}%22&distinct=_ownerId&count`);
}

export async function checkIfUserIdDonatedToPetId(petId, userId) {
    return api.get(endpoints.donate + `?where=petId%3D%22${petId}%22%20and%20_ownerId%3D%22${userId}%22&count`);
}