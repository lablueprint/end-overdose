'use server';

import { cache } from 'react';
import { revalidatePath } from 'next/cache';
import { Admin } from '@/types/Admin';
import firebase_app from '@/firebase/config';
import {
    getFirestore,
    collection,
    getDoc,
    getDocs,
    doc,
    setDoc,
    deleteDoc,
    query,
    where,
    updateDoc,
} from 'firebase/firestore';
import { getAuthenticatedAppForUser } from '@/firebase/serverApp';
import { NewSchoolAdmin } from '@/types/newSchoolAdmin';
import { NewEOAdmin } from '@/types/newEOAdmin';

const db = getFirestore(firebase_app);
const adminsCollection = collection(db, 'newSchoolAdmin');
const schoolsCollection = collection(db, 'schools');

// get all admins from the database
export const getAdmins = cache(async () => {
    try {
        const snapshot = await getDocs(adminsCollection);
        const admins = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));

        return admins;
    } catch (error) {
        console.error('Error fetching admins:', error);
        throw new Error('Failed to fetch admins.');
    }
});

// add a new admin to the database
export async function addAdmin(admin: Admin, userId: string) {
    try {
        // authenticate the user calling this endpoint
        const { firebaseServerApp } = await getAuthenticatedAppForUser();
        const auth_db = getFirestore(firebaseServerApp);
        const adminsCollection = collection(auth_db, 'admins');

        // add to database
        await setDoc(doc(adminsCollection, userId), admin);

        // revalidate data
        revalidatePath('');
    } catch (error) {
        console.error('Error adding admin:', error);
        throw new Error('Failed to add admin.');
    }
}

// delete an admin from the database, indexed by email
export async function deleteAdmin(adminEmail: string) {
    try {
        // authenticate the user calling this endpoint

        // query admin by email field
        const adminQuery = query(
            adminsCollection,
            where('email', '==', adminEmail)
        );

        // delete from the firebase
        const querySnapshot = await getDocs(adminQuery);

        if (querySnapshot.empty) {
            throw new Error('Admin not found');
        }
        const docId = querySnapshot.docs[0].id;
        await deleteDoc(doc(adminsCollection, docId));

        // revalidate data
        revalidatePath('');
    } catch (error) {
        console.error('Error deleting admin:', error);
        throw new Error('Failed to delete admin.');
    }
}

// Get all of the school admins, grouped by school
// Returns a hash map with the outer key being school (first string) and the value being another hash map
// with the key being email (second string) and the value being the Admin object with that email.
export const getSchoolAdmins = cache(async () => {
    try {
        // query admin by email field
        const adminQuery = query(adminsCollection);
        const querySnapshot = await getDocs(adminQuery);
        const SchoolAdmins = querySnapshot.docs.map(
            (doc) => doc.data() as NewSchoolAdmin
        );

        // The below structure is a hash map with the outer key being school (first string) and
        // the value being another hash map with the key being email (second string) and the value
        // being the Admin object with that email.

        const adminsBySchool = SchoolAdmins.reduce(
            (acc: Record<string, Record<string, NewSchoolAdmin>>, admin: NewSchoolAdmin) => {
                if (!acc[admin.school_id]) {
                    acc[admin.school_id] = {};
                }
                acc[admin.school_id][admin.email] = admin;
                return acc;
            },
            {}
        );

        return adminsBySchool;
    } catch (error) {
        console.error('Error fetching admin:', error);
        throw new Error('Failed to fetching admin.');
    }
});

export const getSingleSchoolAdminEmailMap = cache(async () => {
    try {
        // query admin by email field
        const adminQuery = query(adminsCollection);
        const querySnapshot = await getDocs(adminQuery);
        const SchoolAdmins = querySnapshot.docs.map(
            (doc) => doc.data() as NewSchoolAdmin
        );

        // The below structure is a hash map with the outer key being school (first string) and
        // the value being another hash map with the key being email (second string) and the value
        // being the Admin object with that email.

        const adminsBySchool = SchoolAdmins.reduce(
            (acc: Record<string, string>, admin: NewSchoolAdmin) => {
                if (!acc[admin.school_id]) {
                    acc[admin.school_id] = admin.email;
                }
                return acc;
            },
            {}
        );

        return adminsBySchool;
    } catch (error) {
        console.error('Error fetching admin:', error);
        throw new Error('Failed to fetching admin.');
    }
});

export const getCourseCount = cache(async (email: string) => {
    const q = query(adminsCollection, where('email', '==', email));
    const snapshot = await getDocs(q);
    if (snapshot.empty) {
        throw new Error('Admin not found');
    }
    const schoolName = snapshot.docs[0].data().school_name;
    const q2 = query(schoolsCollection, where('name', '==', schoolName));
    const snapshot2 = await getDocs(q2);
    if (snapshot2.empty) {
        throw new Error('School not found');
    }
    return snapshot2.docs[0].data().course_ids.length;
});

// Updates the approval status of the admin user with the given email to the new given approval status
// Input: email of the admin user, new approval status
// Output: success status and new approval status
export async function updateAdminApproval(
    adminEmail: string,
    newApprovalStatus: boolean
) {
    try {
        // Query admin by email field and get the document reference to it
        const adminQuery = query(
            adminsCollection,
            where('email', '==', adminEmail)
        );
        const querySnapshot = await getDocs(adminQuery);
        const docId = querySnapshot.docs[0].id;
        const adminDocRef = doc(adminsCollection, docId);

        // Update the 'approved' field
        await updateDoc(adminDocRef, {
            approved: newApprovalStatus,
        });

        // Revalidate the path to ensure the data is up-to-date
        revalidatePath(`/api/admins/${docId}`);

        return { success: true, newStatus: newApprovalStatus };
    } catch (error) {
        console.error('Error updating user approval status:', error);
        return {
            success: false,
            error: 'Failed to update user approval status',
        };
    }
}

export const getAdminFromEmail = cache(async (email: string) => {
    try {
        const q = query(adminsCollection, where('email', '==', email));
        const snapshot = await getDocs(q);

        if (!snapshot.empty) {
            const doc = snapshot.docs[0];

            return { id: doc.id, ...(doc.data() as Admin) };
        }

        return null;
    } catch (error) {
        console.error('Error fetching admins:', error);
        throw new Error('Failed to fetch admins.');
    }
});

export async function getAdmin(id: string) {
    try {
        const adminDocRef = doc(adminsCollection, id);
        const adminDoc = await getDoc(adminDocRef);

        if (adminDoc.exists()) {
            return { id: adminDoc.id, ...(adminDoc.data() as Admin) };
        }

        return null;
    } catch (error) {
        console.error('Error fetching admin:', error);
        throw new Error('Failed to fetch admin.');
    }
}

//NEW STUFF HERE

//EO ADMIN STUFF
const eoAdminsCollection = collection(db, 'newEOAdmin');
const schoolAdminsCollections = collection(db, 'newSchoolAdmin');

export async function addEOAdmin(eoAdmin: NewEOAdmin, userId: string) {
    try {
        // Firebase Authentication
        // const { firebaseServerApp } = await getAuthenticatedAppForUser();
        // const auth_db = getFirestore(firebaseServerApp);

        // Add EO Admin to the database
        // const eoAdminsCollection = collection(auth_db, 'newEOAdmin');

        // Add to database
        await setDoc(doc(eoAdminsCollection, userId), eoAdmin);

        // Revalidate data
        revalidatePath('');
    } catch (error) {
        console.error('Error adding EO admin:', error);
        throw new Error('Failed to add EO admin.');
    }
}

//SCHOOL ADMIN STUFF
export async function addSchoolAdmin(
    schoolAdmin: NewSchoolAdmin,
    userId: string
) {
    try {
        // Firebase Authentication
        // const { firebaseServerApp } = await getAuthenticatedAppForUser();
        // const auth_db = getFirestore(firebaseServerApp);

        //ADD SCHOOL ADMIN STUFF
        // const schoolAdminsCollection = collection(auth_db, 'newSchoolAdmin');

        // add to database
        await setDoc(doc(schoolAdminsCollections, userId), schoolAdmin);

        // revalidate data
        revalidatePath('');
    } catch (error) {
        console.error('Error adding admin:', error);
        throw new Error('Failed to add admin.');
    }
}

export async function getSchoolAdmin(id: string) {
    try {
        const schoolAdminDocRef = doc(schoolAdminsCollections, id);
        const schoolAdminDoc = await getDoc(schoolAdminDocRef);

        if (schoolAdminDoc.exists()) {
            return {
                id: schoolAdminDoc.id,
                ...(schoolAdminDoc.data() as NewSchoolAdmin),
            };
        }

        return null;
    } catch (error) {
        console.error('Error fetching school admin:', error);
        throw new Error('Failed to fetch school admin.');
    }
}

export async function getSchoolorEOAdmin(id: string) {
    try {
        // Check in the 'eoadmins' collection
        const EOAdminDocRef = doc(eoAdminsCollection, id);
        const EOAdminDoc = await getDoc(EOAdminDocRef);

        if (EOAdminDoc.exists()) {
            return {
                result: {
                    id: EOAdminDoc.id,
                    ...(EOAdminDoc.data() as NewEOAdmin),
                },
                role: 'eo_admin',
            };
        }

        // Check in the 'newSchoolAdmin' collection
        const schoolAdminDocRef = doc(schoolAdminsCollections, id);
        const schoolAdminDoc = await getDoc(schoolAdminDocRef);

        if (schoolAdminDoc.exists()) {
            return {
                result: {
                    id: schoolAdminDoc.id,
                    ...(schoolAdminDoc.data() as NewSchoolAdmin),
                },
                role: 'school_admin',
            };
        }

        return null;
    } catch (error) {
        console.error('Error fetching admin:', error);
        throw new Error('Failed to fetch admin.');
    }
}
