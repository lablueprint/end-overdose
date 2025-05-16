'use client';
import { useState, useEffect } from 'react';
import styles from './Dashboard.module.css';
import {
    getAdmins,
    updateAdminApproval,
    deleteAdmin,
} from '../api/admins/actions';
import { NewSchoolAdmin } from '@/types/newSchoolAdmin';
import { getSchoolDataByID } from '../api/schools/actions';

type SchoolAdminWithId = NewSchoolAdmin & { id: string };

export default function AdminPage() {
    const [admins, setAdmins] = useState<SchoolAdminWithId[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [schoolNames, setSchoolNames] = useState<{ [id: string]: string }>(
        {}
    );

    //fetch all newSchoolAdmin entries on mount
    useEffect(() => {
        async function fetchAdmins() {
            setLoading(true);
            setError(null);
            try {
                const data = await getAdmins();
                setAdmins(data as SchoolAdminWithId[]);
            } catch {
                setError('Failed to load admins. Please try again later.');
            }
            setLoading(false);
        }
        fetchAdmins();
    }, []);

    //fetch school names for each admin on mount
    useEffect(() => {
        if (admins.length === 0) return;

        //get unique school_ids
        const uniqueIds = Array.from(new Set(admins.map((a) => a.school_id)));

        //only fetch names for ids we don't already have
        const idsToFetch = uniqueIds.filter((id) => !schoolNames[id]);

        if (idsToFetch.length === 0) return;

        const fetchNames = async () => {
            const newNames: { [id: string]: string } = {};
            for (const id of idsToFetch) {
                try {
                    const school = await getSchoolDataByID(id);
                    newNames[id] = school?.school_name || id;
                } catch {
                    newNames[id] = id; //fallback to id if error
                }
            }
            setSchoolNames((prev) => ({ ...prev, ...newNames }));
        };

        fetchNames();
    }, [admins]);

    //split admins into pending and approved
    const pendingAdmins = admins.filter((a) => !a.approved);
    const approvedAdmins = admins.filter((a) => a.approved);

    //approve admin
    const handleApprove = async (email: string) => {
        await updateAdminApproval(email, true);
        setAdmins((prev) =>
            prev.map((a) => (a.email === email ? { ...a, approved: true } : a))
        );
    };

    //Deny or Delete admin
    const handleDelete = async (email: string) => {
        await deleteAdmin(email);
        setAdmins((prev) => prev.filter((a) => a.email !== email));
    };

    return (
        <div className={styles.container}>
            <div className={styles.scrollArea}>
                {error && (
                    <div style={{ color: 'red', marginBottom: 16 }}>
                        {error}
                    </div>
                )}
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    <>
                        {/* Pending School Request Section */}
                        {pendingAdmins.length > 0 && (
                            <div style={{ marginBottom: 40 }}>
                                <h2 className={styles.subTitle}>
                                    PENDING SCHOOL REQUEST
                                </h2>
                                <p className={styles.description}>
                                    Review the list of pending schools and
                                    decide whether to approve or deny each one
                                    based on the submitted details. Use the
                                    action buttons provided to manage which
                                    schools are added to the database.
                                </p>
                                <table className={styles.table}>
                                    <thead>
                                        <tr>
                                            <th> </th>
                                            <th>School Name</th>
                                            <th>Email</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {pendingAdmins.map((admin, idx) => (
                                            <tr key={admin.email}>
                                                <td>{idx + 1}</td>
                                                <td>
                                                    {schoolNames[
                                                        admin.school_id
                                                    ] || admin.school_id}
                                                </td>
                                                <td>{admin.email}</td>
                                                <td>
                                                    <button
                                                        className={
                                                            styles.buttonApprove
                                                        }
                                                        onClick={() =>
                                                            handleApprove(
                                                                admin.email
                                                            )
                                                        }
                                                    >
                                                        APPROVE
                                                    </button>
                                                    <button
                                                        className={
                                                            styles.buttonDeny
                                                        }
                                                        onClick={() =>
                                                            handleDelete(
                                                                admin.email
                                                            )
                                                        }
                                                    >
                                                        DENY
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}

                        {/* Approved Schools Section */}
                        <div>
                            <h2 className={styles.subTitle}>SCHOOLS</h2>
                            <p className={styles.description}>
                                This table lists each school currently in the
                                database, along with its name and the point of
                                contact&apos;s email address. It also includes a
                                delete option, allowing administrators to remove
                                schools as needed for accurate and up-to-date
                                record keeping.
                            </p>
                            <table className={styles.table}>
                                <thead>
                                    <tr>
                                        <th> </th>
                                        <th>School Name</th>
                                        <th>Email</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {approvedAdmins.map((admin, idx) => (
                                        <tr key={admin.email}>
                                            <td>{idx + 1}</td>
                                            <td>
                                                {schoolNames[admin.school_id] ||
                                                    admin.school_id}
                                            </td>
                                            <td>{admin.email}</td>
                                            <td>
                                                <button
                                                    className={
                                                        styles.buttonDelete
                                                    }
                                                    onClick={() =>
                                                        handleDelete(
                                                            admin.email
                                                        )
                                                    }
                                                >
                                                    DELETE
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
