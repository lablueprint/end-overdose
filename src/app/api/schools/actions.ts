'use server';

import { cache } from 'react';
import { revalidatePath } from 'next/cache';
import firebase_app from '@/firebase/config';
import { School, SchoolDocument } from '@/types/School';
import {
    getFirestore,
    collection,
    getDoc,
    getDocs,
    doc,
    query,
    where,
    updateDoc,
    deleteDoc,
    deleteField,
    addDoc,
} from 'firebase/firestore';

//SERVER ACTIONS
import { getSchoolAverage, createStudent } from '@/app/api/students/actions';
import { NewStudent } from '@/types/newStudent';

//1. SETUP THE DATABASE CONNECTION
const db = getFirestore(firebase_app);
const schoolsCollection = collection(db, 'newSchools');

//SERVER ACTIONS DEFINED BELOW

//2. GETTING SCHOOL INFORMATION

//Return a particular school's information
export const getSchool = cache(async (schoolName: string) => {
    try {
        // Query for specific school by the school name
        const schoolQuery = query(
            schoolsCollection,
            where('school_name', '==', schoolName)
        );

        const snapshot = await getDocs(schoolQuery);
        const schools = snapshot.docs.map((doc) => {
            const schoolData = doc.data() as School;
            return {
                id: doc.id, // The Firestore document ID
                school: schoolData, // The school data from Firestore
            } as SchoolDocument;
        });
        return schools[0]; // Returns the first school in the array -> There should only be one school with a particular name
    } catch (error) {
        console.error('Error fetching schools:', error);
        throw new Error('Failed to fetch schools.');
    }
});

//BETTER SCHOOL INFORMATION
export const getSchoolData = cache(async (schoolId: string) => {
    try {
        const schoolQuery = query(
            schoolsCollection,
            where('school_id', '==', schoolId)
        );

        const snapshot = await getDocs(schoolQuery);
        if (snapshot.empty) {
            return null; // No school found with that name
        }

        // Return just the school data without the ID
        return snapshot.docs[0].data() as School;
    } catch (error) {
        console.error('Error fetching school:', error);
        throw new Error('Failed to fetch school.');
    }
});

export const getSchoolDataByID = cache(async (schoolId: number) => {
    try {
        const schoolQuery = query(
            schoolsCollection,
            where('school_id', '==', schoolId)
        );

        const snapshot = await getDocs(schoolQuery);
        if (snapshot.empty) {
            return null; // No school found with that name
        }

        // Return just the school data without the ID
        return snapshot.docs[0].data() as School;
    } catch (error) {
        console.error('Error fetching school:', error);
        throw new Error('Failed to fetch school.');
    }
});

//Return the total number of schools
export const getSchoolCount = cache(async () => {
    try {
        const snapshot = await getDocs(schoolsCollection);
        return snapshot.size; // Returns the number of schools
    } catch (error) {
        console.error('Error fetching school count:', error);
        throw new Error('Failed to fetch school count.');
    }
});

//Return information of ALL THE SCHOOLS (Query all the schools if we want total information about all schools)
//school_id, school_name, school_email, student_count, aggregated student scores
// Enhanced School Information Type
interface EnhancedSchool extends School {
    average_score: number | null;
}

export const getAllSchools = cache(async () => {
    try {
        const snapshot = await getDocs(schoolsCollection);

        // Get all schools
        const schools = snapshot.docs.map((doc) => doc.data() as School);

        // Create an array of promises to get average scores
        const schoolPromises = schools.map(async (school) => {
            // Get average score for each school
            const average_score = await getSchoolAverage(school.school_name);
            //DEBUG
            // console.log(
            //     `School: ${school.school_name}, Avg Score:`,
            //     average_score
            // );
            // Return enhanced school object
            return {
                school_id: school.school_id,
                school_name: school.school_name,
                school_email: school.school_email || '',
                student_count: school.student_count,
                average_score: average_score,
            } as EnhancedSchool;
        });

        // Wait for all promises to resolve
        const enhancedSchools = await Promise.all(schoolPromises);

        return enhancedSchools;
    } catch (error) {
        console.error('Error fetching all schools:', error);
        throw new Error('Failed to fetch all schools.');
    }
});

//Return a list of all school names
export const getAllSchoolsNames = cache(async () => {
    try {
        const snapshot = await getDocs(schoolsCollection);
        const schoolNames = snapshot.docs.map((doc) => {
            const schoolData = doc.data() as School;
            return schoolData.school_name;
        });
        return schoolNames; // Returns an array of all school names
    } catch (error) {
        console.error('Error fetching all schools:', error);
        throw new Error('Failed to fetch all schools.');
    }
});

//EXTRA SERVER ACTIONS DEFINED BELOW

// Update the inclusion of a course for a school in the database
// If the course is already included, it will be removed
// If the course is not included, it will be added
export const toggleCourseInclusion = async (
    schoolId: string,
    courseId: string
) => {
    try {
        // Get the school document
        const schoolDoc = doc(db, 'schools', schoolId);
        const schoolData = (await getDoc(schoolDoc)).data() as School;

        // Toggle the course inclusion
        const includedCourses = schoolData.course_ids;
        const updatedCourses = includedCourses.includes(courseId)
            ? includedCourses.filter((id) => id !== courseId) // If courseID already in includedCourses, toggle removes that id from includedCourses.
            : [...includedCourses, courseId]; // Othewise, courseId is added to includedCourses.

        // Update the school document with the new course list
        await updateDoc(schoolDoc, {
            course_ids: updatedCourses, // Sets course_ids to our new updatedCourses array
        });

        // Revalidate the school data in the cache
        revalidatePath(`/api/schools/${schoolId}`);
    } catch (error) {
        console.error('Error toggling course inclusion:', error);
    }
};

export const addIdPasswordPair = async (
    schoolId: string,
    newId: string,
    newPassword: string
) => {
    // should also take strings for id and password
    try {
        // Get the school document reference
        const schoolDocRef = doc(db, 'schools', schoolId);
        const schoolSnapshot = await getDoc(schoolDocRef);

        if (!schoolSnapshot.exists()) {
            throw new Error('School document not found.');
        }

        // Update the school document with the new ID-password pair
        await updateDoc(schoolDocRef, {
            [`school_ids.${newId}`]: newPassword, // Dynamically add the new ID-password pair
        });

        // Revalidate the school data in the cache
        revalidatePath('/');
    } catch (error) {
        console.error('Error toggling course inclusion:', error);
    }
};

// Function to generate a random 7-character password
const generateRandomPassword = (): string => {
    const chars =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let password = '';
    for (let i = 0; i < 7; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
};

// Create a student and add them to the school
export const createStudentAndAddToSchool = async (
    studentId: string,
    schoolId: string
) => {
    try {
        const { success, firebase_id } = await createStudent(
            studentId,
            schoolId
        );
        if (!success || !firebase_id)
            throw new Error('Student creation failed');

        const studentPassword = generateRandomPassword();

        const schoolDocRef = doc(db, 'newSchools', schoolId);
        await updateDoc(schoolDocRef, {
            [`student_ids.${studentId}`]: {
                student_firebase_id: firebase_id,
                student_password: studentPassword,
            },
        });

        return {
            success: true,
            firebase_id,
            student_password: studentPassword,
        };
    } catch (error) {
        console.error('Error creating and linking student:', error);
        return { error: 'Failed to create student and update school record' };
    }
};

// Deletes a student from Firestore and their reference in the school's student_ids
export async function deleteStudentFromSchool(
    schoolId: string,
    studentId: string
) {
    try {
        const schoolQuery = query(
            collection(db, 'newSchools'),
            where('school_id', '==', schoolId)
        );
        const snapshot = await getDocs(schoolQuery);
        if (snapshot.empty) throw new Error('School not found');

        const schoolDocRef = snapshot.docs[0].ref;
        const schoolData = snapshot.docs[0].data();

        const studentEntry = schoolData.student_ids?.[studentId];
        if (!studentEntry) throw new Error('Student not found in school');

        const studentFirebaseId = studentEntry.student_firebase_id;

        // 1. Delete the student document from newStudents
        const newStudentsCollection = collection(db, 'newStudents');
        const studentDocRef = doc(newStudentsCollection, studentFirebaseId);
        await deleteDoc(studentDocRef);

        // 2. Remove the student entry from student_ids in the school document
        await updateDoc(schoolDocRef, {
            [`student_ids.${studentId}`]: deleteField(),
        });

        return { success: true };
    } catch (error) {
        console.error('Error deleting student:', error);
        return { error: 'Failed to delete student from school.' };
    }
}

// Creates a new school document with initialized fields
export async function createNewSchool(schoolName: string) {
    try {
        //create the base school document
        const newSchoolData = {
            school_name: schoolName,
            enrolled_students: 0,
            average_performances: {
                opioidCourse: 0,
                //add more course keys if needed
            },
            students_completed: 0,
            students_in_progress: 0,
            student_ids: {},
        };

        const schoolDocRef = await addDoc(
            collection(db, 'newSchools'),
            newSchoolData
        );
        const schoolId = schoolDocRef.id;

        //immediately update that doc to include its FIREBASE ID as `school_id`
        await updateDoc(schoolDocRef, { school_id: schoolId });

        return {
            success: true,
            school_id: schoolId,
        };
    } catch (error) {
        console.error('Error creating new school:', error);
        return { error: 'Failed to create new school.' };
    }
}

// Return statistics (average of all course performance averages,
// number of enrolled/completed/in-progress students) for a particular school given its (Firebase doc) ID
export const getSchoolStats = cache(async (schoolId: string) => {
    try {
        const schoolDocRef = doc(db, 'newSchools', schoolId);
        const schoolSnapshot = await getDoc(schoolDocRef);

        if (!schoolSnapshot.exists()) {
            console.error('School doc not found');
        }

        const data = schoolSnapshot.data();

        const performances = data.average_performances;
        const values = Object.values(performances);
        const numericValues = values.filter(
            (val): val is number => typeof val === 'number'
        );

        const averageScore = numericValues.length
            ? numericValues.reduce((sum, val) => sum + val, 0) /
              numericValues.length
            : null;

        return {
            enrolled_students: data.enrolled_students ?? 0,
            average_score: averageScore,
            students_in_progress: data.students_in_progress ?? 0,
            students_completed: data.students_completed ?? 0,
        };
    } catch (error) {
        console.error('Error fetching school stats:', error);
    }
});

export const getSchoolStudentIds = cache(async (schoolId: string) => {
    try {
        const schoolDocRef = doc(db, 'newSchools', schoolId);
        const schoolSnapshot = await getDoc(schoolDocRef);

        if (!schoolSnapshot.exists()) {
            console.error('School doc not found');
        }

        const data = schoolSnapshot.data();

        if (data) {
            const student_ids = data.student_ids;
            const result = Object.keys(student_ids).reduce(
                (acc: Record<string, string>, key: string) => {
                    acc[key] = student_ids[key].student_password; // Set the value for each key to the student password
                    return acc;
                },
                {}
            );

            return result;
        }
    } catch (error) {
        console.error('Error fetching school student ids', error);
    }
});
