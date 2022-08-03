import * as api from "./api.js";


let endpoints = {
    byId: '/data/theaters/',
    edit: '/data/theaters/',
    delete: '/data/theaters/',
    create: '/data/theaters',    
    theatersAll: '/data/theaters?sortBy=_createdOn%20desc&distinct=title',
    theatersByUserId: '/data/theaters',
    likes: '/data/likes',
}

export async function getById(id) {
    return api.get(endpoints.byId + id);
}

export async function getAll() {
    return api.get(endpoints.theatersAll);
}

export async function getAllByUserId(userId) {
    return api.get(endpoints.theatersByUserId + `?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`);
}

export async function create(data) {
    return api.post(endpoints.create, data);
}

export async function edit(id, data) {
    return api.put(endpoints.edit + id, data);
}

export async function deleteTheaterById(id) {
    return api.del(endpoints.delete + id);
}

export async function gateLikesCount(theaterId) {
    return api.get(endpoints.likes + `?where=theaterId%3D%22${theaterId}%22&distinct=_ownerId&count`);
}

export async function like(data) {
    return api.post(endpoints.likes, data);
}

export async function getIsLikedByUserId(theaterId, userId) {
    return api.get(endpoints.likes + `?where=theaterId%3D%22${theaterId}%22%20and%20_ownerId%3D%22${userId}%22&count`);
}