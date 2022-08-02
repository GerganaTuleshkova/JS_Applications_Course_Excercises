import * as api from "./api.js";


let endpoints = {
    byId: '/data/albums/',
    edit: '/data/albums/',
    delete: '/data/albums/',
    create: '/data/albums',
    albumsAll: `/data/albums?sortBy=_createdOn%20desc&distinct=name`,
    searchAlbums: `/data/albums`,
}

export async function getRecent() {
    return api.get(endpoints.recent);
}

export async function getById(id) {
    return api.get(endpoints.byId + id);
}

export async function getAll() {
    return api.get(endpoints.albumsAll);
}

export async function getBySearch(query) {
    return api.get(endpoints.searchAlbums + `?where=name%20LIKE%20%22${query}%22`);
}


export async function create(data) {
    return api.post(endpoints.create, data);
}

export async function edit(id, data) {
    return api.put(endpoints.edit + id, data);
}

export async function deleteAlbumById(id) {
    return api.del(endpoints.delete + id);
}