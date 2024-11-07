import {signInWithEmailAndPassword, GoogleAuthProvider,signInWithPopup,createUserWithEmailAndPassword,signOut} from 'firebase/auth';
import { auth } from '../config/firebaseConfig';

// Definición de tipos para las respuestas
interface AuthResponse {
    success: boolean;
    message?: string;
}

export const emailLogin = async (email: string, password: string): Promise<AuthResponse> => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
        return { success: true };
    } catch (error: any) {
        return { success: false, message: error.message };
    }
};

export const googleLogin = async (): Promise<AuthResponse> => {
    const provider = new GoogleAuthProvider();
    try {
        await signInWithPopup(auth, provider);
        return { success: true };
    } catch (error: any) {
        return { success: false, message: error.message };
    }
};

export const handleLogout = async (): Promise<AuthResponse> => {
    try {
        await signOut(auth);
        return { success: true };
    } catch (error: any) {
        return { success: false, message: error.message };
    }
};

export const registerUser = async (email: string, password: string): Promise<AuthResponse> => {
    try {
        await createUserWithEmailAndPassword(auth, email, password);
        return { success: true };
    } catch (error: any) {
        return { success: false, message: error.message };
    }
};