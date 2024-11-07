import { useAuth } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";
import React from "react";

// Tipamos las props del componente
interface PrivateRouteProps {
    children: React.ReactNode; // children puede ser cualquier nodo de React
    url: string; // url debe ser una cadena de texto
}

export const PrivateRoute = ({ children, url }: PrivateRouteProps) => {
    const { currentUser } = useAuth();
    return currentUser ? <>{children}</> : <Navigate to={url} />;
};