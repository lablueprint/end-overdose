import { NextRequest, NextResponse } from 'next/server';
import firebase_app from '@/firebase/config';
import { getFirestore, addDoc, collection } from 'firebase/firestore';

const db = getFirestore(firebase_app);

export async function POST(request: NextRequest) {
    console.log('HERE');
    try {
        const requestData = await request.json();
        console.log('Request Data:', requestData); // Log request data for debugging

        const newStudentRef = await addDoc(collection(db, 'students'), {
            student_id: requestData.student_id,
            name: {
                first: requestData.name.first,
                last: requestData.name.last,
            },
            school_name: requestData.school_name,
            badges: [],
            course_completion: {},
        });

        console.log('Document written with ID:', newStudentRef.id);

        // Return success response
        return NextResponse.json({
            message: 'Student user created successfully',
            userId: newStudentRef.id,
        });
    } catch (error) {
        console.error('Error creating document:', error);

        // Ensure a proper response is returned in case of an error
        return NextResponse.json(
            {
                message: 'Failed to create student user',
                error: error.message || 'Unknown error',
            },
            { status: 500 }
        );
    }
}
