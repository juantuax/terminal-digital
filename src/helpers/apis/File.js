import { APP_SETTINGS } from "./../utils/Constants";

export const UploadFile = async (file) => {
    var formData = new FormData();

    if (file != null) {
        formData.append('image',
            file
        );
    }

    const response = await fetch(`${APP_SETTINGS.API_URL}/api/file/upload`, {
        method: 'POST',
        headers: {
            'Accept': '*/*'
        },
        body: formData
    })
        .then(result => { return result.json(); })
        .then(json => { return json; })
        .catch(error => { return error; })
    return response;
};

export const RemoveImage = async (object) => {
    const response = await fetch(`${APP_SETTINGS.API_URL}/api/file/remove`, {
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

export const GetOneImage = async (object) => {
    const response = await fetch(`${APP_SETTINGS.API_URL}/api/file/${object}`, {
        method: 'GET',
    })
        .then(result => { return result.json(); })
        .then(json => { return json; })
        .catch(error => { return error; })
    return response;
};
export const GetEvidence = async (object) => {
    const response = await fetch(`${APP_SETTINGS.API_URL}/api/document/${object}`, {
        method: 'GET',
    })
        .then(result => { return result.json(); })
        .then(json => { return json; })
        .catch(error => { return error; })
    return response;
};