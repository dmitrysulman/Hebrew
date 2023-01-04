import {Col, Form} from "react-bootstrap";

function AddVerbFormInputGroupText(props) {
    const {
        className,
        id,
        label,
        name,
        value,
        onChange,
        onBlur,
        refVal,
        dir,
        error = "Please provide a valid verb.",
        fieldErrors = []
    } = props;
    return <Form.Group as={Col} className={className} controlId={id}>
        <Form.Label>{label}</Form.Label>
        <Form.Control
            required
            type="text"
            name={name}
            placeholder={label}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            ref={refVal}
            dir={dir}
            isInvalid={fieldErrors[name]}
        />
        <Form.Control.Feedback type="invalid">
            {fieldErrors[name] ? fieldErrors[name] : error}
        </Form.Control.Feedback>
    </Form.Group>
}

export default AddVerbFormInputGroupText