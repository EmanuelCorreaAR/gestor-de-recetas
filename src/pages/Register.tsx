import { useState, FormEvent } from 'react';
import { registerUser } from '../utils/auth'; // Importar la función de registro
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Importar el contexto de autenticación

const Register = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const navigate = useNavigate();
    const { currentUser } = useAuth(); // Obtener el usuario actual del contexto

    const handleRegister = async (e: FormEvent) => {
        e.preventDefault();
        const result = await registerUser(email, password);
        if (result.success) {
            navigate('/dashboard');
        } else {
            setError('Error during registration: ' + result.message);
        }
    };

    return (
        <section
            className="section"
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
            }}
        >
            <div className="container is-max-desktop">
                <div className="box" style={{ textAlign: 'center' }}>
                    {currentUser ? (
                        <div>
                            <h1 className="title">
                                Welcome, {currentUser.displayName || currentUser.email}!
                            </h1>
                            <p>You are already registered. You can go to your dashboard.</p>
                            <Link to="/dashboard" className="button is-primary mt-5">
                                Go to Dashboard
                            </Link>
                        </div>
                    ) : (
                        <>
                            <h1 className="title">Register</h1>
                            <form onSubmit={handleRegister}>
                                <div className="field">
                                    <div className="control">
                                        <input
                                            className="input"
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Email"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="field">
                                    <div className="control">
                                        <input
                                            className="input"
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="Password"
                                            required
                                        />
                                    </div>
                                </div>
                                <button className="button is-primary" type="submit">
                                    Register
                                </button>
                            </form>
                            <div className="my-4">
                                <Link to="/login">Already have an account? Login</Link>
                            </div>
                            {error && <p className="has-text-danger">{error}</p>}
                        </>
                    )}
                </div>
            </div>
        </section>
    );
};

export { Register };