import { NextRequest, NextResponse } from 'next/server';
import firebase_app from '@/firebase/config';
import {
    getFirestore,
    addDoc,
    collection,
    getDocs,
    doc,
    getDoc,
} from 'firebase/firestore';

const db = getFirestore(firebase_app);

// GET all schools
export async function GET() {
    console.log('Processing get all schools request');
    try {
        // Get all documents from the schools collection
        const schoolsSnapshot = await getDocs(collection(db, 'schools'));

        // Map the documents to include their IDs
        const schools = schoolsSnapshot.docs.map((doc) => ({
            _id: doc.id,
            ...doc.data(),
        }));

        console.log(`Retrieved ${schools.length} schools`);

        // Return the schools as JSON
        return NextResponse.json(schools);
    } catch (error) {
        console.error('Error fetching schools:', error);

        // Return error response
        return NextResponse.json(
            {
                message: 'Failed to fetch schools',
                error: error.message || 'Unknown error',
            },
            { status: 500 }
        );
    }
}

// POST a new school
export async function POST(request: NextRequest) {
    console.log('Processing school creation request');
    try {
        const requestData = await request.json();
        console.log('Request Data:', requestData); // Log request data for debugging

        // Validate required fields
        if (!requestData.school_id || !requestData.school_name) {
            return NextResponse.json(
                {
                    message: 'School ID and school name are required',
                },
                { status: 400 }
            );
        }

        // Create the new document in Firestore
        const newSchoolRef = await addDoc(
            collection(db, 'newSchools'),
            requestData
        );

        console.log('School document written with ID:', newSchoolRef.id);

        // Return success response
        return NextResponse.json({
            message: 'School created successfully',
            schoolId: newSchoolRef.id,
        });
    } catch (error) {
        console.error('Error creating school document:', error);

        // Ensure a proper response is returned in case of an error
        return NextResponse.json(
            {
                message: 'Failed to create school',
                error: error.message || 'Unknown error',
            },
            { status: 500 }
        );
    }
}
