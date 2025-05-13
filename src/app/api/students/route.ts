import { NextRequest, NextResponse } from 'next/server';
import firebase_app from '@/firebase/config';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const db = getFirestore(firebase_app);

export async function GET() {
    console.log('Processing get all students request');
    try {
        // Get all documents from the newStudents collection
        const studentsSnapshot = await getDocs(collection(db, 'newStudents'));

        // Map the documents to include their IDs
        const students = studentsSnapshot.docs.map((doc) => ({
            _id: doc.id,
            ...doc.data(),
        }));

        console.log(`Retrieved ${students.length} students`);

        // Return the students as JSON
        return NextResponse.json(students);
    } catch (error) {
        console.error('Error fetching students:', error);

        // Return error response
        return NextResponse.json(
            {
                message: 'Failed to fetch students',
                error: error.message || 'Unknown error',
            },
            { status: 500 }
        );
    }
}

// Keep your existing POST handler
export async function POST(request: NextRequest) {
    console.log('Processing student creation request');
    try {
        const requestData = await request.json();
        console.log('Request Data:', requestData); // Log request data for debugging

        // Initialize the student object with the new schema structure
        const studentJSON = {
            student_id: requestData.student_id,
            school_name: requestData.school_name,
            profile: {
                unlocked: requestData.profile?.unlocked || ['narcat'], // Default to narcat if not provided
                cat: requestData.profile?.cat || 'narcat',
                background: requestData.profile?.background || 'narcat',
                nameplate: requestData.profile?.nameplate || 'New User',
            },
            courses_average_score: requestData.courses_average_score || 0,
            all_courses_completed: requestData.all_courses_completed || false,
            courses: {
                opioidCourse: {
                    courseProgress: 0,
                    courseScore: 0,
                    quizzes: [],
                },
            },
            fish_count: requestData.fish_count || 0,
            certificates: requestData.certificates || {},
            hasLoggedIn: requestData.hasLoggedIn || false,
        };

        // Apply more specific course completion data if provided
        if (requestData.courses?.opioidCourse) {
            studentJSON.courses.opioidCourse = requestData.courses.opioidCourse;
        }

        if (requestData.courses_completion?.opioidCourse?.quizzes) {
            studentJSON.courses.opioidCourse.quizzes =
                requestData.courses.opioidCourse.quizzes;
        }

        // Create the new document in Firestore
        const newStudentRef = await addDoc(
            collection(db, 'newStudents'), // Changed to 'newStudents' collection
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
