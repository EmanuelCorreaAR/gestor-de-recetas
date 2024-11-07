import { createContext, useContext, useEffect, useState } from 'react';
import { fetchProducts } from '../utils/store.js';

const ProductsCacheContext = createContext();

const CACHE_KEY = import.meta.env.VITE_CACHE_KEY;

export const ProductsCacheProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadProducts = async () => {
        setLoading(true);
        const cachedProducts = localStorage.getItem(CACHE_KEY);
        if (cachedProducts) {
            setProducts(JSON.parse(cachedProducts));
            setLoading(false);
        } else {
            const fetchedProducts = await fetchProducts();
            setProducts(fetchedProducts);
            localStorage.setItem(CACHE_KEY, JSON.stringify(fetchedProducts));
            setLoading(false);
        }
    };

    useEffect(() => {
        loadProducts();
    }, []);

    const updateProductsCache = (updatedProducts) => {
        setProducts(updatedProducts);
        localStorage.setItem(CACHE_KEY, JSON.stringify(updatedProducts));
    };

    return (
        <ProductsCacheContext.Provider value={{ products, loading, loadProducts, updateProductsCache }}>
            {children}
        </ProductsCacheContext.Provider>
    );
};

export const useProductsCache = () => useContext(ProductsCacheContext);