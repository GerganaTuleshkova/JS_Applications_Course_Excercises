let baseUrl = 'http://localhost:3030';


async function request(method, urlEnding, dataInput) {
    // let userData = JSON.parse(sessionStorage.getItem('userData'));
    // with localStorage instead of session storage

    let options = {
        method,
        headers: {},
    }

    if (dataInput !== undefined) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(dataInput);
    }

    let userData = JSON.parse(localStorage.getItem('userData'));
    if (userData != null) {
        options.headers['X-Authorization'] = userData.accessToken;
    }

    try {
        let response = await fetch(baseUrl + urlEnding, options);

        if (response.ok == false) {

            if (response.status == 403) {
                localStorage.removeItem('userData');
            }
            let error = await response.json();
            throw new Error(error.message)
        }

        if (response.status == 204) {
            return response;
        } else {
            return await response.json();
        }

    } catch (error) {
        alert(error.message);
        throw error;
    }
}

export async function get(urlEnding) {
    return request('GET', urlEnding);
}

export async function post(urlEnding, data) {
    return request('POST', urlEnding, data);
}

export async function deleteRequest(urlEnding) {
    return request('DELETE', urlEnding);
}
