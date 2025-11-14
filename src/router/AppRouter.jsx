import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { Footer } from "../components/Footer";
import { Home } from "../pages/Home";
import { Tasks } from "../pages/Tasks";
import { Profile } from "../pages/Profile";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import { PublicRoutes } from "./PublicRoute";
import { PrivateRoutes } from "./PrivateRoute";
export const AppRouter = () => {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow">
          <Routes>
            {/* RUTAS PUBLICAS */}
            <Route element={<PublicRoutes />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>

            {/* RUTAS PRIVADAS */}
            <Route element={<PrivateRoutes />}>
              <Route path="/home" element={<Home />} />
              <Route path="/tasks" element={<Tasks />} />
              <Route path="/profile" element={<Profile />} />
            </Route>

            {/* REDIRECCIONES */}
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
};
