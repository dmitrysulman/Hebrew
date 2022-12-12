import {Container, Row} from "react-bootstrap";
import {AddVerbForm} from "../components/AddVerbForm";

function AppContainer() {
    return (
        <Container>
            <Row>
                <AddVerbForm />
            </Row>
        </Container>
    )
}

export {AppContainer}