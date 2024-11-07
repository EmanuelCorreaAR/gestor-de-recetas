import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { handleLogout } from '../utils/auth.js';
import { addProduct, updateProduct, deleteProduct } from '../utils/store.js';
import { Link } from 'react-router-dom';
import { Loader } from '../components/Loader/Loader.jsx';
import { useProductsCache } from '../context/ProductsCacheContext';

const Dashboard = () => {
    const { currentUser } = useAuth();
    const { products, loading, updateProductsCache } = useProductsCache();
    const [form, setForm] = useState({ title: '', description: '', image: '' });
    const [editing, setEditing] = useState(false);
    const [editingId, setEditingId] = useState(null);

    const logout = async () => {
        const result = await handleLogout();
        if (result.success) {
            console.log('Logout successful');
        } else {
            console.error('Error signing out:', result.message);
        }
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let updatedProducts;

        if (editing) {
            await updateProduct(editingId, form);
            updatedProducts = products.map((product) =>
                product.id === editingId ? { ...product, ...form } : product
            );
        } else {
            const newProduct = await addProduct(form);
            console.log(newProduct)
            updatedProducts = [...products, newProduct];
        }

        setForm({ title: '', description: '', image: '' });
        setEditing(false);
        setEditingId(null);
        updateProductsCache(updatedProducts);
    };

    const handleEdit = (product) => {
        setForm({ title: product.title, description: product.description, image: product.image });
        setEditing(true);
        setEditingId(product.id);
    };

    const handleDelete = async (id) => {
        await deleteProduct(id);
        const updatedProducts = products.filter((product) => product.id !== id);
        updateProductsCache(updatedProducts);
    };

    return (
        <div className="container" style={{ minHeight: '100vh' }}>
            <header className="my-5 has-text-centered">
                <h1 className="title">Recipe Manager - Dashboard</h1>
                {currentUser ? (
                    <button className="button is-danger" onClick={logout}>Logout</button>
                ) : (
                    <Link to="/login" className="button is-primary">Login</Link>
                )}
            </header>

            <form onSubmit={handleSubmit} className="mb-5">
                <div className="field">
                    <label className="label">Title</label>
                    <div className="control">
                        <input
                            className="input"
                            type="text"
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <div className="field">
                    <label className="label">Description</label>
                    <div className="control">
                        <textarea
                            className="textarea"
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            required
                        ></textarea>
                    </div>
                </div>

                <div className="field">
                    <label className="label">Image URL</label>
                    <div className="control">
                        <input
                            className="input"
                            type="text"
                            name="image"
                            value={form.image}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="control">
                    <button className="button is-primary" type="submit">
                        {editing ? 'Update Product' : 'Add Product'}
                    </button>
                </div>
            </form>

            {loading ? (
                <div className="is-flex is-justify-content-center is-align-items-center" style={{ height: '50vh' }}>
                    <Loader />
                </div>
            ) : (
                <div className="columns is-multiline is-centered">
                    {products.map((product) => (
                        <div key={product.id} className="column is-one-quarter">
                            <div className="box has-text-centered">
                                <img src={product.image || 'https://via.placeholder.com/150'} alt={product.title} className="image mb-3" />
                                <h3 className="title is-5">{product.title}</h3>
                                <p>{product.description}</p>
                                <button className="button is-info mt-2" onClick={() => handleEdit(product)}>Edit</button>
                                <button className="button is-danger ml-1 mt-2" onClick={() => handleDelete(product.id)}>Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export { Dashboard };