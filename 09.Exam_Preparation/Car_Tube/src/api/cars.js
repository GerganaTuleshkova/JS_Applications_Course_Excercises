import * as api from "./api.js";


let pageSize = 2;
let pageSizeForRecent = 3;

let endpoints = {
    byId: '/data/cars/',
    edit: '/data/cars/',
    delete: '/data/cars/',
    create: '/data/cars',
    carsAll: '/data/cars?sortBy=_createdOn%20desc',
    carsByUserId: '/data/cars',
    getByYear: '/data/cars',
    
}

export async function getRecent() {
    return api.get(endpoints.recent);
}

export async function getById(id) {
    return api.get(endpoints.byId + id);
}

export async function getAll() {
    return api.get(endpoints.carsAll);
}

export async function getAllByUserId(userId) {
    return api.get(endpoints.carsByUserId + `?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`);
}

export async function getByYear(year) {
    return api.get(endpoints.getByYear + `?where=year%3D${year}`);
}

export async function create(data) {
    return api.post(endpoints.create, data);
}

export async function edit(id, data) {
    return api.put(endpoints.edit + id, data);
}

export async function deleteCarById(id) {
    return api.del(endpoints.delete + id);
}