import * as api from "./api.js";


let endpoints = {
    byId: '/data/memes/',
    edit: '/data/memes/',
    delete: '/data/memes/',
    create: '/data/memes',
    memesAll: '/data/memes?sortBy=_createdOn%20desc',
    memesByUserId: '/data/memes',
}



export async function getById(id) {
    return api.get(endpoints.byId + id);
}

export async function getAll() {
    return api.get(endpoints.memesAll);
}

export async function create(data) {
    return api.post(endpoints.create, data);
}

export async function edit(id, data) {
    return api.put(endpoints.edit + id, data);
}

export async function deleteMemeById(id) {
    return api.del(endpoints.delete + id);
}

export async function getAllOfUser(userId) {
    return api.get(endpoints.memesByUserId + `?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`);
}
