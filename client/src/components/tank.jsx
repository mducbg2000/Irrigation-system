import {Card, Col, Row} from "react-bootstrap";
import CardHeader from "react-bootstrap/CardHeader";
import {useState} from "react";
import LiquidFillGauge from "react-liquid-gauge";

export default function Tank({tankInfo}) {

    const [tank, setTank] = useState(tankInfo);

    return <Col>
        <Card>
            <CardHeader>
                <Card.Title>{`${tank.espId}.${tank.index}`}</Card.Title>
            </CardHeader>
            <Card.Body>
                <Row>
                    <Col md={8}>
                        Diện tích đáy thùng: {tank.area} cm2 <br/>
                        Chiều cao: {tank.height} cm <br/>
                        Mực nước hiện tại: {tank.liquidLevel} cm <br/>
                        Dung tích tối đa: {tank.area * tank.height / 1000} lít <br/>
                        Dung tích hiện tại: {tank.liquidLevel * tank.area / 1000} lít
                    </Col>
                    <Col md={4}><LiquidFillGauge
                        className="float-end"
                        value={tank.liquidLevel / tank.height * 100}
                        percent="%"
                        width={100}
                        height={100}
                        riseAnimation={true}
                        riseAnimationTime={5000}
                        waveAnimation={true}
                        waveAmplitude={6}
                        waveFrequency={3}
                        gradient={true}
                    /></Col>
                </Row>

            </Card.Body>
        </Card>
    </Col>
}