import * as api from "./api.js";


let pageSize = 2;
let pageSizeForRecent = 3;

let endpoints = {
    byId: '/data/recipes/',
    edit: '/data/recipes/',
    delete: '/data/recipes/',
    create: '/data/recipes',
    count: '/data/recipes?count',
    recent: `/data/recipes?select=_id%2Cname%2Cimg&sortBy=_createdOn%20desc&pageSize=${pageSizeForRecent}`,
    recipes: `/data/recipes?sortBy=_createdOn%20desc&pageSize=${pageSize}&offset=`,
}

export async function getRecent() {
    return api.get(endpoints.recent);
}

export async function getById(id) {
    return api.get(endpoints.byId + id);
}

export async function getAll(page = 1, search) {

    let dataUrl = endpoints.recipes + (page - 1) * pageSize;
    let sizeUrl = endpoints.count;


    if (search != undefined && search != '') {
        const param = '&where=' + encodeURIComponent(`name LIKE "${search}"`);

        dataUrl += param;
        sizeUrl += param;
    }


    const [recipes, count] = await Promise.all([
        api.get(dataUrl),
        api.get(sizeUrl),
    ]);


    return {
        recipes,
        pages: Math.ceil(count / pageSize),
    }
}

export async function create(data) {
    return api.post(endpoints.create, data);
}

export async function edit(id, data) {
    return api.put(endpoints.edit + id, data);
}

export async function deleteRecipeById(id) {
    return api.del(endpoints.delete + id);
}