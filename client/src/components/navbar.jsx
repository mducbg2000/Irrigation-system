import { useContext, useEffect, useState } from "react";
import { getCurrentUser, logout } from "../services/auth";
import { Button, Container, Form, FormControl, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faRightFromBracket, faUser } from "@fortawesome/free-solid-svg-icons";
import { SocketContext } from "../services/real-time";

export default function NavBar({ setLogged, page, setPage, setSearch }) {
  const [user, setUser] = useState({});
  useContext(SocketContext);
  /**
   * UserDashboard show tracking if page is true, else show chart
   */
  useEffect(() => {
    const fetchCurrentUser = async () => {
      return await getCurrentUser();
    };
    fetchCurrentUser().then(u => {
      setUser(u);
    });
  }, []);

  const exit = () => {
    logout();
    setLogged(false);
  };

  return (
    <Navbar bg="light" expand="lg" className="rounded-3">
      <Container fluid>
        <Navbar.Brand href="#"><span><FontAwesomeIcon icon={faUser} /></span> {user.username}</Navbar.Brand>
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px", fontSize: 20 }}
            navbarScroll
          >
            <NavDropdown title={page ? "Giám sát" : "Thống kê"} id="navbarDropdown">
              <NavDropdown.Item onClick={() => setPage(!page)}
                                href="">{page ? "Thống kê" : "Giám sát"}</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Form className="d-flex">
            <FormControl
              type="search"
              placeholder="Tìm kiếm..."
              className="me-2"
              aria-label="Search"
              onChange={e => setSearch(e.target.value)}
            />
            <Button variant="outline-primary" className="me-2"><FontAwesomeIcon icon={faMagnifyingGlass} /></Button>
            <Button onClick={exit} variant="outline-danger"><span><FontAwesomeIcon
              icon={faRightFromBracket} /></span></Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>

  );
}