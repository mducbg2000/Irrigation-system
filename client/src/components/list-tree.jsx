import CardHeader from "react-bootstrap/CardHeader";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTree} from "@fortawesome/free-solid-svg-icons";
import {Card, Row} from "react-bootstrap";
import {useEffect, useState} from "react";
import Tree from "./tree";
import {getListTree} from "../services/tree-services";

export default function ListTree() {

    const [trees, setTrees] = useState([])

    useEffect(() => {
        getListTree().then(trees => setTrees(trees));
    }, [])

    return <Card style={{height: "100%"}}>
        <CardHeader><h3>Danh sách cây <span><FontAwesomeIcon icon={faTree}/></span></h3></CardHeader>
        <Card.Body style={{overflowY: "scroll", height: 500}}>
            <Row xs={1} md={2} className="g-4">
                {trees.map(tree => (
                    <Tree treeInfo={tree} key={tree._id}/>
                ))}
            </Row>
        </Card.Body>
    </Card>
}