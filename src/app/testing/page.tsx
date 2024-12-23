import { getStudents } from '../api/students/actions';
import { deleteAdmin, getAdmins } from '../api/admins/actions';
import { Admin } from '@/types/Admin';
import { Student } from '@/types/Student';
import { AddAdminForm } from '@/app/testing/components/AddAdminForm';
import { GenericButton } from '@/components/Button';

// server component that fetches all students and admin from firebase
// includes client components AddAdminForm & Button to add a new admin
export default async function Testing() {
    const [students, admins] = await Promise.all([getStudents(), getAdmins()]);

    return (
        <div>
            <h1 className="text-blue-800 font-bold text-2xl">
                List of student IDs:
            </h1>
            <div className="grid grid-cols-10 gap-2 mb-10">
                {students.map((student: Student) => (
                    <div key={student.student_id}>{student.student_id}</div>
                ))}
            </div>
            <h1 className="text-blue-800 font-bold text-2xl">
                List of admin names:
            </h1>
            {admins.map((admin: Admin) => (
                <li key={admin.email}>
                    {admin.email}
                    <GenericButton
                        title="Delete Admin"
                        actionArgs={admin.email}
                        handleAction={deleteAdmin}
                        style="border-2 rounded-md p-1"
                        loadingText="Deleting..."
                    />
                </li>
            ))}
            <AddAdminForm />
        </div>
    );
}
