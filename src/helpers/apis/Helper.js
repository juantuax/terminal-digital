import { APP_SETTINGS } from "./../utils/Constants";

export const UpdateHelper = async (object) => {
    const response = await fetch(`${APP_SETTINGS.API_URL}/api/helper/${object.id}`, {
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

export const DeleteHelper = async (object) => {
    const response = await fetch(`${APP_SETTINGS.API_URL}/api/helper/${object}`, {
        method: 'DELETE',
    })
        .then(result => { return result.json(); })
        .then(json => { return json; })
        .catch(error => { return error; })
    return response;
};
export const ActiveHelper = async (object) => {
    const response = await fetch(`${APP_SETTINGS.API_URL}/api/helper/active/${object}`, {
        method: 'PUT',
    })
        .then(result => { return result.json(); })
        .then(json => { return json; })
        .catch(error => { return error; })
    return response;
};
export const GetAllHelpers = async () => {
    const response = await fetch(`${APP_SETTINGS.API_URL}/api/helper/`, {
        method: 'GET'
    })
        .then(result => { return result.json(); })
        .then(json => { return json; })
        .catch(error => { return error; })
    return response;
};

export const GetOneHelper = async (object) => {
    const response = await fetch(`${APP_SETTINGS.API_URL}/api/helper/${object}`, {
        method: 'GET',
    })
        .then(result => { return result.json(); })
        .then(json => { return json; })
        .catch(error => { return error; })
    return response;
};
export const GetOneHelperPhone = async (object) => {
    const response = await fetch(`${APP_SETTINGS.API_URL}/api/helper/phone/${object}`, {
        method: 'GET',
    })
        .then(result => { return result.json(); })
        .then(json => { return json; })
        .catch(error => { return error; })
    return response;
};
