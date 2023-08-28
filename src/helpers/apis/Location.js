import { APP_SETTINGS } from "./../utils/Constants";

export const GetUserWebLocation = async (object) => {    
    const response = await fetch(`${APP_SETTINGS.API_URL}/api/location/${object.driver}/${object.referral}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            'Accept': 'application/json, text/plain, */*',
        }
    })
        .then(result => { return result.json(); })
        .then(json => { return json; })
        .catch(error => { return error; })
    return response;
};

export const GetWebLocation = async (object) => {    
    const response = await fetch(`${APP_SETTINGS.API_URL}/api/location/web/${object.referral}/${object.referral}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            'Accept': 'application/json, text/plain, */*',
        }
    })
        .then(result => { return result.json(); })
        .then(json => { return json; })
        .catch(error => { return error; })
    return response;
};

export const GetUserWeb = async (object) => {
    const response = await fetch(`${APP_SETTINGS.API_URL}/api/location/last/${object.driver}/${object.referral}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            'Accept': 'application/json, text/plain, */*',
        }
    })
        .then(result => { return result.json(); })
        .then(json => { return json; })
        .catch(error => { return error; })
    return response;
};

export const RequestLocation = async (object) => {
    const response = await fetch(`${APP_SETTINGS.API_URL}/api/location/request`, {
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