import { NextRequest, NextResponse } from 'next/server';
import firebase_app from '@/firebase/config';
import { getFirestore, addDoc, collection } from 'firebase/firestore';

const db = getFirestore(firebase_app);

export async function POST(request: NextRequest) {
    console.log('Processing student creation request');
    try {
        const requestData = await request.json();
        console.log('Request Data:', requestData); // Log request data for debugging

        const studentJSON = {
            student_id: requestData.student_id,
            email: requestData.email || null,
            school_name: requestData.school_name,
            nameplate: requestData.nameplate,
            kibble_count: requestData.kibble_count || 0,
            course_completion: {
                opioidCourse: {
                    courseScore: 0,
                    courseProgress: 0,
                },
                careerCourse: {
                    courseScore: 0,
                    courseProgress: 0,
                },
            },
            quizzes: [],
            badges: [],
        };

        // Apply any provided data from the request
        if (requestData.course_completion) {
            studentJSON.course_completion = requestData.course_completion;
        }

        if (requestData.quizzes) {
            studentJSON.quizzes = requestData.quizzes;
        }

        if (requestData.badges) {
            studentJSON.badges = requestData.badges;
        }

        const newStudentRef = await addDoc(
            collection(db, 'students'),
            studentJSON
        );

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
