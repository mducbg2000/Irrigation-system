import { Card, Row } from "react-bootstrap";
import CardHeader from "react-bootstrap/CardHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWater } from "@fortawesome/free-solid-svg-icons";
import Tank from "./tank";
import React from "react";

export default function ListTank({ tanks }) {

  return <Card style={{ height: "100%" }}>
    <CardHeader><h3>Danh sách thùng nước <span><FontAwesomeIcon style={{color: "dodgerblue"}} icon={faWater} /></span></h3></CardHeader>
    <Card.Body style={{ overflowY: "scroll", height: 500 }}>
      <Row xs={1} md={1} className="g-4">
        {tanks.map(tank => (
          <Tank tankInfo={tank} key={tank._id} />
        ))}
      </Row>
    </Card.Body>
  </Card>;
}