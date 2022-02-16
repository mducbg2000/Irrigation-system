import CardHeader from "react-bootstrap/CardHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTree } from "@fortawesome/free-solid-svg-icons";
import { Card, Row } from "react-bootstrap";
import Tree from "./tree";

export default function ListTree({ trees }) {

  return <Card style={{ height: "100%" }}>
    <CardHeader>
          <h3>Danh sách cây <FontAwesomeIcon style={{color: "green"}} icon={faTree} /> </h3>
    </CardHeader>
    <Card.Body style={{ overflowY: "scroll", height: 500 }}>
      <Row xs={1} md={2} className="g-4">
        {trees.map(tree => (
          <Tree treeInfo={tree} key={tree._id} />
        ))}
      </Row>
    </Card.Body>
  </Card>;
}