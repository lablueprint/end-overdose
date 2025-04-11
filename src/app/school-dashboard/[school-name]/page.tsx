'use client';

import { useParams } from 'next/navigation';
import styles from './Dashboard.module.css';
import { useUserStore } from '@/store/userStore';
import { useEffect, useState } from 'react';

// Server Actions
//NOTE: Im going to hard code the number of courses for now which will be based on an int value which is defined below
//      so later we go in backend and get the number of courses from the database and make it a dynamic value
//NOTE: We also don't have courses in the backend so this is something that to think about for how we want this to be...s

export default function SchoolDashboard() {
    const { user } = useUserStore(); // Current User
    const params = useParams();
    const schoolName = params['school-name'] as string;

    useEffect(() => {}, [schoolName, user]); //SANJAY NOTE: so when schoolName or user changes, this useEffect will run

    return (
        <div>
            <div>
                <h1>School Dashboard</h1>
                schoolName: {schoolName}
            </div>
        </div>
    );
}
