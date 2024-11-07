import { useAuth } from '../context/AuthContext';
import { handleLogout } from '../utils/auth.js';
import { Link } from 'react-router-dom';
import { Loader } from '../components/Loader/Loader.jsx';
import { useProductsCache } from '../context/ProductsCacheContext';

const Home = () => {
    const { currentUser } = useAuth();
    const { products, loading } = useProductsCache();

    const logout = async () => {
        const result = await handleLogout();
        if (result.success) {
            console.log('Logout successful');
        } else {
            console.error('Error signing out:', result.message);
        }
    };

    return (
        <div className="container is-flex is-flex-direction-column is-justify-content-space-between" style={{ minHeight: '100vh' }}>
            <header className="my-5 has-text-centered">
                <h1 className="title">Recipe Manager</h1>
                {currentUser ? (
                    <button className="button is-danger" onClick={logout}>Logout</button>
                ) : (
                    <Link to="/login" className="button is-primary">Login</Link>
                )}
            </header>

            <p className="subtitle has-text-centered mb-5">Your personal recipe book. Add, search, and manage all your favorite recipes!</p>

            {loading ? (
                <div className="is-flex is-justify-content-center is-align-items-center" style={{ height: '50vh' }}>
                    <Loader />
                </div>
            ) : (
                <div className="columns is-multiline is-centered">
                    {products.map((product) => (
                        <div key={product.id} className="column is-one-quarter">
                            <div className="box has-text-centered">
                                <div
                                    className="image-container"
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        height: '200px',
                                        overflow: 'hidden'
                                    }}
                                >
                                    <img
                                        src={product.image || 'https://via.placeholder.com/150'}
                                        alt={product.title}
                                        className="image mb-3"
                                        style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                                    />
                                </div>
                                <h3 className="title is-5">{product.title}</h3>
                                <p>{product.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <footer className="footer mt-5 has-text-centered" style={{ marginTop: 'auto' }}>
                <div className="content">
                    <p>&copy; 2024 Recipe Manager. All Rights Reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export { Home };