import { APP_SETTINGS } from "./../utils/Constants";

export const CreateCompany = async (object) => {
    const response = await fetch(`${APP_SETTINGS.API_URL}/api/unity/new`, {
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

export const UpdateCompany = async (object) => {
    const response = await fetch(`${APP_SETTINGS.API_URL}/api/unity/${object.id}`, {
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

export const DeleteCompany = async (object) => {
    const response = await fetch(`${APP_SETTINGS.API_URL}/api/unity/${object}`, {
        method: 'DELETE',
    })
        .then(result => { return result.json(); })
        .then(json => { return json; })
        .catch(error => { return error; })
    return response;
};

export const ActiveCompany = async (object) => {
    const response = await fetch(`${APP_SETTINGS.API_URL}/api/unity/active/${object}`, {
        method: 'PUT',
    })
        .then(result => { return result.json(); })
        .then(json => { return json; })
        .catch(error => { return error; })
    return response;
};
export const GetAllCompanies = async () => {
    const response = await fetch(`${APP_SETTINGS.API_URL}/api/unity/`, {
        method: 'GET'
    })
        .then(result => { return result.json(); })
        .then(json => { return json; })
        .catch(error => { return error; })
    return response;
};
export const GetAllCompaniesActive = async () => {
    const response = await fetch(`${APP_SETTINGS.API_URL}/api/unity/active`, {
        method: 'GET'
    })
        .then(result => { return result.json(); })
        .then(json => { return json; })
        .catch(error => { return error; })
    return response;
};

export const GetOneCompany = async (object) => {
    const response = await fetch(`${APP_SETTINGS.API_URL}/api/unity/${object}`, {
        method: 'GET',
    })
        .then(result => { return result.json(); })
        .then(json => { return json; })
        .catch(error => { return error; })
    return response;
};