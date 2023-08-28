import { APP_SETTINGS } from "./../utils/Constants";

export const CreateReferral = async (object) => {
    const response = await fetch(`${APP_SETTINGS.API_URL}/api/referral/new`, {
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

export const CreateTestReferral = async (object) => {
    const response = await fetch(`${APP_SETTINGS.API_URL}/api/referral/newtest`, {
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

export const UpdateReferralFlag = async (object) => {
    const response = await fetch(`${APP_SETTINGS.API_URL}/api/referral/flag/${object.id}`, {
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

export const UpdateReferralStatus = async (object) => {
    const response = await fetch(`${APP_SETTINGS.API_URL}/api/referral/status/${object.id}`, {
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

export const DeleteReferral = async (object) => {
    const response = await fetch(`${APP_SETTINGS.API_URL}/api/referral/${object}`, {
        method: 'DELETE',
    })
        .then(result => { return result.json(); })
        .then(json => { return json; })
        .catch(error => { return error; })
    return response;
};

export const GetAllReferralsDriver = async (object) => {
    const response = await fetch(`${APP_SETTINGS.API_URL}/api/referral/driver/${object}`, {
        method: 'GET'
    })
        .then(result => { return result.json(); })
        .then(json => { return json; })
        .catch(error => { return error; })
    return response;
};

///// WEB GET ALL REFERRALS ADMINS
export const GetAllReferralsAdmin = async (object, page = 1) => {
    const response = await fetch(`${APP_SETTINGS.API_URL}/api/referral/admin/${object}?page=${page}`, {
        method: 'GET'
    })
        .then(result => { return result.json(); })
        .then(json => { return json; })
        .catch(error => { return error; })
    return response;
};

///// WEB ALL REFERRALS
export const GetAllReferrals = async (page = 1) => {
    const response = await fetch(`${APP_SETTINGS.API_URL}/api/referral?page=${page}`, {
        method: 'GET'
    })
        .then(result => { return result.json(); })
        .then(json => { return json; })
        .catch(error => { return error; })
    return response;
};

export const GetAllReferralsFlag = async () => {
    const response = await fetch(`${APP_SETTINGS.API_URL}/api/referral/flag`, {
        method: 'GET'
    })
        .then(result => { return result.json(); })
        .then(json => { return json; })
        .catch(error => { return error; })
    return response;
};

export const GetAllReferralsAdminFlag = async (object) => {
    const response = await fetch(`${APP_SETTINGS.API_URL}/api/referral/admin/flag/${object}`, {
        method: 'GET'
    })
        .then(result => { return result.json(); })
        .then(json => { return json; })
        .catch(error => { return error; })
    return response;
};

export const GetOneReferral = async (object) => {
    const response = await fetch(`${APP_SETTINGS.API_URL}/api/referral/${object}`, {
        method: 'GET',
    })
        .then(result => { return result.json(); })
        .then(json => { return json; })
        .catch(error => { return error; })
    return response;
};

export const DownloadPdf = async (id) => {
    const response = await fetch(`${APP_SETTINGS.API_URL}/api/referral/pdf/${id}`, {
        method: 'GET'
    })
        .then(result => { return result.json(); })
        .then(json => { return json; })
        .catch(error => { return error; })
    return response;
};

export const DownloadPdfs = async (id) => {
    const response = await fetch(`http://74.208.42.112:5000/pdfs/${id}.pdf`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/pdf',
        }
    })
        .then((response) => response.blob())
        .then((blob) => {
            const url = window.URL.createObjectURL(
                new Blob([blob]),
            );
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute(
                'download',
                `evidence${1}.pdf`,
            );
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
        });
};