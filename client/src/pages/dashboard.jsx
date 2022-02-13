import React from "react";
import {Col, Container, Row} from "react-bootstrap";
import ListTank from "../components/list-tank";
import ListTree from "../components/list-tree";

export default function Dashboard() {
    return <Container fluid style={{paddingLeft: 0, paddingRight: 0}}>
        <Row className="gx-3" style={{height:"100%"}}>
            <Col md={4}>
                <ListTank/>
            </Col>
            <Col md={8}>
                <ListTree/>
            </Col>
        </Row>
    </Container>
}
