import { getSchoolAdmins } from '../api/admins/actions';
import SchoolAdminsList from './components/SchoolAdminList';

// server component that displays the list of school admins
export default async function SchoolAdmins() {
    const adminsBySchool = await getSchoolAdmins();

    console.log(adminsBySchool);

    // Client Component that displays the list of school admins
    return <SchoolAdminsList admins={adminsBySchool} />;
}
