import { APP_SETTINGS } from "./../utils/Constants";

export const CreateVersion = async (object) => {
    const response = await fetch(`${APP_SETTINGS.API_URL}/api/version/new`, {
        method: 'POST',
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

export const UpdateVersion = async (object) => {
    const response = await fetch(`${APP_SETTINGS.API_URL}/api/version/${object.id}`, {
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


export const GetAllVersions = async () => {
    const response = await fetch(`${APP_SETTINGS.API_URL}/api/version/`, {
        method: 'GET'
    })
        .then(result => { return result.json(); })
        .then(json => { return json; })
        .catch(error => { return error; })
    return response;
};

export const GetOneVersion = async (object) => {
    const response = await fetch(`${APP_SETTINGS.API_URL}/api/version/${object}`, {
        method: 'GET',
    })
        .then(result => { return result.json(); })
        .then(json => { return json; })
        .catch(error => { return error; })
    return response;
};