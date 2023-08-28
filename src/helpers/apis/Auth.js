import { APP_SETTINGS } from "./../utils/Constants";

export const Singin = async (object) => {
    const response = await fetch(`${APP_SETTINGS.API_URL}/api/auth/signin`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            'Accept': 'application/json, text/plain, */*',
        },
        body: JSON.stringify(object),
    })
        .then(result => { return result.json(); })
        .then(json => { return json; })
        .catch(error => { return null; })
    return response;
};

export const Singup = async (object) => {
    const response = await fetch(`${APP_SETTINGS.API_URL}/api/auth/signup`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            'Accept': 'application/json, text/plain, */*',
        },
        body: JSON.stringify(object),
    })
        .then(result => { return result.json(); })
        .then(json => { return json; })
        .catch(error => { return null; })
    return response;
};

export const Singout = async (token) => {
    const response = await fetch(`${APP_SETTINGS.API_URL}/api/auth/signout`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            'Accept': 'application/json, text/plain, */*',
            'Authorization': `Bearer ${token}`
        }
    })
        .then(result => { return result.json(); })
        .then(json => { return json; })
        .catch(error => { return null; })
    return response;
};