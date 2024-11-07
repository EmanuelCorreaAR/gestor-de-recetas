import { useState, FormEvent } from 'react';
import { emailLogin, googleLogin, handleLogout } from '../utils/auth';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const { currentUser } = useAuth();
    const navigate = useNavigate();

    const handleEmailLogin = async (e: FormEvent) => {
        e.preventDefault();
        const result = await emailLogin(email, password);
        if (result.success) {
            navigate('/dashboard');
        } else {
            setError('Error during login: ' + result.message);
        }
    };

    const handleGoogleLogin = async () => {
        const result = await googleLogin();
        if (result.success) {
            navigate('/dashboard');
        } else {
            setError('Error during Google login: ' + result.message);
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
                            <p>Would you like to go to your dashboard or logout?</p>
                            <div className="buttons is-flex is-justify-content-center mt-5">
                                <button
                                    className="button is-primary"
                                    onClick={() => navigate('/dashboard')}
                                >
                                    Go to Dashboard
                                </button>
                                <button className="button is-danger" onClick={handleLogout}>
                                    Logout
                                </button>
                            </div>
                        </div>
                    ) : (
                        <>
                            <h1 className="title">Login</h1>
                            <form onSubmit={handleEmailLogin}>
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
                                    Login with Email
                                </button>
                            </form>
                            <div className="my-4">or</div>
                            <button className="button is-danger" onClick={handleGoogleLogin}>
                                Login with Google
                            </button>
                            <div className="my-4">
                                <Link to="/register">Register with email</Link>
                            </div>
                            {error && <p className="has-text-danger">{error}</p>}
                        </>
                    )}
                </div>
            </div>
        </section>
    );
};

export { Login };