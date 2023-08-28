import { APP_SETTINGS } from "./../utils/Constants";

export const CreateClient = async (object) => {
    const response = await fetch(`${APP_SETTINGS.API_URL}/api/client/new`, {
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

export const UpdateClient = async (object) => {
    const response = await fetch(`${APP_SETTINGS.API_URL}/api/client/${object.id}`, {
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

export const DeleteClient = async (object) => {
    const response = await fetch(`${APP_SETTINGS.API_URL}/api/client/${object}`, {
        method: 'DELETE',
    })
        .then(result => { return result.json(); })
        .then(json => { return json; })
        .catch(error => { return error; })
    return response;
};

export const GetAllClients = async () => {
    const response = await fetch(`${APP_SETTINGS.API_URL}/api/client/`, {
        method: 'GET'
    })
        .then(result => { return result.json(); })
        .then(json => { return json; })
        .catch(error => { return error; })
    return response;
};
export const GetAllClientsActive = async () => {
    const response = await fetch(`${APP_SETTINGS.API_URL}/api/client/active`, {
        method: 'GET'
    })
        .then(result => { return result.json(); })
        .then(json => { return json; })
        .catch(error => { return error; })
    return response;
};
export const ActiveClient = async (object) => {
    const response = await fetch(`${APP_SETTINGS.API_URL}/api/client/active/${object}`, {
        method: 'PUT',
    })
        .then(result => { return result.json(); })
        .then(json => { return json; })
        .catch(error => { return error; })
    return response;
};
export const GetOneClient = async (object) => {
    const response = await fetch(`${APP_SETTINGS.API_URL}/api/client/${object}`, {
        method: 'GET',
    })
        .then(result => { return result.json(); })
        .then(json => { return json; })
        .catch(error => { return error; })
    return response;
};