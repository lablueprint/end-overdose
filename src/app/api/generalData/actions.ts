'use server';

import { cache } from 'react';
import firebase_app from '@/firebase/config';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

// 1. SETUP THE DATABASE CONNECTION
const db = getFirestore(firebase_app);

// Get all school names from the generalData collection
export const getSchoolNames = cache(async () => {
    try {
        // Get reference to the specific document in generalData collection that has the school_names map
        const docRef = doc(db, 'generalData', 'VGfQpeUMbnOfqAU0VlTW');
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
            throw new Error('General data document not found');
        }

        // Get the school_names map from the document
        const data = docSnap.data();
        const schoolNamesMap = data.school_names || {};

        // Extract just the school names (keys of the map)
        const schoolList = Object.keys(schoolNamesMap);

        return schoolList;
    } catch (error) {
        console.error('Error fetching school names:', error);
        throw new Error('Failed to fetch school names');
    }
});

// If you need the entire map of school names to IDs
export const getSchoolNamesWithIds = cache(async () => {
    try {
        const docRef = doc(db, 'generalData', 'VGfQpeUMbnOfqAU0VlTW');
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
            throw new Error('General data document not found');
        }

        // Return the entire school_names map
        const data = docSnap.data();
        return data.school_names || {};
    } catch (error) {
        console.error('Error fetching school names with IDs:', error);
        throw new Error('Failed to fetch school names with IDs');
    }
});
