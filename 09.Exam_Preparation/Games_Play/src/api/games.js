import * as api from "./api.js";


let pageSize = 2;
let pageSizeForRecent = 3;

let endpoints = {
    byId: '/data/games/',
    edit: '/data/games/',
    delete: '/data/games/',
    create: '/data/games',
    count: '/data/games?count',
    recent: `/data/games?sortBy=_createdOn%20desc&distinct=category&pageSize=${pageSizeForRecent}`,
    gamesAll: '/data/games?sortBy=_createdOn%20desc',
    createComments: '/data/comments',
    commentsAll: '/data/comments',

}

export async function getRecent() {
    return api.get(endpoints.recent);
}

export async function getById(id) {
    return api.get(endpoints.byId + id);
}

export async function getAll() {
    return api.get(endpoints.gamesAll);
}

export async function create(data) {
    return api.post(endpoints.create, data);
}

export async function edit(id, data) {
    return api.put(endpoints.edit + id, data);
}

export async function deleteById(id) {
    return api.del(endpoints.delete + id);
}

export async function createComment(data) {
    return api.post(endpoints.createComments, data);
}

export async function getCommentByGameId(gameId) {
    return api.get(endpoints.createComments + `?where=gameId%3D%22${gameId}%22`);
}