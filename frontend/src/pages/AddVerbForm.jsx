import React, {useState, useEffect, useRef} from "react";
import {Button, Col, Form} from "react-bootstrap";

import {getVerbForms, getBinyans, getLanguages, addVerb} from "../api";
import {Await, Form as RouterForm, defer, useLoaderData, useNavigate} from "react-router-dom";
import AddVerbFormInputGroupText from "../components/AddVerbFormInputGroupText";

const clearVerbForms = {
    base: "",
    infinitive: "",
    binyan: "",
    root: "",
    verbTranslations: [{
        language: "RU",
        infinitiveTranslated: "",
    }],
    verbForms: {
        futureTenseFemaleSingularSecondPerson: {form: ""},
        futureTenseFemaleSingularThirdPerson: {form: ""},
        futureTenseMaleSingularSecondPerson: {form: ""},
        futureTenseMaleSingularThirdPerson: {form: ""},
        futureTensePluralFirstPerson: {form: ""},
        futureTensePluralSecondPerson: {form: ""},
        futureTensePluralThirdPerson: {form: ""},
        futureTenseSingularFirstPerson: {form: ""},
        pastTenseFemalePluralSecondPerson: {form: ""},
        pastTenseFemaleSingularSecondPerson: {form: ""},
        pastTenseFemaleSingularThirdPerson: {form: ""},
        pastTenseMalePluralSecondPerson: {form: ""},
        pastTenseMaleSingularSecondPerson: {form: ""},
        pastTenseMaleSingularThirdPerson: {form: ""},
        pastTensePluralFirstPerson: {form: ""},
        pastTensePluralThirdPerson: {form: ""},
        pastTenseSingularFirstPerson: {form: ""},
        presentTenseFemalePlural: {form: ""},
        presentTenseFemaleSingular: {form: ""},
        presentTenseMalePlural: {form: ""},
        presentTenseMaleSingular: {form: ""},
    }
};

export function loader() {
    let binyans = getBinyans();
    let languages = getLanguages();
    return defer({binyans, languages});
}

function AddVerbForm() {
    const [verbForms, setVerbForms] = useState(clearVerbForms);
    const [validated, setValidated] = useState(false);
    const [fieldErrors, setFieldErrors] = useState({});
    const base = useRef(null);

    const {binyans, languages} = useLoaderData();

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        const form = event.currentTarget;
        setValidated(true);
        event.preventDefault();
        if (form.checkValidity() === true) {
            const data = {};
            data.infinitive = verbForms.infinitive;
            data.binyan = verbForms.binyan;
            data.root = verbForms.root;
            data.verbTranslations = [{
                language: "RU",
                infinitiveTranslated: verbForms.verbTranslations[0].infinitiveTranslated,
                fieldKey: "infinitiveTranslated",
            }];
            data.verbForms = Object.entries(verbForms.verbForms).map(([k, v]) => {
                return {
                    ...v,
                    fieldKey: k
                };
            });
            const response = await addVerb(data);
            if (response.ok) {
                navigate("/");
            } else {
                event.stopPropagation();
                const errorResponse = await response.json();
                if (errorResponse.validationErrors) {
                    setFieldErrors(Object.fromEntries(
                            errorResponse.validationErrors.map(
                                element => {
                                    return [
                                        element.field, element.message
                                    ];
                                }
                            )
                        )
                    );
                    setValidated(false);
                }
            }
        } else {
            event.stopPropagation();
        }
    };

    const handleInputChange = (event) => {
        if (event.target.name === "binyan") {
            fillVerbFormsFromApi(event.target.value);
        }
        setVerbForms({
            ...verbForms,
            [event.target.name]: event.target.value
        });
    }

    const handleVerbFormsChange = (event) => {
        setVerbForms((prevVerbForms) => {
            prevVerbForms.verbForms[event.target.name].form = event.target.value;
            return {
                ...prevVerbForms,
            }
        });
    }

    const handleTranslationChange = (event) => {
        setVerbForms((prevVerbForms) => {
            const verbTranslations = [{
                ...prevVerbForms.verbTranslations[0],
                [event.target.name]: event.target.value
            }];
            return {
                ...prevVerbForms,
                verbTranslations: verbTranslations
            }
        });
    }

    const fillVerbFormsFromApi = (binyan) => {
        getVerbForms(verbForms.base, binyan).then(data => {
            if (data.verbForms) {
                for (let [k, v] of Object.entries(data)) {
                    setVerbForms((prevVerbForms) => ({
                        ...prevVerbForms,
                        [k]: v,
                    }));
                }
            }
        });
    }

    const handleBaseBlur = () => {
        if (verbForms.base.length > 1) {
            fillVerbFormsFromApi();
        }
    }

    useEffect(() => {
        base.current.focus();
    }, [])

    return <Col lg={{span: 10, offset: 1}}>
            <h2>Add new verb</h2>
            <Form as={RouterForm} className="mt-3 mb-3" noValidate validated={validated} onSubmit={handleSubmit}
                  method="post">
                <fieldset className="row mb-3">
                    <AddVerbFormInputGroupText
                        id="formBase"
                        label="Base"
                        name="base"
                        value={verbForms.base}
                        onChange={handleInputChange}
                        onBlur={handleBaseBlur}
                        refVal={base}
                        dir="rtl"
                        fieldErrors={fieldErrors}
                    />
                    <AddVerbFormInputGroupText
                        id="formInfinitiveTranslated"
                        label="Translation"
                        name="infinitiveTranslated"
                        value={verbForms.verbTranslations[0].infinitiveTranslated}
                        onChange={handleTranslationChange}
                        error="Please provide a valid translation."
                        fieldErrors={fieldErrors}
                    />
                    <Form.Group as={Col} controlId="formLanguage">
                        <Form.Label>Language</Form.Label>
                        <Form.Select
                            required
                            name="language"
                            value={verbForms.verbTranslations[0].language}
                            onChange={handleTranslationChange}
                        >
                            <React.Suspense
                                fallback={<option value="">Loading languages...</option>}
                            >
                                <Await
                                    resolve={languages}
                                    errorElement={<option value="">Error loading languages</option>}
                                >
                                    {languages => (
                                        <>
                                            <option disabled value="">Select language</option>
                                            {Object.entries(languages.languages).map(item => (
                                                <option key={item[0]} value={item[1]}>{item[1]}</option>
                                            ))}
                                        </>
                                    )}

                                </Await>
                            </React.Suspense>
                        </Form.Select>
                    </Form.Group>
                </fieldset>
                <fieldset className="row mb-3">
                    <Form.Group as={Col} controlId="formBinyan">
                        <Form.Label>Binyan</Form.Label>
                        <Form.Select
                            required
                            name="binyan"
                            value={verbForms.binyan}
                            onChange={handleInputChange}
                        >
                            <React.Suspense
                                fallback={<option value="">Loading binyans...</option>}
                            >
                                <Await
                                    resolve={binyans}
                                    errorElement={<option value="">Error loading binyans</option>}
                                >
                                    {binyans => (
                                        <>
                                            <option disabled value="">Select binyan</option>
                                            {Object.entries(binyans.binyans).map(item => (
                                                <option key={item[0]} value={item[1]}>{item[1]}</option>
                                            ))}
                                        </>
                                    )}

                                </Await>
                            </React.Suspense>
                        </Form.Select>
                    </Form.Group>
                    <AddVerbFormInputGroupText
                        id="formInfinitive"
                        label="Infinitive"
                        name="infinitive"
                        value={verbForms.infinitive}
                        onChange={handleInputChange}
                        dir="rtl"
                        fieldErrors={fieldErrors}
                    />
                    <AddVerbFormInputGroupText
                        id="formRoot"
                        label="Root"
                        name="root"
                        value={verbForms.root}
                        onChange={handleInputChange}
                        dir="rtl"
                        fieldErrors={fieldErrors}
                    />
                </fieldset>
                <fieldset className="row mb-3">
                    <legend>Present Tense</legend>
                    <AddVerbFormInputGroupText
                        id="formPresentTenseMaleSingular"
                        label="Male Singular"
                        name="presentTenseMaleSingular"
                        value={verbForms.verbForms.presentTenseMaleSingular.form}
                        onChange={handleVerbFormsChange}
                        dir="rtl"
                        fieldErrors={fieldErrors}
                    />
                    <AddVerbFormInputGroupText
                        id="formPresentTenseFemaleSingular"
                        label="Female Singular"
                        name="presentTenseFemaleSingular"
                        value={verbForms.verbForms.presentTenseFemaleSingular.form}
                        onChange={handleVerbFormsChange}
                        dir="rtl"
                        fieldErrors={fieldErrors}
                    />
                    <AddVerbFormInputGroupText
                        id="formPresentTenseMalePlural"
                        label="Male Plural"
                        name="presentTenseMalePlural"
                        value={verbForms.verbForms.presentTenseMalePlural.form}
                        onChange={handleVerbFormsChange}
                        dir="rtl"
                        fieldErrors={fieldErrors}
                    />
                    <AddVerbFormInputGroupText
                        id="formPresentTenseFemalePlural"
                        label="Female Plural"
                        name="presentTenseFemalePlural"
                        value={verbForms.verbForms.presentTenseFemalePlural.form}
                        onChange={handleVerbFormsChange}
                        dir="rtl"
                        fieldErrors={fieldErrors}
                    />
                </fieldset>
                <fieldset className="row mb-3">
                    <legend>Past Tense</legend>
                    <AddVerbFormInputGroupText
                        id="formPastTenseSingularFirstPerson"
                        label="Singular First Person"
                        name="pastTenseSingularFirstPerson"
                        value={verbForms.verbForms.pastTenseSingularFirstPerson.form}
                        onChange={handleVerbFormsChange}
                        dir="rtl"
                        fieldErrors={fieldErrors}
                    />
                    <AddVerbFormInputGroupText
                        id="formPastTensePluralFirstPerson"
                        label="Plural First Person"
                        name="pastTensePluralFirstPerson"
                        value={verbForms.verbForms.pastTensePluralFirstPerson.form}
                        onChange={handleVerbFormsChange}
                        dir="rtl"
                        fieldErrors={fieldErrors}
                    />
                </fieldset>
                <fieldset className="row mb-3">
                    <AddVerbFormInputGroupText
                        id="formPastTenseMaleSingularSecondPerson"
                        label="Male Singular Second Person"
                        name="pastTenseMaleSingularSecondPerson"
                        value={verbForms.verbForms.pastTenseMaleSingularSecondPerson.form}
                        onChange={handleVerbFormsChange}
                        dir="rtl"
                        fieldErrors={fieldErrors}
                    />
                    <AddVerbFormInputGroupText
                        id="formPastTenseFemaleSingularSecondPerson"
                        label="Female Singular Second Person"
                        name="pastTenseFemaleSingularSecondPerson"
                        value={verbForms.verbForms.pastTenseFemaleSingularSecondPerson.form}
                        onChange={handleVerbFormsChange}
                        dir="rtl"
                        fieldErrors={fieldErrors}
                    />
                    <AddVerbFormInputGroupText
                        id="formPastTenseMalePluralSecondPerson"
                        label="Male Plural Second Person"
                        name="pastTenseMalePluralSecondPerson"
                        value={verbForms.verbForms.pastTenseMalePluralSecondPerson.form}
                        onChange={handleVerbFormsChange}
                        dir="rtl"
                        fieldErrors={fieldErrors}
                    />
                    <AddVerbFormInputGroupText
                        id="formPastTenseFemalePluralSecondPerson"
                        label="Female Plural Second Person"
                        name="pastTenseFemalePluralSecondPerson"
                        value={verbForms.verbForms.pastTenseFemalePluralSecondPerson.form}
                        onChange={handleVerbFormsChange}
                        dir="rtl"
                        fieldErrors={fieldErrors}
                    />
                </fieldset>
                <fieldset className="row mb-3">
                    <AddVerbFormInputGroupText
                        className="col-lg-3"
                        id="formPastTenseMaleSingularThirdPerson"
                        label="Male Singular Third Person"
                        name="pastTenseMaleSingularThirdPerson"
                        value={verbForms.verbForms.pastTenseMaleSingularThirdPerson.form}
                        onChange={handleVerbFormsChange}
                        dir="rtl"
                        fieldErrors={fieldErrors}
                    />
                    <AddVerbFormInputGroupText
                        className="col-lg-3"
                        id="formPastTenseFemaleSingularThirdPerson"
                        label="Female Singular Third Person"
                        name="pastTenseFemaleSingularThirdPerson"
                        value={verbForms.verbForms.pastTenseFemaleSingularThirdPerson.form}
                        onChange={handleVerbFormsChange}
                        dir="rtl"
                        fieldErrors={fieldErrors}
                    />
                    <AddVerbFormInputGroupText
                        id="formPastTensePluralThirdPerson"
                        label="Plural Third Person"
                        name="pastTensePluralThirdPerson"
                        value={verbForms.verbForms.pastTensePluralThirdPerson.form}
                        onChange={handleVerbFormsChange}
                        dir="rtl"
                        fieldErrors={fieldErrors}
                    />
                </fieldset>
                <fieldset className="row mb-3">
                    <legend>Future Tense</legend>
                    <AddVerbFormInputGroupText
                        id="formFutureTenseSingularFirstPerson"
                        label="Singular First Person"
                        name="futureTenseSingularFirstPerson"
                        value={verbForms.verbForms.futureTenseSingularFirstPerson.form}
                        onChange={handleVerbFormsChange}
                        dir="rtl"
                        fieldErrors={fieldErrors}
                    />
                    <AddVerbFormInputGroupText
                        id="formFutureTensePluralFirstPerson"
                        label="Plural First Person"
                        name="futureTensePluralFirstPerson"
                        value={verbForms.verbForms.futureTensePluralFirstPerson.form}
                        onChange={handleVerbFormsChange}
                        dir="rtl"
                        fieldErrors={fieldErrors}
                    />
                </fieldset>
                <fieldset className="row mb-3">
                    <AddVerbFormInputGroupText
                        className="col-lg-3"
                        id="formFutureTenseMaleSingularSecondPerson"
                        label="Male Singular Second Person"
                        name="futureTenseMaleSingularSecondPerson"
                        value={verbForms.verbForms.futureTenseMaleSingularSecondPerson.form}
                        onChange={handleVerbFormsChange}
                        dir="rtl"
                        fieldErrors={fieldErrors}
                    />
                    <AddVerbFormInputGroupText
                        className="col-lg-3"
                        id="formFutureTenseFemaleSingularSecondPerson"
                        label="Female Singular Second Person"
                        name="futureTenseFemaleSingularSecondPerson"
                        value={verbForms.verbForms.futureTenseFemaleSingularSecondPerson.form}
                        onChange={handleVerbFormsChange}
                        dir="rtl"
                        fieldErrors={fieldErrors}
                    />
                    <AddVerbFormInputGroupText
                        id="formFutureTensePluralSecondPerson"
                        label="Plural Second Person"
                        name="futureTensePluralSecondPerson"
                        value={verbForms.verbForms.futureTensePluralSecondPerson.form}
                        onChange={handleVerbFormsChange}
                        dir="rtl"
                        fieldErrors={fieldErrors}
                    />
                </fieldset>
                <fieldset className="row mb-3">
                    <AddVerbFormInputGroupText
                        className="col-lg-3"
                        id="formFutureTenseMaleSingularThirdPerson"
                        label="Male Singular Third Person"
                        name="futureTenseMaleSingularThirdPerson"
                        value={verbForms.verbForms.futureTenseMaleSingularThirdPerson.form}
                        onChange={handleVerbFormsChange}
                        dir="rtl"
                        fieldErrors={fieldErrors}
                    />
                    <AddVerbFormInputGroupText
                        className="col-lg-3"
                        id="formFutureTenseFemaleSingularThirdPerson"
                        label="Female Singular Third Person"
                        name="futureTenseFemaleSingularThirdPerson"
                        value={verbForms.verbForms.futureTenseFemaleSingularThirdPerson.form}
                        onChange={handleVerbFormsChange}
                        dir="rtl"
                        fieldErrors={fieldErrors}
                    />
                    <AddVerbFormInputGroupText
                        id="formFutureTensePluralThirdPerson"
                        label="Plural Third Person"
                        name="futureTensePluralThirdPerson"
                        value={verbForms.verbForms.futureTensePluralThirdPerson.form}
                        onChange={handleVerbFormsChange}
                        dir="rtl"
                        fieldErrors={fieldErrors}
                    />
                </fieldset>
                <Button type="submit">
                    Add Verb
                </Button>
            </Form>
        </Col>
}

export default AddVerbForm