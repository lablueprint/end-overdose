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
    updateDoc,
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
        const { error } = await signIn(email, password);
        if (error) {
            return { error: 'Wrong email or password. Try again.', user: null };
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

// Get all of the school admins, grouped by school
// Returns a hash map with the outer key being school (first string) and the value being another hash map
// with the key being email (second string) and the value being the Admin object with that email.
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

        // The below structure is a hash map with the outer key being school (first string) and
        // the value being another hash map with the key being email (second string) and the value
        // being the Admin object with that email.

        const adminsBySchool = SchoolAdmins.reduce(
            (acc: Record<string, Record<string, Admin>>, admin: Admin) => {
                if (!acc[admin.school_name]) {
                    acc[admin.school_name] = {};
                }
                acc[admin.school_name][admin.email] = admin;
                return acc;
            },
            {}
        );

        return adminsBySchool;
    } catch (error) {
        console.error('Error fetching admin:', error);
        throw new Error('Failed to fetching admin.');
    }
});

// Updates the approval status of the admin user with the given email to the new given approval status
// Input: email of the admin user, new approval status
// Output: success status and new approval status
export async function updateAdminApproval(
    adminEmail: string,
    newApprovalStatus: boolean
) {
    try {
        // Query admin by email field and get the document reference to it
        const adminQuery = query(
            adminsCollection,
            where('email', '==', adminEmail)
        );
        const querySnapshot = await getDocs(adminQuery);
        const docId = querySnapshot.docs[0].id;
        const adminDocRef = doc(adminsCollection, docId);

        // Update the 'approved' field
        await updateDoc(adminDocRef, {
            approved: newApprovalStatus,
        });

        // Revalidate the path to ensure the data is up-to-date
        revalidatePath(`/api/admins/${docId}`);

        return { success: true, newStatus: newApprovalStatus };
    } catch (error) {
        console.error('Error updating user approval status:', error);
        return {
            success: false,
            error: 'Failed to update user approval status',
        };
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
