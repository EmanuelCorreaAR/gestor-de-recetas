import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { fetchProducts } from '../utils/store';

// Definir los tipos para el contexto de productos
interface Product {
    id: string;
    title: string;
    description: string;
    image: string;
}

interface ProductsCacheContextType {
    products: Product[];
    loading: boolean;
    loadProducts: () => Promise<void>;
    updateProductsCache: (updatedProducts: Product[]) => void;
}

const ProductsCacheContext = createContext<ProductsCacheContextType | undefined>(undefined);

const CACHE_KEY = import.meta.env.VITE_CACHE_KEY;

// Proveedor del contexto de productos
export const ProductsCacheProvider = ({ children }: { children: ReactNode }): JSX.Element => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const loadProducts = async (): Promise<void> => {
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

    const updateProductsCache = (updatedProducts: Product[]): void => {
        setProducts(updatedProducts);
        localStorage.setItem(CACHE_KEY, JSON.stringify(updatedProducts));
    };

    return (
        <ProductsCacheContext.Provider value={{ products, loading, loadProducts, updateProductsCache }}>
            {children}
        </ProductsCacheContext.Provider>
    );
};

// Hook para consumir el contexto de productos
export const useProductsCache = (): ProductsCacheContextType => {
    const context = useContext(ProductsCacheContext);
    if (!context) {
        throw new Error("useProductsCache debe ser utilizado dentro de un ProductsCacheProvider");
    }
    return context;
};