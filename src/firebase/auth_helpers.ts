'use server';
import { addStudent } from '@/app/api/students/actions';
import { addAdmin, getAdmin } from '@/app/api/admins/actions';
import { Admin } from '@/types/Admin';
import { NewStudent } from '@/types/newStudent';

export async function handleUserCreation(
    role: string,
    rest: {
        email: string;
        school_name: string;
    },
    uid: string
) {
    if (role === 'Student') {
        const student: NewStudent = {
            student_id: '',
            school_name: rest.school_name,
            profile: {
                unlocked: [],
                cat: '',
                background: '',
                nameplate: '',
            },
            courses_average_score: 0,
            all_courses_completed: false,
            courses: {
                opioidCourse: {
                    courseScore: 0,
                    courseProgress: 0,
                    quizzes: [],
                },
            },
            fish_count: 0,
            certificates: {},
            hasLoggedIn: false,
        };
        await addStudent(student, uid);
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
