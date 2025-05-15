// app/api/schools/testschool/route.ts
import { NextResponse } from 'next/server';
import { createStudentAndAddToSchool } from '@/app/api/schools/actions';

export async function GET() {
    const result = await createStudentAndAddToSchool(
        '0001',
        'ZGjLRB9FfQV2shsYHQav'
    );

    return NextResponse.json(result);
}
