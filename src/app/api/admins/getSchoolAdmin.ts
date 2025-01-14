'use server';

import { cache } from 'react';
import { Admin } from '@/types/Admin';
import firebase_app from '@/firebase/config';
import {
    getFirestore,
    collection,
    getDocs,
    query,
    where,
} from 'firebase/firestore';

const db = getFirestore(firebase_app);
const adminsCollection = collection(db, 'admins');

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
