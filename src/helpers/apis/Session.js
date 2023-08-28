import { APP_SETTINGS } from "../utils/Constants";

export const GetAllSessions = async () => {
    const response = await fetch(`${APP_SETTINGS.API_URL}/api/session/`, {
        method: 'GET'
    })
        .then(result => { return result.json(); })
        .then(json => { return json; })
        .catch(error => { return error; })
    return response;
};

