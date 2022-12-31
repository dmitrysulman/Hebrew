const API_URL = process.env.REACT_APP_API_URL;

const fetchApiGet = async (url) => {
    const response = await fetch(`${API_URL}${url}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
    }
    return response;
}

const fetchApiPost = async (url) => {
    const response = await fetch(`${API_URL}${url}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
    }
    return response;
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

const addVerb = async (formData) => {
    const data = {};
    data.infinitive = formData.infinitive;
    delete formData.infinitive;
    data.binyan = formData.binyan;
    delete formData.binyan;
    data.root = formData.root;
    delete formData.root;
    data.verbTranslations = [{
        language: formData.language,
        infinitiveTranslated: formData.infinitiveTranslated,
    }];
    delete formData.language;
    delete formData.infinitiveTranslated;
    data.verbForms = formData;
    console.log(data);
    // Object.values(verbForms.verbForms);

    // fetch(`${API_URL}/verbs/add`, {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(data)
    // }).then((response) => {
    //     if (!response.ok) {
    //         throw new Error('Network response was not OK');
    //     }
    //     // setVerbForms(clearVerbForms);
    //     // setValidated(false);
    // }).catch((error) => {
    //     console.error('There has been a problem with your fetch operation:', error);
    // });
};

export {getVerbForms, getBinyans, getLanguages, addVerb};