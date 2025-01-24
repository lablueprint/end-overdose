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
interface Quiz {
    name: string;
    score: number;
}

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

export async function addQuiz(updateQuizzes: Quiz[]) {
    try {
        console.log('work');
        // const user = auth.currentUser;
        // if (!user) {
        //     return { error: 'User data not found' };
        // }
        const userRef = doc(db, 'students', '12n2OCj3WNa0cM4e2rUh'); // DocumentReference
        const userDoc = await getDoc(userRef); // DocumentSnapshot
        if (!userDoc.exists()) {
            return { error: 'Student document not found' };
        }
        // const quizzes = userDoc.data().quizzes;
        // console.log('quizzes: ', quizzes);
        // const updateQuizzes = quizzes.some((quiz) => quiz.name === name)
        //     ? quizzes.map((quiz) =>
        //           quiz.name === name ? { ...quiz, score: newScore } : quiz
        //       )
        //     : [...quizzes, { name: name, score: newScore }];
        console.log('update quizzes: ', updateQuizzes);
        await updateDoc(userRef, {
            quizzes: updateQuizzes,
        });
        return { success: true };
    } catch (error) {
        console.error(error);
        throw new Error('Failed to log in admin.');
    }
}
