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
