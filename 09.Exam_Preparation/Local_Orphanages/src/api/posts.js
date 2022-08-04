import * as api from "./api.js";


let pageSize = 2;
let pageSizeForRecent = 3;

let endpoints = {
    byId: '/data/posts/',
    edit: '/data/posts/',
    delete: '/data/posts/',
    create: '/data/posts',
    
    postsAll: '/data/posts?sortBy=_createdOn%20desc',
    postsByUserId: '/data/posts',
    donate: '/data/donations',
}



export async function getById(id) {
    return api.get(endpoints.byId + id);
}

export async function getAll() {
    return api.get(endpoints.postsAll);
}

export async function getAllByUserId(userId) {
    return api.get(endpoints.postsByUserId + `?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`);
}

export async function create(data) {
    return api.post(endpoints.create, data);
}

export async function edit(id, data) {
    return api.put(endpoints.edit + id, data);
}

export async function deletePostById(id) {
    return api.del(endpoints.delete + id);
}

export async function donate(data) {
    return api.post(endpoints.donate, data);
}

export async function getDonationsForPostByPostId(postId) {
    return api.get(endpoints.donate + `?where=postId%3D%22${postId}%22&distinct=_ownerId&count`);
}

export async function getHasUserDonatedToPost(postId, userId) {
    return api.get(endpoints.donate + `?where=postId%3D%22${postId}%22%20and%20_ownerId%3D%22${userId}%22&count`);
}