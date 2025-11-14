import { Navigate, Outlet } from "react-router";

export const PublicRoute = ({ authStatus }) => {
  return authStatus === "not-authenticated" ? (
    <Outlet />
  ) : (
    <Navigate to="/home" />
  );
};
