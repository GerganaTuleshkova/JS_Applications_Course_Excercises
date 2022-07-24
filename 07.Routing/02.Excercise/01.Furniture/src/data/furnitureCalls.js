import * as api from './api.js';


const endpoints = {
    furnitureAll: '/data/catalog',
    productById: '/data/catalog/',
    create: '/data/catalog',
    edit: '/data/catalog/',
    delete: '/data/catalog/',
    myProducts: (userId) => `/data/catalog?where=_ownerId%3D%22${userId}%22`,
};

export async function getFurnitureAll() {
    return api.get(endpoints.furnitureAll);
}

export async function getMyProducts(userId) {
    return api.get(endpoints.myProducts(userId));
}

export async function getProductById(id) {
    return api.get(endpoints.productById + id);
}

export async function create(productData) {
    
    if (productData.make.length < 4) {
        return alert('Make must be at least 4 symbols long!');
    }
    if (productData.model.length < 4) {
        return alert('Model must be at least 4 symbols long!');
    }

    if (Number(productData.year) < 1950 || Number(productData.year) > 2050) {
        return alert('Invalid year!');
    }
    if (productData.description.length <= 10) {
        return alert('Description must be at least 11 symbols long!');
    }
    if (Number(productData.price) <= 0) {
        return alert('Price must be a positive number');
    }
    if (productData.img == '') {
        return alert('Url is required');
    }

    // checkInput(productData);

    return await api.post(endpoints.create, productData);    
}

export async function edit(id, productData) {

    // checkInput(productData);

    if (productData.make.length < 4) {
        return alert('Make must be at least 4 symbols long!');
    }
    if (productData.model.length < 4) {
        return alert('Model must be at least 4 symbols long!');
    }

    if (Number(productData.year) < 1950 || Number(productData.year) > 2050) {
        return alert('Invalid year!');
    }
    if (productData.description.length <= 10) {
        return alert('Description must be at least 11 symbols long!');
    }
    if (Number(productData.price) <= 0) {
        return alert('Price must be a positive number');
    }
    if (productData.img == '') {
        return alert('Url is required');
    }


    return await api.put((endpoints.edit + id), productData);    
}

export async function deleteProduct(id) {

    return await api.del(endpoints.delete + id);    
}

function checkInput(productData) {
    if (productData.make.length < 4) {
        return alert('Make must be at least 4 symbols long!');
    }
    if (productData.model.length < 4) {
        return alert('Model must be at least 4 symbols long!');
    }

    if (Number(productData.year) < 1950 || Number(productData.year) > 2050) {
        return alert('Invalid year!');
    }
    if (productData.description.length <= 10) {
        return alert('Description must be at least 11 symbols long!');
    }
    if (Number(productData.price) <= 0) {
        return alert('Price must be a positive number');
    }
    if (productData.img == '') {
        return alert('Url is required');
    }

}