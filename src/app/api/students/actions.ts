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
    where,
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
interface Quiz {
    name: string;
    score: number;
}

//1. SET UP THE DATABASE TO BE REFERENCED IN THE API
const db = getFirestore(firebase_app);
const studentsCollection = collection(db, 'students');
const auth = getAuth();

//CREATE SERVER ACTIONS

//2. GETTING STUDENT INFORMATION

// Get all students from the database
export const getStudents = cache(async () => {
    try {
        const snapshot = await getDocs(studentsCollection);
        const students = snapshot.docs.map((doc) => doc.data() as Student); //THIS MAPS THE STUDENT TO THEIR DATA

        return students; //WE RETURN THIS MAP OF STUDENTS -> DATA
    } catch (error) {
        console.error('Error fetching students:', error);
        throw new Error('Failed to fetch students.');
    }
});

// Return number of students in database
export const getStudentCount = cache(async () => {
    try {
        const snapshot = await getDocs(studentsCollection);
        return snapshot.size; //GET THE SIZE OF THE DOC (NUMBER OF STUDENTS)
    } catch (error) {
        console.error('Error fetching students:', error);
        throw new Error('Failed to fetch students.');
    }
});

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

//3. AVERAGING STUDENT SCORES/INFORMATION (Using aggregate function)

//Get average courseScore for each course, for all students of a specific school
export const getSchoolCourseAverages = cache(async (schoolName: string) => {
    try {
        // Query to find all students from a specific school
        const q = query(
            studentsCollection,
            where('school_name', '==', schoolName)
        );
        const snapshot = await getDocs(q);

        if (snapshot.empty) {
            return { error: 'No students found for this school' };
        }

        // Initialize counters
        let opioidCourseTotal = 0;
        let opioidCourseCount = 0;
        let careerCourseTotal = 0;
        let careerCourseCount = 0;

        //NOTE: We should only add them to the average score if they have a above 0 score
        //
        // Iterate through students and accumulate scores
        snapshot.docs.forEach((doc) => {
            const student = doc.data() as Student;

            // Check if the student has completed the opioid course
            if (
                student.course_completion?.opioidCourse?.courseScore !==
                undefined
            ) {
                opioidCourseTotal +=
                    student.course_completion.opioidCourse.courseScore;
                opioidCourseCount++;
            }

            // Check if the student has completed the career course
            if (
                student.course_completion?.careerCourse?.courseScore !==
                undefined
            ) {
                careerCourseTotal +=
                    student.course_completion.careerCourse.courseScore;
                careerCourseCount++;
            }
        });

        // Calculate averages
        const averages = {
            totalStudents: snapshot.size,
            opioidCourse:
                opioidCourseCount > 0
                    ? opioidCourseTotal / opioidCourseCount
                    : 0,
            careerCourse:
                careerCourseCount > 0
                    ? careerCourseTotal / careerCourseCount
                    : 0,
        };

        return averages;
    } catch (error) {
        console.error('Error calculating school course averages:', error);
        throw new Error('Failed to calculate school course averages.');
    }
});

//4. VALIDATE STUDENT CREDENTIALS

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

//5. ADDING FEATURES TO STUDENTS

// Add a quiz to the database
export async function addQuiz(updateQuizzes: Quiz[]) {
    try {
        console.log('work');
        // const user = auth.currentUser;
        // if (!user) {
        //     return { error: 'User data not found' };
        // }
        const userRef = doc(db, 'students', '12n2OCj3WNa0cM4e2rUh'); // hard coded student id for now
        const userDoc = await getDoc(userRef); // DocumentSnapshot
        if (!userDoc.exists()) {
            return { error: 'Student document not found' };
        }
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
