'use server';

import { cache } from 'react';
import { Student } from '@/types/Student';
import { NewStudent } from '@/types/newStudent';
import firebase_app from '@/firebase/config';
import { auth } from '@/firebase/clientApp'; // Adjusted the path to match the project structure
import {
    getFirestore,
    collection,
    getDocs,
    getDoc,
    doc,
    updateDoc,
    query,
    setDoc,
    where,
} from 'firebase/firestore';

interface Quiz {
    name: string;
    score: number;
}

const db = getFirestore(firebase_app);
const studentsCollection = collection(db, 'newStudents');

export async function changeBackground(
    studentId: string,
    newBackgroundKey: string
) {
    const q = query(studentsCollection, where('student_id', '==', studentId));
    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
        const docRef = snapshot.docs[0].ref;
        const data = snapshot.docs[0].data();

        const profile = data.profile ?? {};
        const background = profile.background ?? '';

        await updateDoc(docRef, {
            profile: {
                ...profile,
                background: newBackgroundKey,
            },
        });
        console.log('Background changed to:', newBackgroundKey);
        return {
            background,
        };
    }
}

export async function changeCat(studentId: string, newCatKey: string) {
    const q = query(studentsCollection, where('student_id', '==', studentId));
    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
        const docRef = snapshot.docs[0].ref;
        const data = snapshot.docs[0].data();

        const profile = data.profile ?? {};
        const cat = profile.cat ?? '';

        await updateDoc(docRef, {
            profile: {
                ...profile,
                cat: newCatKey,
            },
        });
        console.log('Background changed to:', newCatKey);
        return {
            cat,
        };
    }
}
