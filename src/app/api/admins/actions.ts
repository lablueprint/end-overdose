'use server';

import { cache } from 'react';
import { revalidatePath } from 'next/cache';
import { Admin } from '@/types/Admin';
import firebase_app from '@/firebase/config';
import {
    getFirestore,
    collection,
    getDocs,
    doc,
    addDoc,
    deleteDoc,
    query,
    where,
} from 'firebase/firestore';

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
