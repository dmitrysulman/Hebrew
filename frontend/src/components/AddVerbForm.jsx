import React, {useState} from "react";
import {Button, Col, Form} from "react-bootstrap";

const API_URL = process.env.REACT_APP_API_URL;

function AddVerbForm() {
    const [base, setBase] = useState("");
    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        setValidated(true);
        if (form.checkValidity() === true) {
            const data = {base: base};
            fetch(`${API_URL}/verbs/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            setBase("");
            setValidated(false);
        }
    };

    const handleBaseChange = (event) => {
        setBase(event.target.value);
    }

    const handleBaseBlur = () => {
        fetch(`${API_URL}/verbs/get_forms/${base}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(response => response.json())
            .then(data => console.log(data));
    }

    return (
        <Col lg={{span: 4, offset: 4}}>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBase">
                    <Form.Label>Base</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Verb"
                        value={base}
                        onChange={handleBaseChange}
                        onBlur={handleBaseBlur}
                    />
                    <Form.Control.Feedback type="invalid">
                        Please provide a valid base.
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