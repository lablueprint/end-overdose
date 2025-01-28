import { NextRequest, NextResponse } from 'next/server';
import firebase_app from '@/firebase/config';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

const db = getFirestore(firebase_app);

// an API route to create a new admin user
export async function POST(request: NextRequest) {
    console.log('HERE');
    try {
        const requestData = await request.json();
        console.log('Request Data:', requestData); // Log request data for debugging

        const newAdminRef = await addDoc(collection(db, 'admins'), {
            name: {
                first: requestData.name.first,
                last: requestData.name.last,
            },
            email: requestData.email,
            role: requestData.role,
            school_name: requestData.school_name,
        });

        console.log('Document written with ID:', newAdminRef.id);

        // Return success response
        return NextResponse.json({
            message: 'Admin user created successfully',
            userId: newAdminRef.id,
        });
    } catch (error) {
        console.error('Error creating document:', error);

        // Ensure a proper response is returned in case of an error
        return NextResponse.json(
            {
                message: 'Failed to create admin user',
                error: error.message || 'Unknown error',
            },
            { status: 500 }
        );
    }
}
