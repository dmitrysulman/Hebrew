import React, {useState} from "react";
import {Button, Col, Form} from "react-bootstrap";

const API_URL = process.env.REACT_APP_API_URL;

function AddVerbForm() {
    const [infinitive, setInfinitive] = useState("");
    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        setValidated(true);
        if (form.checkValidity() === true) {
            const data = {infinitive: infinitive};
            const response = fetch(`${API_URL}/verbs/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            setInfinitive("");
            setValidated(false);
        }
    };


    const handleChange = (event) => {
        setInfinitive(event.target.value);
    }

    return (
        <Col lg={{span: 4, offset: 4}}>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formInfinitive">
                    <Form.Label>Infinitive</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Verb"
                        value={infinitive}
                        onChange={handleChange}
                    />
                    <Form.Control.Feedback type="invalid">
                        Please provide a valid infinitive.
                    </Form.Control.Feedback>
                </Form.Group>
                <Button type="submit">
                    Submit
                </Button>
            </Form>
        </Col>
    );
}

export {AddVerbForm}