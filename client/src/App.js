import React, { useEffect, useState } from "react";
import "./App.css";
import { getCurrentUser } from "./services/auth";
import UserDashboard from "./pages/user-dashboard";
import AuthForm from "./pages/auth-form";
import { SocketContext } from "./services/real-time";
import { socket } from "./services/conf";

export default function App() {

  const [logged, setLogged] = useState(false);
  useEffect(() => {
    const fetchCurrentUser = async () => {
      const currentUser = await getCurrentUser();
      return currentUser != null;
    };
    fetchCurrentUser().then(r => setLogged(r));
  }, [logged]);

  if (!logged) return (
    <AuthForm setLogged={setLogged} />
  );

  return (
    <SocketContext.Provider value={socket}>
      <UserDashboard setLogged={setLogged} />
    </SocketContext.Provider>
  );
}
