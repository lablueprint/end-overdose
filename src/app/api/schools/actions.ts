'use server';

import { cache } from 'react';
import { revalidatePath } from 'next/cache';
import firebase_app from '@/firebase/config';
import { School, SchoolDocument } from '@/types/School';
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
const schoolsCollection = collection(db, 'schools');

// Get the document for a particular school from the database
export const getSchool = cache(async (schoolName: string) => {
    try {
        // Query for specific school by the school name
        const schoolQuery = query(
            schoolsCollection,
            where('name', '==', schoolName)
        );

        const snapshot = await getDocs(schoolQuery);
        const schools = snapshot.docs.map((doc) => {
            const schoolData = doc.data() as School;
            return {
                id: doc.id, // The Firestore document ID
                school: schoolData, // The school data from Firestore
            } as SchoolDocument;
        });
        return schools[0];
    } catch (error) {
        console.error('Error fetching schools:', error);
        throw new Error('Failed to fetch schools.');
    }
});
