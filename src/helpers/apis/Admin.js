import { APP_SETTINGS } from "./../utils/Constants";

export const UpdateAdmin = async (object) => {
    const response = await fetch(`${APP_SETTINGS.API_URL}/api/admin/${object.id}`, {
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

export const DeleteAdmin = async (object) => {
    const response = await fetch(`${APP_SETTINGS.API_URL}/api/admin/${object}`, {
        method: 'DELETE',
    })
        .then(result => { return result.json(); })
        .then(json => { return json; })
        .catch(error => { return error; })
    return response;
};

export const GetAllAdmins = async () => {
    const response = await fetch(`${APP_SETTINGS.API_URL}/api/admin/`, {
        method: 'GET'
    })
        .then(result => { return result.json(); })
        .then(json => { return json; })
        .catch(error => { return error; })
    return response;
};

export const GetOneAdmin = async (object) => {
    const response = await fetch(`${APP_SETTINGS.API_URL}/api/admin/${object}`, {
        method: 'GET',
    })
        .then(result => { return result.json(); })
        .then(json => { return json; })
        .catch(error => { return error; })
    return response;
};

 export const GetAdminProfile = async (object) => {
    const response = await fetch(`${APP_SETTINGS.API_URL}/api/admin/profile/${object}`, {
        method: 'GET',
    })
        .then(result => { return result.json(); })
        .then(json => { return json; })
        .catch(error => { return error; })
    return response;
};
export const GetAdminCompanies = async (object) => {
    const response = await fetch(`${APP_SETTINGS.API_URL}/api/admin/company/${object}`, {
        method: 'GET',
    })
        .then(result => { return result.json(); })
        .then(json => { return json; })
        .catch(error => { return error; })
    return response;
}
export const DeleteAdminCompanies = async (object) => {
    const response = await fetch(`${APP_SETTINGS.API_URL}/api/admin/company/${object.id}`, {
        method: 'DELETE',
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
}
