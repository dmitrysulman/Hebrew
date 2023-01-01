import React, {useState, useEffect, useRef} from "react";
import {Button, Col, Form} from "react-bootstrap";

import {getVerbForms, getBinyans, getLanguages, addVerb} from "../api";
import {Await, Form as RouterForm, defer, useLoaderData, useNavigate} from "react-router-dom";

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
            data.verbTranslations = verbForms.verbTranslations;
            data.verbForms = Object.values(verbForms.verbForms);
            const response = await addVerb(data);
            if (response.ok) {
                navigate("/");
            } else {
                event.stopPropagation();
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
            prevVerbForms.verbTranslations[0][event.target.name] = event.target.value;
            return {
                ...prevVerbForms,
            }
        });
    }

    const fillVerbFormsFromApi = (binyan) => {
        getVerbForms(verbForms.base, binyan).then(data => {
            for (let [k, v] of Object.entries(data)) {
                setVerbForms((prevVerbForms) => ({
                    ...prevVerbForms,
                    [k]: v,
                }));
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

    return (
        <Col lg={{span: 10, offset: 1}}>
            <Form as={RouterForm} className="mt-3 mb-3" noValidate validated={validated} onSubmit={handleSubmit}
                  method="post">
                <fieldset className="row mb-3">
                    <Form.Group as={Col} controlId="formBase">
                        <Form.Label>Base</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            name="base"
                            placeholder="Verb"
                            value={verbForms.base}
                            onChange={handleInputChange}
                            onBlur={handleBaseBlur}
                            ref={base}
                            dir="rtl"
                        />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid verb.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formTranslation">
                        <Form.Label>Translation</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            name="infinitiveTranslated"
                            placeholder="Translation"
                            value={verbForms.verbTranslations[0].infinitiveTranslated}
                            onChange={handleTranslationChange}
                        />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid verb.
                        </Form.Control.Feedback>
                    </Form.Group>
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
                                    {(languages) => (
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
                                    {(binyans) => (
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
                    <Form.Group as={Col} controlId="formInfinitive">
                        <Form.Label>Infinitive</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            name="infinitive"
                            placeholder="Infinitive"
                            value={verbForms.infinitive}
                            onChange={handleInputChange}
                            dir="rtl"
                        />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid verb.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formRoot">
                        <Form.Label>Root</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            name="root"
                            placeholder="Root"
                            value={verbForms.root}
                            onChange={handleInputChange}
                            dir="rtl"
                        />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid verb.
                        </Form.Control.Feedback>
                    </Form.Group>
                </fieldset>
                <fieldset className="row mb-3">
                    <legend>Present Tense</legend>
                    <Form.Group as={Col} controlId="formPresentTenseMaleSingular">
                        <Form.Label>Male Singular</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            name="presentTenseMaleSingular"
                            placeholder="Male Singular"
                            value={verbForms.verbForms.presentTenseMaleSingular.form}
                            onChange={handleVerbFormsChange}
                            dir="rtl"
                        />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid verb.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formPresentTenseFemaleSingular">
                        <Form.Label>Female Singular</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            name="presentTenseFemaleSingular"
                            placeholder="Female Singular"
                            value={verbForms.verbForms.presentTenseFemaleSingular.form}
                            onChange={handleVerbFormsChange}
                            dir="rtl"
                        />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid verb.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formPresentTenseMalePlural">
                        <Form.Label>Male Plural</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            name="presentTenseMalePlural"
                            placeholder="Male Plural"
                            value={verbForms.verbForms.presentTenseMalePlural.form}
                            onChange={handleVerbFormsChange}
                            dir="rtl"
                        />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid verb.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formRresentTenseFemalePlural">
                        <Form.Label>Female Plural</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            name="presentTenseFemalePlural"
                            placeholder="Female Plural"
                            value={verbForms.verbForms.presentTenseFemalePlural.form}
                            onChange={handleVerbFormsChange}
                            dir="rtl"
                        />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid verb.
                        </Form.Control.Feedback>
                    </Form.Group>
                </fieldset>
                <fieldset className="row mb-3">
                    <legend>Past Tense</legend>
                    <Form.Group as={Col} controlId="formPastTenseSingularFirstPerson">
                        <Form.Label>Singular First Person</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            name="pastTenseSingularFirstPerson"
                            placeholder="Singular First Person"
                            value={verbForms.verbForms.pastTenseSingularFirstPerson.form}
                            onChange={handleVerbFormsChange}
                            dir="rtl"
                        />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid verb.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formPastTensePluralFirstPerson">
                        <Form.Label>Plural First Person</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            name="pastTensePluralFirstPerson"
                            placeholder="Plural First Person"
                            value={verbForms.verbForms.pastTensePluralFirstPerson.form}
                            onChange={handleVerbFormsChange}
                            dir="rtl"
                        />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid verb.
                        </Form.Control.Feedback>
                    </Form.Group>
                </fieldset>
                <fieldset className="row mb-3">
                    <Form.Group as={Col} controlId="formPastTenseMaleSingularSecondPerson">
                        <Form.Label>Male Singular Second Person</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            name="pastTenseMaleSingularSecondPerson"
                            placeholder="Male Singular Second Person"
                            value={verbForms.verbForms.pastTenseMaleSingularSecondPerson.form}
                            onChange={handleVerbFormsChange}
                            dir="rtl"
                        />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid verb.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formPastTenseFemaleSingularSecondPerson">
                        <Form.Label>Female Singular Second Person</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            name="pastTenseFemaleSingularSecondPerson"
                            placeholder="Female Singular Second Person"
                            value={verbForms.verbForms.pastTenseFemaleSingularSecondPerson.form}
                            onChange={handleVerbFormsChange}
                            dir="rtl"
                        />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid verb.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formPastTenseMalePluralSecondPerson">
                        <Form.Label>Male Plural Second Person</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            name="pastTenseMalePluralSecondPerson"
                            placeholder="Male Plural Second Person"
                            value={verbForms.verbForms.pastTenseMalePluralSecondPerson.form}
                            onChange={handleVerbFormsChange}
                            dir="rtl"
                        />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid verb.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formPastTenseFemalePluralSecondPerson">
                        <Form.Label>Female Plural Second Person</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            name="pastTenseFemalePluralSecondPerson"
                            placeholder="Female Plural Second Person"
                            value={verbForms.verbForms.pastTenseFemalePluralSecondPerson.form}
                            onChange={handleVerbFormsChange}
                            dir="rtl"
                        />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid verb.
                        </Form.Control.Feedback>
                    </Form.Group>
                </fieldset>
                <fieldset className="row mb-3">
                    <Form.Group className="col-lg-3" controlId="formPastTenseMaleSingularThirdPerson">
                        <Form.Label>Male Singular Third Person</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            name="pastTenseMaleSingularThirdPerson"
                            placeholder="Male Singular Third Person"
                            value={verbForms.verbForms.pastTenseMaleSingularThirdPerson.form}
                            onChange={handleVerbFormsChange}
                            dir="rtl"
                        />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid verb.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="col-lg-3" controlId="formPastTenseFemaleSingularThirdPerson">
                        <Form.Label>Female Singular Third Person</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            name="pastTenseFemaleSingularThirdPerson"
                            placeholder="Female Singular Third Person"
                            value={verbForms.verbForms.pastTenseFemaleSingularThirdPerson.form}
                            onChange={handleVerbFormsChange}
                            dir="rtl"
                        />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid verb.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formPastTensePluralThirdPerson">
                        <Form.Label>Plural Third Person</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            name="pastTensePluralThirdPerson"
                            placeholder="Plural Third Person"
                            value={verbForms.verbForms.pastTensePluralThirdPerson.form}
                            onChange={handleVerbFormsChange}
                            dir="rtl"
                        />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid verb.
                        </Form.Control.Feedback>
                    </Form.Group>
                </fieldset>
                <fieldset className="row mb-3">
                    <legend>Future Tense</legend>
                    <Form.Group as={Col} controlId="formFutureTenseSingularFirstPerson">
                        <Form.Label>Singular First Person</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            name="futureTenseSingularFirstPerson"
                            placeholder="Singular First Person"
                            value={verbForms.verbForms.futureTenseSingularFirstPerson.form}
                            onChange={handleVerbFormsChange}
                            dir="rtl"
                        />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid verb.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formFutureTensePluralFirstPerson">
                        <Form.Label>Plural First Person</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            name="futureTensePluralFirstPerson"
                            placeholder="Plural First Person"
                            value={verbForms.verbForms.futureTensePluralFirstPerson.form}
                            onChange={handleVerbFormsChange}
                            dir="rtl"
                        />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid verb.
                        </Form.Control.Feedback>
                    </Form.Group>
                </fieldset>
                <fieldset className="row mb-3">
                    <Form.Group className="col-lg-3" controlId="formFutureTenseMaleSingularSecondPerson">
                        <Form.Label>Male Singular Second Person</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            name="futureTenseMaleSingularSecondPerson"
                            placeholder="Male Singular Second Person"
                            value={verbForms.verbForms.futureTenseMaleSingularSecondPerson.form}
                            onChange={handleVerbFormsChange}
                            dir="rtl"
                        />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid verb.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="col-lg-3" controlId="formFutureTenseFemaleSingularSecondPerson">
                        <Form.Label>Female Singular Second Person</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            name="futureTenseFemaleSingularSecondPerson"
                            placeholder="Female Singular Second Person"
                            value={verbForms.verbForms.futureTenseFemaleSingularSecondPerson.form}
                            onChange={handleVerbFormsChange}
                            dir="rtl"
                        />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid verb.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formFutureTensePluralSecondPerson">
                        <Form.Label>Plural Second Person</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            name="futureTensePluralSecondPerson"
                            placeholder="Plural Second Person"
                            value={verbForms.verbForms.futureTensePluralSecondPerson.form}
                            onChange={handleVerbFormsChange}
                            dir="rtl"
                        />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid verb.
                        </Form.Control.Feedback>
                    </Form.Group>
                </fieldset>
                <fieldset className="row mb-3">
                    <Form.Group className="col-lg-3" controlId="formFutureTenseMaleSingularThirdPerson">
                        <Form.Label>Male Singular Third Person</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            name="futureTenseMaleSingularThirdPerson"
                            placeholder="Male Singular Third Person"
                            value={verbForms.verbForms.futureTenseMaleSingularThirdPerson.form}
                            onChange={handleVerbFormsChange}
                            dir="rtl"
                        />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid verb.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="col-lg-3" controlId="formFutureTenseFemaleSingularThirdPerson">
                        <Form.Label>Female Singular Third Person</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            name="futureTenseFemaleSingularThirdPerson"
                            placeholder="Female Singular Third Person"
                            value={verbForms.verbForms.futureTenseFemaleSingularThirdPerson.form}
                            onChange={handleVerbFormsChange}
                            dir="rtl"
                        />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid verb.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formFutureTensePluralThirdPerson">
                        <Form.Label>Plural Third Person</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            name="futureTensePluralThirdPerson"
                            placeholder="Plural Third Person"
                            value={verbForms.verbForms.futureTensePluralThirdPerson.form}
                            onChange={handleVerbFormsChange}
                            dir="rtl"
                        />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid verb.
                        </Form.Control.Feedback>
                    </Form.Group>
                </fieldset>
                <Button type="submit">
                    Submit
                </Button>
            </Form>
        </Col>
    );
}

export default AddVerbForm