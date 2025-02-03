'use server';

import { cache } from 'react';
import { revalidatePath } from 'next/cache';
import { Admin } from '@/types/Admin';
import {
    getFirestore,
    collection,
    getDocs,
    doc,
    setDoc,
    deleteDoc,
    query,
    where,
} from 'firebase/firestore';
import { getAuthenticatedAppForUser } from '@/firebase/serverApp';
import firebase_app from '@/firebase/config';

const db = getFirestore(firebase_app);
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
export async function addAdmin(admin: Admin, userId: string) {
    try {
        // authenticate the user calling this endpoint
        const { firebaseServerApp } = await getAuthenticatedAppForUser();
        const auth_db = getFirestore(firebaseServerApp);
        const adminsCollection = collection(auth_db, 'admins');

        // add to database
        await setDoc(doc(adminsCollection, userId), admin);

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
        // authenticate the user calling this endpoint
        const { firebaseServerApp } = await getAuthenticatedAppForUser();
        const auth_db = getFirestore(firebaseServerApp);
        const adminsCollection = collection(auth_db, 'admins');

        // query admin by email field
        const adminQuery = query(
            adminsCollection,
            where('email', '==', adminEmail)
        );

        // delete from the firebase
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

export const getAdminFromEmail = cache(async (email: string) => {
    try {
        const q = query(adminsCollection, where('email', '==', email));
        const snapshot = await getDocs(q);

        if (!snapshot.empty) {
            const doc = snapshot.docs[0];

            return { id: doc.id, ...(doc.data() as Admin) };
        }

        return null;
    } catch (error) {
        console.error('Error fetching admins:', error);
        throw new Error('Failed to fetch admins.');
    }
});
