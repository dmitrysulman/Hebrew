import {Container, Row} from "react-bootstrap";
import AppNavbar from "./AppNavbar";
import {Outlet} from "react-router-dom";

function AppContainer() {
    return (
        <>
            <AppNavbar/>
            <Container>
                <Row>
                    <Outlet/>
                </Row>
            </Container>
        </>
    )
}

export default AppContainer