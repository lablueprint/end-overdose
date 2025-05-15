import { NextRequest, NextResponse } from 'next/server';
import { createNewSchool } from '@/app/api/schools/actions';

export async function GET(req: NextRequest) {
    const result = await createNewSchool('Fionas Superior High School');
    return NextResponse.json(result);
}
