import * as api from "./api.js";

let endpoints = {
    byId: '/data/books/',
    edit: '/data/books/',
    delete: '/data/books/',
    create: '/data/books',
    booksAll: '/data/books?sortBy=_createdOn%20desc',
    booksByUserId: '/data/books',
    likes: '/data/likes',
    likesCount: '/data/likes',
    likedByUser: '/data/likes',
}

export async function getByUserId(userId) {
    return api.get(endpoints.booksByUserId + `?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`);
}

export async function getById(id) {
    return api.get(endpoints.byId + id);
}

export async function getAll() {
    return api.get(endpoints.booksAll);
}

export async function create(data) {
    return api.post(endpoints.create, data);
}

export async function edit(id, data) {
    return api.put(endpoints.edit + id, data);
}

export async function deleteBookById(id) {
    return api.del(endpoints.delete + id);
}

export async function like(bookId) {
    return api.post(endpoints.likes, bookId);
}


export async function likesCount(bookId) {
    return api.get(endpoints.likes + `?where=bookId%3D%22${bookId}%22&distinct=_ownerId&count`);
}

export async function isLikedByUser(bookId, userId) {
    return api.get(endpoints.likedByUser + `?where=bookId%3D%22${bookId}%22%20and%20_ownerId%3D%22${userId}%22&count`);
}