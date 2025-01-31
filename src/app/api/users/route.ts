import { NextRequest, NextResponse } from 'next/server';
import firebase_app from '@/firebase/config';
import { getFirestore, addDoc, collection } from 'firebase/firestore';

const db = getFirestore(firebase_app);

//POST request for creating an Admin user

export async function POST(request: NextRequest) {
    try {
        const requestData = await request.json();

        const newAdminRef = await addDoc(collection(db, 'admins'), {
            name: {
                first: requestData.name.first,
                last: requestData.name.last,
            },
            email: requestData.email,
            role: requestData.role,
            school_district: requestData.school_district,
        });

        return NextResponse.json({
            message: 'Admin user created successfully',
            userId: newAdminRef.id,
        });
    } catch {
        //error checking to do
    }
}
