import { NextRequest, NextResponse } from 'next/server';
import { createNewSchool } from '@/app/api/schools/actions';

export async function GET(req: NextRequest) {
    const schoolName = 'Test General School';
    const result = await createNewSchool(schoolName);
    return NextResponse.json(result);
}
