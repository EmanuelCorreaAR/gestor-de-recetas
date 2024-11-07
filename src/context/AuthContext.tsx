import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../config/firebaseConfig';

// Definir el tipo del contexto de autenticación
interface AuthContextType {
    currentUser: User | null;
}

// Crear el contexto con un valor por defecto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Crear un hook para usar el contexto en otros componentes
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth debe ser utilizado dentro de un AuthProvider");
    }
    return context;
};

// Definir las props del proveedor
interface AuthProviderProps {
    children: ReactNode;
}

// Proveedor del contexto
export const AuthProvider = ({ children }: AuthProviderProps): JSX.Element => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    // Verificar el estado de autenticación cuando la app se inicia o cambia
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);
        });

        // Limpiar suscripción al desmontar el componente
        return () => unsubscribe();
    }, []);

    const value: AuthContextType = {
        currentUser,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
);
};