let host = 'http://localhost:3030';


async function request(method, pathname, dataInput) {
    let userData = JSON.parse(sessionStorage.getItem('userData'));

    let options = {
        method,
        headers: {},
    }

    // dataInput is an object
    if (dataInput !== undefined) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(dataInput);
    }

    if (userData != null) {
        options.headers['X-Authorization'] = userData.accessToken;
    }

    try {
        let response = await fetch(host + pathname, options);

        if (response.ok == false) {
            let error = await response.json();
            throw new Error(error.message)
        }

        if (response.status == 204) {
            return res;
        } else {
            return await response.json();
        }

    } catch (error) {
        alert(error.message);
        throw error;
    }
}


export async function get(url) {
    return request('GET', url);
}

export async function post(url, data) {
    return request('POST', url, data);
}

export function put(url, data) {
    return request('PUT', url, data);
}

export function del(url) {
    return request('DELETE', url);
}

