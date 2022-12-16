import React, {useState, useEffect, useRef} from "react";
import {Button, Col, Form} from "react-bootstrap";

const API_URL = process.env.REACT_APP_API_URL;

const clearVerbForms = {
    base: "",
    infinitive: "",
    binyan: "",
    root: "",
    translation: "",
    verbFormDtos: {
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

function AddVerbForm() {
    const [binyansOptions, setBinyansOptions] = useState({});
    const [verbForms, setVerbForms] = useState(clearVerbForms);
    const [validated, setValidated] = useState(false);
    const base = useRef(null);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        const data = {};
        data.base = verbForms.base;
        data.infinitive = verbForms.infinitive;
        data.binyan = verbForms.binyan;
        data.root = verbForms.root;
        data.translation = verbForms.translation;
        data.verbForms = Object.values(verbForms.verbFormDtos);
        event.preventDefault();
        setValidated(true);
        if (form.checkValidity() === true) {
            fetch(`${API_URL}/verbs/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }).then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not OK');
                }
                setVerbForms(clearVerbForms);
                setValidated(false);
            }).catch((error) => {
                console.error('There has been a problem with your fetch operation:', error);
            });
        }
    };

    const handleInputChange = (event) => {
        if (event.target.name === "binyan") {
            getVerbForms(event.target.value);
        }
        setVerbForms({
            ...verbForms,
            [event.target.name]: event.target.value
        });
    }

    const handleVerbFormsChange = (event) => {
        setVerbForms((prevVerbForms) => {
            prevVerbForms.verbFormDtos[event.target.name].form = event.target.value;
            return {
                ...prevVerbForms,
            }
        });
    }

    function getVerbForms(binayn) {
        fetch(`${API_URL}/verbs/get_forms/${verbForms.base}${binayn ? "?binyan=" + binayn : ""}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(response => response.json())
            .then(data => {
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
            getVerbForms();
        }
    }

    useEffect(() => {
        base.current.focus();
        fetch(`${API_URL}/verbs/get_binyans`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(response => response.json())
            .then(data => {
                for (let [k, v] of Object.entries(data.binyans)) {
                    setBinyansOptions((prevOptions) => ({
                        ...prevOptions,
                        [k]: v,
                    }));
                }
            })
    }, [])

    return (
        <Col lg={{span: 10, offset: 1}}>
            <Form className="mt-3" noValidate validated={validated} onSubmit={handleSubmit}>
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
                            name="translation"
                            placeholder="Translation"
                            value={verbForms.translation}
                            onChange={handleInputChange}
                        />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid verb.
                        </Form.Control.Feedback>
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
                            <option disabled>Select binyan</option>
                            {Object.entries(binyansOptions).map(item => (
                                <option key={item[0]} value={item[1]}>{item[1]}</option>
                            ))}
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
                            value={verbForms.verbFormDtos.presentTenseMaleSingular.form}
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
                            value={verbForms.verbFormDtos.presentTenseFemaleSingular.form}
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
                            value={verbForms.verbFormDtos.presentTenseMalePlural.form}
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
                            value={verbForms.verbFormDtos.presentTenseFemalePlural.form}
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
                            value={verbForms.verbFormDtos.pastTenseSingularFirstPerson.form}
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
                            value={verbForms.verbFormDtos.pastTensePluralFirstPerson.form}
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
                            value={verbForms.verbFormDtos.pastTenseMaleSingularSecondPerson.form}
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
                            value={verbForms.verbFormDtos.pastTenseFemaleSingularSecondPerson.form}
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
                            value={verbForms.verbFormDtos.pastTenseMalePluralSecondPerson.form}
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
                            value={verbForms.verbFormDtos.pastTenseFemalePluralSecondPerson.form}
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
                            value={verbForms.verbFormDtos.pastTenseMaleSingularThirdPerson.form}
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
                            value={verbForms.verbFormDtos.pastTenseFemaleSingularThirdPerson.form}
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
                            value={verbForms.verbFormDtos.pastTensePluralThirdPerson.form}
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
                            value={verbForms.verbFormDtos.futureTenseSingularFirstPerson.form}
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
                            value={verbForms.verbFormDtos.futureTensePluralFirstPerson.form}
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
                            value={verbForms.verbFormDtos.futureTenseMaleSingularSecondPerson.form}
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
                            value={verbForms.verbFormDtos.futureTenseFemaleSingularSecondPerson.form}
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
                            placeholder="Male Plural Second Person"
                            value={verbForms.verbFormDtos.futureTensePluralSecondPerson.form}
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
                            value={verbForms.verbFormDtos.futureTenseMaleSingularThirdPerson.form}
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
                            value={verbForms.verbFormDtos.futureTenseFemaleSingularThirdPerson.form}
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
                            value={verbForms.verbFormDtos.futureTensePluralThirdPerson.form}
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

export {AddVerbForm}