import { APP_SETTINGS } from "./../utils/Constants";

export const UpdateDriver = async (object) => {
    const response = await fetch(`${APP_SETTINGS.API_URL}/api/driver/${object.id}`, {
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

export const DeleteDriver = async (object) => {
    const response = await fetch(`${APP_SETTINGS.API_URL}/api/driver/${object}`, {
        method: 'DELETE',
    })
        .then(result => { return result.json(); })
        .then(json => { return json; })
        .catch(error => { return error; })
    return response;
};
export const ActiveDriver = async (object) => {
    const response = await fetch(`${APP_SETTINGS.API_URL}/api/driver/active/${object}`, {
        method: 'PUT',
    })
        .then(result => { return result.json(); })
        .then(json => { return json; })
        .catch(error => { return error; })
    return response;
};
export const GetAllDrivers = async () => {
    const response = await fetch(`${APP_SETTINGS.API_URL}/api/driver/`, {
        method: 'GET'
    })
        .then(result => { return result.json(); })
        .then(json => { return json; })
        .catch(error => { return error; })
    return response;
};

export const GetOneDriver = async (object) => {
    const response = await fetch(`${APP_SETTINGS.API_URL}/api/driver/${object}`, {
        method: 'GET',
    })
        .then(result => { return result.json(); })
        .then(json => { return json; })
        .catch(error => { return error; })
    return response;
};
export const GetOneDriverPhone = async (object) => {
    const response = await fetch(`${APP_SETTINGS.API_URL}/api/driver/phone/${object}`, {
        method: 'GET',
    })
        .then(result => { return result.json(); })
        .then(json => { return json; })
        .catch(error => { return error; })
    return response;
};
