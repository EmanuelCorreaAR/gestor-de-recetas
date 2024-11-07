import { useAuth } from '../context/AuthContext';
import { handleLogout } from '../utils/auth';
import { Link } from 'react-router-dom';
import { Loader } from '../components/Loader/Loader';
import { useState, useEffect } from 'react';

// Definimos una estructura de ejemplo de las recetas
interface Product {
    id: string;
    image?: string;
    title: string;
    description: string;
}

const Home = () => {
    const { currentUser } = useAuth();
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState<Product[]>([]);

    // Simulamos la carga de productos (recetas)
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setProducts([
                {
                    id: '1',
                    image: 'https://via.placeholder.com/150',
                    title: 'Spaghetti Carbonara',
                    description: 'A classic Italian pasta dish made with eggs, cheese, pancetta, and pepper.'
                },
                {
                    id: '2',
                    image: 'https://via.placeholder.com/150',
                    title: 'Chicken Alfredo',
                    description: 'A creamy pasta dish made with chicken, pasta, and a rich Alfredo sauce.'
                },
                {
                    id: '3',
                    image: 'https://via.placeholder.com/150',
                    title: 'Beef Stew',
                    description: 'A hearty dish with beef, vegetables, and a savory broth, perfect for cold days.'
                },
                {
                    id: '4',
                    image: 'https://via.placeholder.com/150',
                    title: 'Vegetable Stir Fry',
                    description: 'A healthy and quick stir fry made with fresh vegetables and a savory soy-based sauce.'
                },
            ]);
            setLoading(false);
        }, 1000); // Simulamos la carga de datos
    }, []);

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
            {/* Header */}
            <header className="my-5 has-text-centered">
                <h1 className="title">Recipe Manager</h1>
                {currentUser ? (
                    <button className="button is-danger" onClick={logout}>Logout</button>
                ) : (
                    <Link to="/login" className="button is-primary">Login</Link>
                )}
            </header>

            {/* Subtitle */}
            <p className="subtitle has-text-centered mb-5">
                Your personal recipe book. Add, search, and manage all your favorite recipes!
            </p>

            {/* Product Grid */}
            {loading ? (
                <div className="is-flex is-justify-content-center is-align-items-center" style={{ height: '50vh' }}>
                    <Loader />
                </div>
            ) : (
                <div className="columns is-multiline is-centered">
                    {products.map((product: Product) => (
                        <div key={product.id} className="column is-one-quarter">
                            <div className="box has-text-centered">
                                <div className="image-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
                                    <img
                                        src={product.image || 'https://via.placeholder.com/150'}
                                        alt={product.title}
                                        className="image mb-3"
                                        style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'cover' }}
                                    />
                                </div>
                                <h3 className="title is-5">{product.title}</h3>
                                <p>{product.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Footer */}
            <footer className="footer mt-5 has-text-centered" style={{ marginTop: 'auto' }}>
                <div className="content">
                    <p>&copy; 2024 Recipe Manager. All Rights Reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export { Home };