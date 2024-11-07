import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Dashboard } from './pages/Dashboard';
import { AuthProvider } from './context/AuthContext';
import { PrivateRoute } from './components/PrivateRoute/PrivateRoute';
import { ProductsCacheProvider } from './context/ProductsCacheContext';

const App = () => {
    return (
        <ProductsCacheProvider>
            <AuthProvider>
                <Router>
                    <Routes>
                        {/* Rutas públicas */}
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />

                        {/* Rutas privadas */}
                        <Route path="/dashboard" element={
                            <PrivateRoute url={"/login"}>
                                <Dashboard />
                            </PrivateRoute>
                        } />
                    </Routes>
                </Router>
            </AuthProvider>
        </ProductsCacheProvider>
    );
};

export { App };