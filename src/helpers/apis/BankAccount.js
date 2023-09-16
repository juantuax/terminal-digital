import { APP_SETTINGS } from "./../utils/Constants";

export const CreateBankAccount = async (object) => {
    const response = await fetch(`${APP_SETTINGS.API_URL}/api/bank-account/new`, {
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

export const UpdateBankAccount = async (object) => {
    const response = await fetch(`${APP_SETTINGS.API_URL}/api/bank-account/${object.id}`, {
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

export const DeleteBankAccount = async (object) => {
    const response = await fetch(`${APP_SETTINGS.API_URL}/api/bank-account/${object}`, {
        method: 'DELETE',
    })
        .then(result => { return result.json(); })
        .then(json => { return json; })
        .catch(error => { return error; })
    return response;
};

export const GetAllBankAccounts = async () => {
    const response = await fetch(`${APP_SETTINGS.API_URL}/api/bank-account/`, {
        method: 'GET'
    })
        .then(result => { return result.json(); })
        .then(json => { return json; })
        .catch(error => { return error; })
    return response;
};


export const GetOneBankAccount = async (object) => {
    const response = await fetch(`${APP_SETTINGS.API_URL}/api/bank-account/${object}`, {
        method: 'GET',
    })
        .then(result => { return result.json(); })
        .then(json => { return json; })
        .catch(error => { return error; })
    return response;
};