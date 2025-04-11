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

//1. SET UP THE DATABASE TO BE REFERENCED IN THE API
const db = getFirestore(firebase_app);
const studentsCollection = collection(db, 'students');

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
export const getStudentFromID = cache(
    async (id: string, updateQuizzes: Quiz[]) => {
        try {
            const q = query(studentsCollection, where('student_id', '==', id)); //Find student from ID
            const snapshot = await getDocs(q);

            if (!snapshot.empty) {
                const doc = snapshot.docs[0];
                await updateDoc(doc.ref, {
                    quizzes: updateQuizzes,
                });
                return { ...(doc.data() as Student) };
            }

            return { error: 'Student document not found' };
        } catch (error) {
            console.error('Error fetching student:', error);
            throw new Error('Failed to fetch student.');
        }
    }
);

//3. AVERAGING STUDENT SCORES/INFORMATION (Using aggregate function)
export const getSchoolAverage = cache(async (schoolName: string) => {
    try {
        // Query students from the specific school
        const q = query(
            studentsCollection,
            where('school_name', '==', schoolName)
        );
        const snapshot = await getDocs(q);

        // If no students found, return null or 0
        if (snapshot.empty) {
            return null;
        }

        // Convert snapshot to students array
        const students = snapshot.docs.map((doc) => doc.data() as Student);

        // Calculate average course scores for each student
        const studentAverages = students.map((student) => {
            const opioidScore =
                student.course_completion.opioidCourse.courseScore;
            const careerScore =
                student.course_completion.careerCourse.courseScore;

            // Average of two course scores for each student
            return (opioidScore + careerScore) / 2;
        });

        // Calculate the average of student averages
        const schoolAverage =
            studentAverages.reduce((sum, score) => sum + score, 0) /
            studentAverages.length;

        // Round to two decimal places
        return Number(schoolAverage.toFixed(2));
    } catch (error) {
        console.error('Error calculating school average:', error);
        throw new Error('Failed to calculate school average.');
    }
});

//4. VALIDATE STUDENT CREDENTIALS

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

// get student by document id
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

interface UpdateCourseProgressResponse {
    success?: boolean;
    error?: string;
}

export async function updateCourseProgress(
    courseName: string,
    progress: number
): Promise<UpdateCourseProgressResponse> {
    try {
        const userRef = doc(db, 'students', '9eS2jAa6DC0qBNvmdSWO'); //later, replace userId with the actual user's Id
        const userDoc = await getDoc(userRef);

        if (!userDoc.exists()) {
            return { error: 'Student document not found' };
        }

        await updateDoc(userRef, {
            [`course_completion.${courseName}.courseProgress`]: progress, // Update the courseProgress field
        });

        return { success: true };
    } catch (error) {
        console.error(error);
        throw new Error('Failed to update course progress.');
    }
}

// Function to fetch course progress from Firestore
export async function getCourseProgress(courseName: string) {
    try {
        const userRef = doc(db, 'students', '9eS2jAa6DC0qBNvmdSWO'); // Get the user document reference using the user's ID
        const userDoc = await getDoc(userRef);

        if (!userDoc.exists()) {
            return { error: 'Student document not found' };
        }

        const userData = userDoc.data(); // Get user data from Firestore
        const courseProgress =
            userData?.course_completion?.[courseName]?.courseProgress;

        // If course progress exists, return it
        if (courseProgress !== undefined) {
            return { progress: courseProgress };
        } else {
            return { error: 'Course progress not found for this user' };
        }
    } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch course progress.');
    }
}

// get kibble count from student id
export const getKibbleFromStudentID = cache(async (id: string) => {
    try {
        const q = query(studentsCollection, where('student_id', '==', id)); // Find student from ID
        const snapshot = await getDocs(q);

        if (!snapshot.empty) {
            const doc = snapshot.docs[0];
            const student = doc.data() as Student;
            return { kibble_count: student.kibble_count };
        }

        return null;
    } catch (error) {
        console.error('Error fetching student:', error);
        throw new Error('Failed to fetch student.');
    }
});
