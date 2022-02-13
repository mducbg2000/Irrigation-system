import {Card, Row} from "react-bootstrap";
import CardHeader from "react-bootstrap/CardHeader";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faWater} from "@fortawesome/free-solid-svg-icons";
import {useEffect, useState} from "react";
import Tank from "./tank";
import {getListTank} from "../services/tank-service";

export default function ListTank() {

    const [tanks, setTanks] = useState([])

    useEffect(() => {
        getListTank().then(tanks => setTanks(tanks));
    }, []);


    return <Card style={{height: "100%"}}>
        <CardHeader><h3>Danh sách thùng nước <span><FontAwesomeIcon icon={faWater}/></span></h3></CardHeader>
        <Card.Body style={{overflowY: "scroll", height: 500}}>
            <Row xs={1} md={1} className="g-4">
                {tanks.map(tank => (
                    <Tank tankInfo={tank} key={tank._id}/>
                ))}
            </Row>
        </Card.Body>
    </Card>
}