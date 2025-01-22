'use server';

import { cache } from 'react';
import { Student } from '@/types/Student';
import firebase_app from '@/firebase/config';
import {
    getFirestore,
    collection,
    getDocs,
    getDoc,
    doc,
    updateDoc,
    arrayUnion,
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const db = getFirestore(firebase_app);
const studentsCollection = collection(db, 'students');
const auth = getAuth();

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

export async function addQuiz(name: string, score: number) {
    console.log('addQuiz called with:', { name, score });
    try {
        console.log('work');
        // const user = auth.currentUser;
        // if (!user) {
        //     return { error: 'User data not found' };
        // }
        console.log('User doc data 1');
        const userRef = doc(db, 'students', '0MPsmi7hK2Yh8966AaQ8'); // DocumentReference
        const userDoc = await getDoc(userRef); // DocumentSnapshot
        console.log('User doc data 2');
        if (!userDoc.exists()) {
            return { error: 'Student document not found' };
        }
        await updateDoc(userRef, {
            quizzes: arrayUnion({
                name,
                score,
            }),
        });
        return { success: true };
    } catch (error) {
        console.error(error);
        throw new Error('Failed to log in admin.');
    }
}
