import {Await, defer, useLoaderData} from "react-router-dom";
import {Accordion, Alert, Col} from "react-bootstrap";
import {getAllVerbs} from "../api";
import React from "react";

export function loader() {
    let verbs = getAllVerbs();
    return defer({verbs});
}


function RootPage() {
    const {verbs} = useLoaderData();
// console.log(verbs);
    return <Col>
        <h2>All Verbs</h2>
        <React.Suspense
            fallback={<h4>Loading data...</h4>}
        >
            <Await
                resolve={verbs}
                errorElement={<Alert variant="danger">
                    Error loading page...
                </Alert>}
            >
                {verbs =>
                    <Accordion className="mt-3 mb-3">
                        {Object.keys(verbs).map((letter, index) =>
                            <Accordion.Item eventKey={index} key={index}>
                                <Accordion.Header>{letter}</Accordion.Header>
                                <Accordion.Body>{verbs[letter].map(verb =>
                                    <div key={verb.id}>
                                        {verb.root} {verb.infinitive} {verb.verbTranslations[0].infinitiveTranslated}
                                    </div>
                                )}</Accordion.Body>
                            </Accordion.Item>
                        )}
                    </Accordion>
                }
            </Await>
        </React.Suspense>
    </Col>
}

export default RootPage