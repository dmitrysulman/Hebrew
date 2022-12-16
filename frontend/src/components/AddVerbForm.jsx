import React, {useState, useEffect} from "react";
import {Button, Col, Form, Row} from "react-bootstrap";

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

    const handleBaseBlur = () => {
        if (verbForms.base.length > 1) {
            fetch(`${API_URL}/verbs/get_forms/${verbForms.base}`, {
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
    }

    useEffect(() => {
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
        <Col lg={{span: 9, offset: 1}}>
            <Form className="mt-3" noValidate validated={validated} onSubmit={handleSubmit}>
                <Row className="mb-3">
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
                        />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid verb.
                        </Form.Control.Feedback>
                    </Form.Group>
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
                        />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid verb.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
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
                    <Form.Group as={Col} controlId="formRoot">
                        <Form.Label>Root</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            name="root"
                            placeholder="Root"
                            value={verbForms.root}
                            onChange={handleInputChange}
                        />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid verb.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formPresentTenseMaleSingular">
                        <Form.Label>formPresentTenseMaleSingular</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            name="presentTenseMaleSingular"
                            placeholder="presentTenseMaleSingular"
                            value={verbForms.verbFormDtos.presentTenseMaleSingular.form}
                            onChange={handleVerbFormsChange}
                        />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid verb.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formpPesentTenseFemaleSingular">
                        <Form.Label>formpPesentTenseFemaleSingular</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            name="presentTenseFemaleSingular"
                            placeholder="presentTenseFemaleSingular"
                            value={verbForms.verbFormDtos.presentTenseFemaleSingular.form}
                            onChange={handleVerbFormsChange}
                        />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid verb.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Button type="submit">
                    Submit
                </Button>
            </Form>
        </Col>
    );
}

export {AddVerbForm}