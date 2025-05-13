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
import { NewStudent } from '@/types/newStudent';

interface Quiz {
    name: string;
    score: number;
}

//1. SET UP THE DATABASE TO BE REFERENCED IN THE API
const db = getFirestore(firebase_app);
const studentsCollection = collection(db, 'newStudents');

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
            return { id: doc.id, ...(doc.data() as Student) };
        }
    } catch (error) {
        console.error('Error fetching student:', error);
        throw new Error('Failed to fetch student.');
    }
});

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

//GET ALL THE STUDENTS FROM A PARTICULAR SCHOOL
export const getSchoolStudents = cache(async (schoolName: string) => {
    try {
        const q = query(
            studentsCollection,
            where('school_name', '==', schoolName)
        );
        const snapshot = await getDocs(q);
        const students = snapshot.docs.map((doc) => doc.data() as Student);
        return students;
    } catch (error) {
        console.error('Error fetching school students:', error);
        throw new Error('Failed to fetch school students.');
    }
});

//4. VALIDATE STUDENT CREDENTIALS

//takes in school, username, password and checks that username and password are in school's student id map
export const validateUserCredentials = cache(
    async (schoolName: string, studentID: string, password: string) => {
        try {
            const schoolRef = collection(db, 'joyce');

            // Query to find the document where school name matches and user credentials exist
            const q = query(
                schoolRef,
                where('school_name', '==', schoolName),
                where(
                    `student_ids.${studentID}.student_password`,
                    '==',
                    password
                ) // Accessing nested map
            );

            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const schoolDoc = querySnapshot.docs[0];
                const schoolData = schoolDoc.data();
                const firebase_id =
                    schoolData.student_ids[studentID].firebase_id; // Extract firebase_id
                // console.log('firebase_id: ', firebase_id);
                return { firebase_id, success: true }; // Credentials are valid
            } else {
                // console.log('No matching document found');
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
        const user = auth.currentUser;
        if (!user) {
            return { error: 'User data not found' };
        }
        const userRef = doc(db, 'students', user.uid); // Use the user's unique ID
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
            return { id: studentDoc.id, ...(studentDoc.data() as NewStudent) };
        }

        return null;
    } catch (error) {
        console.error('Error fetching student:', error);
        throw new Error('Failed to fetch student.');
    }
});

// add a new student to the database
export async function addStudent(student: NewStudent, docID: string) {
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
    student_id: string,
    courseName: string,
    progress: number
): Promise<UpdateCourseProgressResponse> {
    try {
        const studentWithID = await getStudentFromID(student_id);

        if (!studentWithID) {
            return { error: 'Student not found' };
        }

        const userRef = doc(db, 'students', studentWithID.id); // getting actual user's id
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
        const user = auth.currentUser;
        if (!user) {
            return { error: 'User data not found' };
        }
        const userRef = doc(db, 'students', user.uid); // Get the user document reference using the user's ID
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

export async function purchaseTheme(studentId: string, themeKey: string) {
    const q = query(studentsCollection, where('student_id', '==', studentId));
    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
        const docRef = snapshot.docs[0].ref;
        const data = snapshot.docs[0].data();

        const fish = data.fish_count ?? 0;
        const profile = data.profile ?? {};
        const unlocked = profile.unlocked ?? [];

        // Already unlocked
        if (unlocked.includes(themeKey)) return { error: 'Already owned' };
        if (fish < 25) return { error: 'Not enough fish' };

        const newUnlocked = [...unlocked, themeKey];

        await updateDoc(docRef, {
            fish_count: fish - 25,
            profile: {
                ...profile,
                cat: themeKey,
                background: themeKey,
                unlocked: newUnlocked,
            },
        });

        return {
            success: true,
            newFish: fish - 25,
            newUnlocked,
        };
    }

    return { error: 'Student not found' };
}

// Just get student from student_id (no quiz update)
export async function getStudentFromID2(studentId: string) {
    try {
        const q = query(
            studentsCollection,
            where('student_id', '==', studentId)
        );
        const snapshot = await getDocs(q);
        if (!snapshot.empty) {
            const doc = snapshot.docs[0];
            return { ...(doc.data() as NewStudent) };
        }
        return { error: 'Student not found' };
    } catch (error) {
        console.error('Error fetching student:', error);
        throw new Error('Failed to fetch student.');
    }
}

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
