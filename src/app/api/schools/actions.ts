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
} from 'firebase/firestore';

//SERVER ACTIONS
import { getSchoolAverage } from '@/app/api/students/actions';

//1. SETUP THE DATABASE CONNECTION
const db = getFirestore(firebase_app);
const schoolsCollection = collection(db, 'schools');

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
export const getSchoolData = cache(async (schoolName: string) => {
    try {
        const schoolQuery = query(
            schoolsCollection,
            where('school_name', '==', schoolName)
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
