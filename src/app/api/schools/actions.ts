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

const db = getFirestore(firebase_app);
const schoolsCollection = collection(db, 'schools');

// Get the document for a particular school from the database
// This assumes that school name is unique in the database
export const getSchool = cache(async (schoolName: string) => {
    try {
        // Query for specific school by the school name
        const schoolQuery = query(
            schoolsCollection,
            where('name', '==', schoolName)
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