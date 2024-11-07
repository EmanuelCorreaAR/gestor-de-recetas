import { db } from '../config/firebaseConfig.js';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';

const productsCollection = collection(db, 'products');

// Obtener todos los productos
export const fetchProducts = async () => {
    try {
        const querySnapshot = await getDocs(productsCollection);
        const products = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return products;
    } catch (error) {
        console.error("Error fetching products:", error);
        return [];
    }
};

// Agregar un nuevo producto
export const addProduct = async (product) => {
    try {
        const docRef = await addDoc(productsCollection, product);
        console.log("Producto agregado exitosamente:");
        return { id: docRef.id, ...product };
    } catch (error) {
        console.error("Error adding product:", error);
    }
};

// Actualizar un producto existente
export const updateProduct = async (id, updatedProduct) => {
    try {
        const productDoc = doc(db, 'products', id);
        await updateDoc(productDoc, updatedProduct);
        console.log("Producto actualizado exitosamente.");
    } catch (error) {
        console.error("Error updating product:", error);
    }
};

// Eliminar un producto
export const deleteProduct = async (id) => {
    try {
        const productDoc = doc(db, 'products', id);
        await deleteDoc(productDoc);
        console.log("Producto eliminado exitosamente.");
    } catch (error) {
        console.error("Error deleting product:", error);
    }
};