import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router";
import { PrivateRoute } from "./router/PrivateRoute";
import { PublicRoute } from "./router/PublicRoute";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Home } from "./pages/Home";
import { Profile } from "./pages/Profile";
import { Tasks } from "./pages/Tasks";
import { Navbar } from "./components/Navbar";

export const App = () => {
  const [authStatus, setAuthStatus] = useState("checking");

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/profile", {
          credentials: "include",
        });
        setAuthStatus(res.ok ? "authenticated" : "not-authenticated");
      } catch {
        setAuthStatus("not-authenticated");
      }
    };
    checkAuth();
  }, []);

  const handleLoginSuccess = () => setAuthStatus("authenticated");

  const handleLogout = async () => {
    await fetch("http://localhost:3000/api/logout", {
      method: "POST",
      credentials: "include",
    });
    setAuthStatus("not-authenticated");
  };

  if (authStatus === "checking") {
    return <p className="text-center mt-10">Verificando sesion...</p>;
  }

  return (
    <>
      <Navbar authStatus={authStatus} onLogout={handleLogout} />

      <Routes>
        {/* PUBLICAS */}
        <Route element={<PublicRoute authStatus={authStatus} />}>
          <Route
            path="/login"
            element={<Login onLoginSuccess={handleLoginSuccess} />}
          />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* PRIVADAS */}
        <Route element={<PrivateRoute authStatus={authStatus} />}>
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/tasks" element={<Tasks />} />
        </Route>

        {/* DEFAULT */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </>
  );
};
