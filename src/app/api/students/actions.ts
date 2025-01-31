'use server';

import { cache } from 'react';
import { Student } from '@/types/Student';
import firebase_app from '@/firebase/config';
import {
    getFirestore,
    collection,
    getDocs,
    query,
    where,
} from 'firebase/firestore';

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

//takes in school, username, password and checks that username and password are in school's student id map
export const validateUserCredentials = cache(
    async (schoolName: string, username: string, password: string = '') => {
        try {
            const schoolRef = collection(db, 'schools');

            // Query to find the document where school name matches and user credentials exist

            const q = query(
                schoolRef,
                where('name', '==', schoolName),
                where(`school_ids.${username}`, '==', password) // Accessing nested map
            );

            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                // console.log('Valid username and password found!');
                return true; // Credentials are valid
            } else {
                // console.log('Invalid credentials or school not found.');
                return false; // No match found
            }
        } catch (error) {
            console.error('Error fetching school:', error);
            return false;
        }
    }
);

//returns student object from firebase based off studentid parameter
export const getStudentFromID = cache(async (id: string) => {
    try {
        const q = query(studentsCollection, where('student_id', '==', id)); //Find student from ID
        const snapshot = await getDocs(q);

        if (!snapshot.empty) {
            const doc = snapshot.docs[0];
            return { ...(doc.data() as Student) };
        }

        return null;
    } catch (error) {
        console.error('Error fetching student:', error);
        throw new Error('Failed to fetch student.');
    }
});
