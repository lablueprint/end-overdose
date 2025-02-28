'use client';

import { useState } from 'react';
import { Admin } from '@/types/Admin';
import Switch from '@mui/material/Switch';
import { updateAdminApproval } from '@/app/api/admins/actions';

// Component that displays the list of school admins with a toggle next to each to change their approval status
// admins is a dictionary where the key is school names, and the value is a dictionary of admin emails to admin objects

export default function SchoolAdminsList({
    admins,
}: {
    admins: Record<string, Record<string, Admin>>;
}) {
    const [adminsBySchool, setAdminsBySchool] = useState(admins);

    // Changes the approval status in Firebase and local state, triggered by the Switch component
    const handleToggleApproval = async (
        adminEmail: string,
        newApproval: boolean,
        school: string
    ) => {
        // Update the approval status in Firebase
        const result = await updateAdminApproval(adminEmail, newApproval);

        // Update the local state
        setAdminsBySchool(
            (prevAdminsBySchool: Record<string, Record<string, Admin>>) => {
                const updatedAdmins = { ...prevAdminsBySchool };
                updatedAdmins[school] = {
                    ...updatedAdmins[school],
                    [adminEmail]: {
                        ...updatedAdmins[school][adminEmail],
                        approved: newApproval,
                    },
                };
                return updatedAdmins;
            }
        );
    };

    return (
        <div>
            <h1 className="text-blue-800 font-bold text-2xl">
                List of School Admins:
            </h1>
            <br />
            <h1>
                {Object.entries(adminsBySchool).map(([school, admins]) => (
                    <div key={school}>
                        <h2>{school}</h2>
                        {Object.entries(admins as Record<string, Admin>).map(
                            ([email, admin]) => (
                                <div key={admin.email}>
                                    {'Name: '}
                                    {admin.name.first} {admin.name.last}
                                    {' Email: '}
                                    {admin.email}
                                    {' Approved? '}
                                    {admin.approved ? 'Yes' : 'No'}{' '}
                                    <Switch
                                        checked={admin.approved}
                                        onChange={() =>
                                            handleToggleApproval(
                                                admin.email,
                                                !admin.approved,
                                                school
                                            )
                                        }
                                    />
                                </div>
                            )
                        )}
                        <br />
                    </div>
                ))}
            </h1>
        </div>
    );
}
