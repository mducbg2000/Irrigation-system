import { Button, Card, Col, ProgressBar, Row } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import CardHeader from "react-bootstrap/CardHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDroplet, faDropletSlash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { SocketContext } from "../services/real-time";
import { waterTree } from "../services/tree-services";

export default function Tree({ treeInfo }) {
  const [tree, setTree] = useState(treeInfo);
  const [valve, setValve] = useState(treeInfo.isValveOpen);

  const socket = useContext(SocketContext);

  useEffect(() => {
    socket.on(`update-tree/${tree.espId}/${tree.index}`, tree => {
      setTree(tree);
      setValve(tree.isValveOpen);
    });
  }, [tree, valve]);

  const currentVariant = () => {
    const c = tree.currentMoisture;
    const max = tree.maxMoisture;
    const min = tree.minMoisture;

    if (c < min - 10 || c > max + 10) return "danger";
    if (c < min || c > max) return "warning";
    return "success";
  };

  const toggleValve = async () => {
    const updatedTree = {
      espId: tree.espId,
      index: tree.index,
      isValveOpen: !valve
    }
    await waterTree(updatedTree)
    setValve(!valve);
  };

  const getValveState = () => {
    return !valve ?
      <span>Tưới <FontAwesomeIcon icon={faDroplet} /></span> :
      <span>Dừng <FontAwesomeIcon icon={faDropletSlash} /></span>;
  };

  return <Col>
    <Card>
      <CardHeader>
        <Row>
          <Col md={8}>
            <Card.Title>
              <span className="align-middle">
                {tree.name}
                <FontAwesomeIcon className="m-1" style={{ color: "gold" }} icon={faPenToSquare} />
              </span>
            </Card.Title>
          </Col>
          <Col md={4}>
            <Button
              className="float-end"
              variant={!valve ? "outline-primary" : "outline-danger"}
              value={valve}
              onClick={toggleValve}
            >
              {getValveState()}
            </Button>
          </Col>
        </Row>
      </CardHeader>
      <Card.Body>
        <Card.Text>
          ID: {`${tree.espId}.${tree.index}`}
        </Card.Text>
        <Card.Text>
          Độ ẩm thích hợp: {tree.minMoisture}% - {tree.maxMoisture}%
        </Card.Text>
        <Card.Text>
          Độ ẩm hiện tại:
        </Card.Text>
      </Card.Body>
      <Card.Footer>
        <ProgressBar animated label={tree.currentMoisture + "%"} now={tree.currentMoisture}
                     variant={currentVariant()} />
      </Card.Footer>
    </Card>
  </Col>;
}