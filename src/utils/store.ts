import { db } from '../config/firebaseConfig';
import {collection,getDocs,addDoc,updateDoc,deleteDoc,doc} from 'firebase/firestore';

// Definición de tipos para el producto
interface Product {
    title: string;
    description: string;
    image?: string;
}

// Colección de productos
const productsCollection = collection(db, 'products');

// Obtener todos los productos
export const fetchProducts = async (): Promise<Product[]> => {
    try {
        const querySnapshot = await getDocs(productsCollection);
        const products = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as Product[];
        return products;
    } catch (error) {
        console.error("Error fetching products:", error);
        return [];
    }
};

// Agregar un nuevo producto
export const addProduct = async (product: Product): Promise<Product | void> => {
    try {
        const docRef = await addDoc(productsCollection, product);
        console.log("Producto agregado exitosamente.");
        return { id: docRef.id, ...product };
    } catch (error) {
        console.error("Error adding product:", error);
    }
};

// Actualizar un producto existente
export const updateProduct = async (id: string, updatedProduct: Partial<Product>): Promise<void> => {
    try {
        const productDoc = doc(db, 'products', id);
        await updateDoc(productDoc, updatedProduct);
        console.log("Producto actualizado exitosamente.");
    } catch (error) {
        console.error("Error updating product:", error);
    }
};

// Eliminar un producto
export const deleteProduct = async (id: string): Promise<void> => {
    try {
        const productDoc = doc(db, 'products', id);
        await deleteDoc(productDoc);
        console.log("Producto eliminado exitosamente.");
    } catch (error) {
        console.error("Error deleting product:", error);
    }
};