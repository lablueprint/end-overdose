import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    onAuthStateChanged as _onAuthStateChanged,
    NextOrObserver,
    User,
    deleteUser,
} from 'firebase/auth';
import { auth } from './clientApp';
import { addAdmin } from '@/app/api/admins/actions';
import { addStudent } from '@/app/api/students/actions';
import { Admin } from '@/types/Admin';
import { Student } from '@/types/Student';
import { getAdminFromEmail } from '@/app/api/admins/actions';
import { getStudent } from '@/app/api/students/actions';

export async function onAuthStateChanged(cb: NextOrObserver<User>) {
    return _onAuthStateChanged(auth, cb);
}

// this logs out the user
export async function logout(): Promise<{ error: string | null }> {
    try {
        console.log('Logging out');
        await auth.signOut();
        return { error: null };
    } catch (error) {
        return { error: (error as Error).message };
    }
}

// signs in an EO or school admin
type SignInResult = { id: string; admin: Admin };
export async function signInAdmin(
    email: string,
    password: string
): Promise<{ result: SignInResult | null; error: string | null }> {
    try {
        // sign in through firebase auth
        const result = await signInWithEmailAndPassword(auth, email, password);
        if (!result.user.email) {
            throw new Error('User email is null.');
        }
        // get the admin from firebase admins collection
        const adminDoc = await getAdminFromEmail(result.user.email);
        if (!adminDoc) {
            return {
                result: null,
                error: 'Unable to find admin with that email.',
            };
        }
        // check if admin is approved
        if (!adminDoc.approved) {
            return {
                result: null,
                error: 'Admin not approved yet.',
            };
        }
        return {
            result: { id: adminDoc.id, admin: adminDoc },
            error: null,
        };
    } catch (error) {
        console.log(error);
        return {
            result: null,
            error: (error as Error).message,
        };
    }
}

// this creates a new auth user and adds a new admin to the database, as an atomic action
type SignUpResult = { userId: string; email: string | null };
export async function signUp(data: {
    name: { first: string; last: string };
    role: string;
    email: string;
    password: string;
    school_name: string;
}): Promise<{ result: SignUpResult | null; error: string | null }> {
    let authUser = null;
    try {
        const { password, ...rest } = data;
        const result = await createUserWithEmailAndPassword(
            auth,
            rest.email,
            password
        );
        authUser = result.user;
        // add new admin to firebase admins collection
        if ()
        try {
            const newAdmin: Admin = {
                ...rest,
                approved: false,
                name: {
                    first: rest.name.first,
                    last: rest.name.last,
                },
            };
            await addAdmin(newAdmin, result.user.uid);
        } catch (adminError) {
            // if adding to admins collection fails, delete the auth user
            if (result.user) {
                await deleteUser(result.user);
            }
            throw adminError;
        }
        const serializedResult: SignUpResult = {
            userId: result.user.uid,
            email: result.user.email,
        };
        return { result: serializedResult, error: null };
    } catch (error) {
        if (authUser) {
            try {
                await deleteUser(authUser);
            } catch (deleteError) {
                console.error('Error cleaning up auth user:', deleteError);
            }
        }
        return {
            result: null,
            error: (error as Error).message,
        };
    }
}

type StudentSignInResult = { id: string; student: Student };
export async function signinStudent(
    email: string,
    password: string
): Promise<{ result: StudentSignInResult | null; error: string | null }> {
    try {
        // sign in through firebase auth
        const result = await signInWithEmailAndPassword(auth, email, password);
        if (!result.user.email) {
            throw new Error('User email is null.');
        }
        // get the student from firebase students collection
        const studentDoc = await getStudent(result.user.uid);
        if (!studentDoc) {
            return {
                result: null,
                error: 'Unable to find admin with that email.',
            };
        }
        return {
            result: { id: studentDoc.id, student: studentDoc },
            error: null,
        };
    } catch (error) {
        console.log(error);
        return {
            result: null,
            error: (error as Error).message,
        };
    }
}

// this creates a new auth user and adds a new student to the database, as an atomic action
export async function signupStudent(
    newStudent: Student,
    password: string
): Promise<{ result: SignUpResult | null; error: string | null }> {
    let authUser = null;
    try {
        const result = await createUserWithEmailAndPassword(
            auth,
            newStudent.email,
            password
        );
        authUser = result.user;
        // add new admin to firebase students collection
        try {
            await addStudent(newStudent, result.user.uid);
        } catch (error) {
            // if adding to student collection fails, delete the auth user
            if (result.user) {
                await deleteUser(result.user);
            }
            throw error;
        }
        const serializedResult: SignUpResult = {
            userId: result.user.uid,
            email: result.user.email,
        };
        return { result: serializedResult, error: null };
    } catch (error) {
        if (authUser) {
            try {
                await deleteUser(authUser);
            } catch (deleteError) {
                console.error('Error cleaning up auth user:', deleteError);
            }
        }
        return {
            result: null,
            error: (error as Error).message,
        };
    }
}

// signs in a student
// type SignInResultStudent = { student: Student & { id: string } };
// export async function signInStudent(
//     schoolName: string,
//     studentID: string,
//     optionalPassword: string = ''
// ): Promise<{
//     result: SignInResultStudent | null;
//     error: string | null;
// }> {
//     try {
//         //Check if ID and optionalPassword are inside map of selected school
//         const { success } = await validateUserCredentials(
//             schoolName,
//             studentID,
//             optionalPassword
//         );
//         if (!success) {
//             return {
//                 result: null,
//                 error: 'Wrong student ID or password.',
//             };
//         }
//         // Sign in with firebase using a temporary email and password
//         const temp_user_hash = btoa(studentID + '-' + schoolName);
//         const tempEmail = temp_user_hash + '@eo-placeholder.com';
//         // console.log('tempEmail:', tempEmail);
//         const tempPassword =
//             optionalPassword.length < 6 ? 'placeholder' : optionalPassword;

//         let uid = '';
//         signInWithEmailAndPassword(auth, tempEmail, tempPassword)
//             .then(async (result) => {
//                 uid = result.user.uid;
//             })
//             .catch(async () => {
//                 const signUpResult = await createUserWithEmailAndPassword(
//                     auth,
//                     tempEmail,
//                     tempPassword
//                 );
//                 uid = signUpResult.user.uid;
//                 // create a new student in the firebase students collection
//                 const newStudent: Student = {
//                     student_id: studentID,
//                     school_name: schoolName,
//                     quizzes: [],
//                     nameplate: '',
//                     course_completion: {
//                         opioidCourse: { courseProgress: 0, lessonProgress: 0 },
//                         careerCourse: { courseProgress: 0, lessonProgress: 0 },
//                     },
//                     badges: [],
//                 };
//                 await addStudent(newStudent, uid);
//             });
//         // Get student from firebase students collection
//         const studentDoc = await getStudentFromStudentID(studentID);
//         if (!studentDoc) {
//             return {
//                 result: null,
//                 error: 'Unable to find student.',
//             };
//         }
//         return {
//             result: { student: studentDoc },
//             error: null,
//         };
//     } catch (error) {
//         console.log(error);
//         return {
//             result: null,
//             error: (error as Error).message,
//         };
//     }
// }
