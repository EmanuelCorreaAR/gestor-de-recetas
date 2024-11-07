import { useAuth } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ children, url }) => {
    const { currentUser } = useAuth();
    return currentUser ? children : <Navigate to={url} />;
};