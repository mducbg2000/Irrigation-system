import React, {useState} from "react";
import {login, register} from "../services/auth";

export default function AuthForm({setLogged, setUser}) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async e => {
        e.preventDefault();
        const isSuccess = await login(username, password);
        if (isSuccess) {
            setLogged(true);
        }
    }

    const handleRegister = () => {
        register(username, password);
    }

    const mainStyles = {
        width: "100%",
        height: "100%",
        maxWidth: 330,
        padding: 15,
        margin: "auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }

    return (
        <main style={mainStyles}>
            <div style={{
                background: "whitesmoke",
                border: 2,
                borderRadius: 5,
                padding: 15
            }}>
                <form className='mx-auto'>
                    <h2>Login or Register</h2>
                    <div className="mb-3">
                        <label htmlFor="inputUsername" className="form-label">Username</label>
                        <input type="test" className="form-control" id="inputUsername" value={username}
                               onInput={event => setUsername(event.target.value)}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="inputPassword" className="form-label">Password</label>
                        <input type="password" className="form-control" id="inputPassword" value={password}
                               onInput={event => setPassword(event.target.value)}/>
                    </div>
                    <button className="col-6 btn btn-primary"
                            onClick={handleLogin}>Login
                    </button>
                    <button className="col-6 btn btn-secondary"
                            onClick={handleRegister}>Register
                    </button>
                </form>
            </div>
        </main>

    );
}

