'use client';

import { useState } from 'react';
import { Admin } from '@/types/Admin';
import Switch from '@mui/material/Switch';
import { updateAdminApproval } from '@/app/api/admins/actions';

export default function SchoolAdminsList({ admins }) {
    const [adminsBySchool, setAdminsBySchool] = useState(admins);

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
                                        onChange={() => {
                                            // Update the approval status in Firebase
                                            updateAdminApproval(
                                                admin.email,
                                                !admin.approved
                                            );
                                            // Update the local state
                                            setAdminsBySchool({
                                                ...adminsBySchool,
                                                [school]: {
                                                    ...admins,
                                                    [email]: {
                                                        ...admin,
                                                        approved:
                                                            !admin.approved,
                                                    },
                                                },
                                            });
                                            console.log('Switched');
                                        }}
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
