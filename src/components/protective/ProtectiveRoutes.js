import { Navigate, Outlet } from "react-router-dom";

export const useAuth = () => {
  if (localStorage.getItem("user")) {
    const user = { loggedIn: true };
    return user && user.loggedIn;
  } else {
    const user = { loggedIn: false };
    return user && user.loggedIn;
  }
};
const ProtectedRoutes = () => {
  const isAuth = useAuth();
  return isAuth ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoutes;
