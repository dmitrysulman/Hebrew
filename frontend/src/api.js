const API_URL = process.env.REACT_APP_API_URL;

const fetchApiGet = async (url) => {
    const response = await fetch(`${API_URL}${url}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    });
    if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
    }
    return response;
}

const fetchApiPost = async (url, data) => {
    return await fetch(`${API_URL}${url}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
}

const getVerbForms = async (base, binayn) => {
    const response = await fetchApiGet(`/verbs/get_forms/${base}${binayn ? "?binyan=" + binayn : ""}`);
    return await response.json();
}

const getBinyans = async () => {
    const response = await fetchApiGet("/verbs/get_binyans");
    return await response.json();
}

const getLanguages = async () => {
    const response = await fetchApiGet("/verbs/get_languages");
    return await response.json();
}

const addVerb = async (data) => {
    return await fetchApiPost("/verbs/add", data);
};

const getAllVerbs = async () => {
    const response = await fetchApiGet("/verbs/all");
    return await response.json();
}

export {getVerbForms, getBinyans, getLanguages, addVerb, getAllVerbs};