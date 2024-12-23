'use server';

import { cache } from 'react';
import { Student } from '@/types/Student';
import firebase_app from '@/firebase/config';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const db = getFirestore(firebase_app);
const studentsCollection = collection(db, 'students');

// get all students from the database
export const getStudents = cache(async () => {
    try {
        const snapshot = await getDocs(studentsCollection);
        const students = snapshot.docs.map((doc) => doc.data() as Student);

        return students;
    } catch (error) {
        console.error('Error fetching students:', error);
        throw new Error('Failed to fetch students.');
    }
});
