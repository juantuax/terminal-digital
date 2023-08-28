import { APP_SETTINGS } from "../utils/Constants";

export const GetAllTerms = async () => {
    const response = await fetch(`${APP_SETTINGS.API_URL}/api/terms/`, {
        method: 'GET'
    })
        .then(result => { return result.json(); })
        .then(json => { return json; })
        .catch(error => { return error; })
    return response;
};

