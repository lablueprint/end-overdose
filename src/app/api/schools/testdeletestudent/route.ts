import { NextRequest, NextResponse } from 'next/server';
import { deleteStudentFromSchool } from '@/app/api/schools/actions';

export async function GET(req: NextRequest) {
    // Example values to test with
    const schoolId = 'rlRUhLjBrmDMfybLX1RZ'; // from your screenshot
    const studentId = '0000'; // one of the IDs in your school's student_ids

    const result = await deleteStudentFromSchool(schoolId, studentId);
    return NextResponse.json(result);
}
