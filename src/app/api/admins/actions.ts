'use server';

import { cache } from 'react';
import { revalidatePath } from 'next/cache';
import { Admin } from '@/types/Admin';
import firebase_app from '@/firebase/config';
import { getAuth } from 'firebase/auth';
import signIn from '@/firebase/auth/signIn';
import signUp from '@/firebase/auth/signUp';
import {
    getFirestore,
    collection,
    getDoc,
    getDocs,
    doc,
    addDoc,
    deleteDoc,
    query,
    where,
    setDoc,
} from 'firebase/firestore';

const db = getFirestore(firebase_app);
const auth = getAuth();
const adminsCollection = collection(db, 'admins');

// get all admins from the database
export const getAdmins = cache(async () => {
    try {
        const snapshot = await getDocs(adminsCollection);
        const admins = snapshot.docs.map((doc) => doc.data() as Admin);

        return admins;
    } catch (error) {
        console.error('Error fetching admins:', error);
        throw new Error('Failed to fetch admins.');
    }
});

// add a new admin to the database
export async function addAdmin(admin: Admin) {
    try {
        // add to database
        await addDoc(adminsCollection, admin);

        // revalidate data
        revalidatePath('');
    } catch (error) {
        console.error('Error adding admin:', error);
        throw new Error('Failed to add admin.');
    }
}

// delete an admin from the database, indexed by email
export async function deleteAdmin(adminEmail: string) {
    try {
        // query admin by email field
        const adminQuery = query(
            adminsCollection,
            where('email', '==', adminEmail)
        );
        const querySnapshot = await getDocs(adminQuery);
        const docId = querySnapshot.docs[0].id;
        await deleteDoc(doc(adminsCollection, docId));

        // revalidate data
        revalidatePath('');
    } catch (error) {
        console.error('Error deleting admin:', error);
        throw new Error('Failed to delete admin.');
    }
}

// log in an admin
// getting the authenticated user from firebase auth
// switch to getting the user from zustand store later
export async function loginAdmin(email: string, password: string) {
    try {
        const { result, error } = await signIn(email, password);
        if (error) {
            return { error };
        }
        const user = auth.currentUser;
        if (!user) {
            return { error: 'User not authorized in app.' };
        }
        const userDoc = await getDoc(doc(db, 'admins', user.uid));
        if (!userDoc.exists()) {
            return { error: 'User data not found.' };
        }
        return { success: true };
    } catch (error) {
        console.error('Error logging in admin:', error);
        throw new Error('Failed to log in admin.');
    }
}

export async function signupAdmin(admin: Admin, password: string) {
    const { result, error } = await signUp(admin.email, password);
    if (error) {
        return { error };
    }
    try {
        if (!result?.userId) {
            return { error: 'Failed to retrieve user ID. Please try again.' };
        }
        //save user role in Firestore
        await setDoc(doc(db, 'admins', result.userId), admin);
        return { success: true };
    } catch (error) {
        console.error('Error signing up admin:', error);
        throw new Error('Failed to log in admin.');
    }
}

// get all of the school admins
export const getSchoolAdmins = cache(async () => {
    try {
        // query admin by email field
        const adminQuery = query(
            adminsCollection,
            where('role', '==', 'school_admin')
        );
        const querySnapshot = await getDocs(adminQuery);
        const SchoolAdmins = querySnapshot.docs.map(
            (doc) => doc.data() as Admin
        );

        return SchoolAdmins;
    } catch (error) {
        console.error('Error deleting admin:', error);
        throw new Error('Failed to delete admin.');
    }
});
