import {Await, defer, useLoaderData} from "react-router-dom";
import {Accordion, Col} from "react-bootstrap";
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
            // fallback={<option value="">Loading languages...</option>}
        >
            <Await
                resolve={verbs}
                // errorElement={<option value="">Error loading languages</option>}
            >

                {verbs =>
                    <Accordion className="mt-3 mb-3">
                        {Object.keys(verbs).map((letter, index) => <>
                                <Accordion.Item eventKey={index} key={index}>
                                    <Accordion.Header>{letter}</Accordion.Header>
                                    <Accordion.Body>Body0</Accordion.Body>
                                </Accordion.Item>
                            </>
                        )}
                    </Accordion>
                }
            </Await>
        </React.Suspense>
    </Col>
}

export default RootPage