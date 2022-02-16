import React, { useContext, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import ListTank from "../components/list-tank";
import ListTree from "../components/list-tree";
import NavBar from "../components/navbar";
import { getListTank } from "../services/tank-service";
import { getListTree } from "../services/tree-services";
import { SocketContext } from "../services/real-time";

export default function UserDashboard({ setLogged }) {
  const [page, setPage] = useState(true);

  const [tanks, setTanks] = useState([]);
  const [trees, setTrees] = useState([]);
  const [searchString, setSearch] = useState("");

  const socket = useContext(SocketContext);

  useEffect(() => {
    getListTree().then(trees => {
      const filterTrees = trees.filter(t => t.name.includes(searchString));
      setTrees(filterTrees);
    });
    getListTank().then(tanks => setTanks(tanks));
  }, [searchString, socket]);

  return <React.Fragment>
    <Row style={{ width: "100%", margin: "auto" }}>
      <NavBar setLogged={setLogged} page={page} setPage={setPage} setSearch={setSearch} />
    </Row>
    <Row className="me-2" style={{ width: "100%", height: "90%", margin: "auto", paddingTop: 10 }}>
      <Container fluid style={{ paddingLeft: 0, paddingRight: 0 }}>
        <Row className="gx-3" style={{ height: "100%" }}>
          <Col md={4}>
            <ListTank tanks={tanks} />
          </Col>
          <Col md={8}>
            <ListTree trees={trees} />
          </Col>
        </Row>
      </Container>
    </Row>
  </React.Fragment>;
}
