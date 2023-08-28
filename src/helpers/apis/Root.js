import { APP_SETTINGS } from "../utils/Constants";

export const UpdateRoot = async (object) => {
    const response = await fetch(`${APP_SETTINGS.API_URL}/api/root/${object.id}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
            'Accept': 'application/json, text/plain, */*',
        },
        body: JSON.stringify(object),
    })
        .then(result => { return result.json(); })
        .then(json => { return json; })
        .catch(error => { return error; })
    return response;
};

export const DeleteRoot = async (object) => {
    const response = await fetch(`${APP_SETTINGS.API_URL}/api/root/${object}`, {
        method: 'DELETE',
    })
        .then(result => { return result.json(); })
        .then(json => { return json; })
        .catch(error => { return error; })
    return response;
};

export const GetAllRoots = async () => {
    const response = await fetch(`${APP_SETTINGS.API_URL}/api/root/`, {
        method: 'GET'
    })
        .then(result => { return result.json(); })
        .then(json => { return json; })
        .catch(error => { return error; })
    return response;
};

export const GetOneRoot = async (object) => {
    const response = await fetch(`${APP_SETTINGS.API_URL}/api/root/${object}`, {
        method: 'GET',
    })
        .then(result => { return result.json(); })
        .then(json => { return json; })
        .catch(error => { return error; })
    return response;
};
