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
    query,
    setDoc,
    where,
} from 'firebase/firestore';

interface Quiz {
    name: string;
    score: number;
}

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

// add a new student to the database
export async function addStudent(student: Student, docID: string) {
    try {
        // add to database
        await setDoc(doc(studentsCollection, docID), student);
    } catch (error) {
        console.error('Error adding admin:', error);
        throw new Error('Failed to add admin.');
    }
}

export async function addQuiz(updateQuizzes: Quiz[]) {
    try {
        const userRef = doc(db, 'students', '12n2OCj3WNa0cM4e2rUh'); // hard coded student id for now
        const userDoc = await getDoc(userRef); // DocumentSnapshot
        if (!userDoc.exists()) {
            return { error: 'Student document not found' };
        }
        await updateDoc(userRef, {
            quizzes: updateQuizzes,
        });
        return { success: true };
    } catch (error) {
        console.error(error);
        throw new Error('Failed to log in admin.');
    }
}

//takes in school, username, password and checks that username and password are in school's student id map
export const validateUserCredentials = cache(
    async (
        schoolName: string,
        studentID: string,
        optionalPassword: string = ''
    ) => {
        try {
            const schoolRef = collection(db, 'schools');

            // Query to find the document where school name matches and user credentials exist
            const q = query(
                schoolRef,
                where('name', '==', schoolName),
                where(`school_ids.${studentID}`, '==', optionalPassword) // Accessing nested map
            );

            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                // console.log('Valid username and password found!');
                return { success: true }; // Credentials are valid
            } else {
                // console.log('Invalid credentials or school not found.');
                return { success: false }; // No match found
            }
        } catch (error) {
            console.error('Error fetching school:', error);
            return { success: false };
        }
    }
);

//returns student object from firebase based off studentid parameter
export const getStudentFromStudentID = cache(async (id: string) => {
    try {
        const q = query(studentsCollection, where('student_id', '==', id)); // Find student from ID
        const snapshot = await getDocs(q);

        if (!snapshot.empty) {
            const doc = snapshot.docs[0];
            return { id: doc.id, ...(doc.data() as Student) };
        }

        return null;
    } catch (error) {
        console.error('Error fetching student:', error);
        throw new Error('Failed to fetch student.');
    }
});

export const getStudent = cache(async (uid: string) => {
    try {
        const studentDocRef = doc(studentsCollection, uid);
        const studentDoc = await getDoc(studentDocRef);

        if (studentDoc.exists()) {
            return { id: studentDoc.id, ...(studentDoc.data() as Student) };
        }

        return null;
    } catch (error) {
        console.error('Error fetching student:', error);
        throw new Error('Failed to fetch student.');
    }
});

// export async function updateKibbleCount() {
//     try {
//         console.log('Success');
//         const snapshot = await getDocs(studentsCollection);
//         const updatePromises = snapshot.docs.map(async (studentDoc) => {
//             const studentRef = doc(db, 'students', studentDoc.id);
//             const kibbleCount = Math.floor(Math.random() * 1000); // Generate random number between 0-999
//             await updateDoc(studentRef, { kibble_count: kibbleCount });
//         });

//         await Promise.all(updatePromises);
//         console.log('Kibble count updated for all students.');
//     } catch (error) {
//         console.error('Error updating kibble count:', error);
//         throw new Error('Failed to update kibble count.');
//     }
// }
