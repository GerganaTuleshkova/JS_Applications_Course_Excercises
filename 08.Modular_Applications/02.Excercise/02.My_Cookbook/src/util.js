export function getUserData() {
    return JSON.parse(sessionStorage.getItem('userData'));
}

export function getAccessToken() {
    let user = getUserData();
    if (user) {
        return user.accessToken;
    } else {
        return null;
    }
}

export function clearUserData() {
    sessionStorage.removeItem('userData')
}

export function setUserData(data) {
    sessionStorage.setItem('userData', JSON.stringify(data))
}

export function createSubmitHandler(ctx, handler) {
    return function (event) {
        event.preventDefault();
        let formData = Object.fromEntries(new FormData(event.target));
        handler(ctx, formData, event);
    }
}