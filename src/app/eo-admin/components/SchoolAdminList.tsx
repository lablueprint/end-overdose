'use client';

import { useState } from 'react';
import { Admin } from '@/types/Admin';
import Switch from '@mui/material/Switch';

export default function SchoolAdminsList({ admins }) {
    const [adminsBySchool, setAdminsBySchool] = useState(admins);

    return (
        <div>
            <h1 className="text-blue-800 font-bold text-2xl">
                List of School Admins:
            </h1>
            <br />
            <h1>
                {Object.entries(adminsBySchool).map(([school, users]) => (
                    <div key={school}>
                        <h2>{school}</h2>
                        {users.map((user: Admin) => (
                            <div key={user.email}>
                                {'Name: '}
                                {user.name.first} {user.name.last}
                                {' Email: '}
                                {user.email}
                                {' Approved? '}
                                {user.approved ? 'Yes' : 'No'}{' '}
                                <Switch
                                    checked={user.approved}
                                    onChange={() => {
                                        user.approved = !user.approved;
                                        // TODO: function to update approval status
                                        console.log('Switched');
                                    }}
                                />
                            </div>
                        ))}
                        <br />
                    </div>
                ))}
            </h1>
        </div>
    );
}
