import React, {useEffect, useState} from "react";
import "./App.css";
import {getCurrentUser} from "./services/auth";
import Dashboard from "./pages/dashboard";
import AuthForm from "./pages/auth-form";
import NavBar from "./components/navbar";
import {Row} from "react-bootstrap";
import io from "socket.io-client";

export default function App() {

    const [logged, setLogged] = useState(false);
    const [page, setPage] = useState(true);
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const fetchCurrentUser = async () => {
            const currentUser = await getCurrentUser();
            return currentUser != null;
        }
        fetchCurrentUser().then(r => setLogged(r));
    }, [logged]);

    if (!logged) return (
        <AuthForm setLogged={setLogged}/>
    )

    return (
        <React.Fragment>
            <Row style={{width: "100%", margin: "auto"}}>
                <NavBar setLogged={setLogged} page={page} setPage={setPage}/>
            </Row>
            <Row className="me-2" style={{width: "100%", height: "90%", margin: "auto", paddingTop: 10}}>
                <Dashboard page={page}/>
            </Row>
        </React.Fragment>
    );
}
