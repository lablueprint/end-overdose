'use server';
import { addStudent, getStudent } from '@/app/api/students/actions';
import { addAdmin, getAdmin } from '@/app/api/admins/actions';
import { Student } from '@/types/Student';
import { Admin } from '@/types/Admin';

export async function handleUserCreation(
    role: string,
    rest: {
        email: string;
        school_name: string;
    },
    uid: string
) {
    if (role === 'Student') {
        const newStudent: Student = {
            ...rest,
            student_id: '',
            quizzes: [],
            nameplate: '',
            badges: [],
            fish_count: 0,
            course_completion: {
                opioidCourse: { courseScore: 0, courseProgress: 0 },
                careerCourse: { courseScore: 0, courseProgress: 0 },
            },
        };
        await addStudent(newStudent, uid);
    } else {
        const newAdmin: Admin = {
            ...rest,
            approved: false,
            name: {
                first: '',
                last: '',
            },
            role: role === 'EO Admin' ? 'eo_admin' : 'school_admin',
        };
        await addAdmin(newAdmin, uid);
    }
}

export async function getUserInfo(role: string, uid: string) {
    if (role === 'Student') {
        const studentDoc = await getStudent(uid);
        if (!studentDoc) {
            throw new Error('Student not found');
        }
        return { docId: studentDoc.id, user: studentDoc as Student };
    } else {
        const adminDoc = await getAdmin(uid);
        if (!adminDoc) {
            throw new Error('Admin not found');
        }
        if (!adminDoc.approved) {
            return {
                result: null,
                error: 'Admin not approved yet.',
            };
        }
        return { docId: adminDoc.id, user: adminDoc as Admin };
    }
}
