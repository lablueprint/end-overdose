'use client';
import { useState, useEffect } from 'react';
import {
    getAdmins,
    updateAdminApproval,
    deleteAdmin,
} from '../api/admins/actions';
import { NewSchoolAdmin } from '@/types/newSchoolAdmin';
import { ArrowUpDown } from 'lucide-react';
import { getSchoolDataByID } from '../api/schools/actions';

type SchoolAdminWithId = NewSchoolAdmin & { id: string };
type SortDirection = 'asc' | 'desc' | null;

export default function AdminPage() {
    const [admins, setAdmins] = useState<SchoolAdminWithId[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [schoolNames, setSchoolNames] = useState<{ [id: string]: string }>(
        {}
    );
    const [pendingSortDirection, setPendingSortDirection] =
        useState<SortDirection>(null);
    const [approvedSortDirection, setApprovedSortDirection] =
        useState<SortDirection>(null);

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
    }, [admins, schoolNames]);

    //split admins into pending and approved
    const pendingAdmins = admins.filter((a) => !a.approved);
    const approvedAdmins = admins.filter((a) => a.approved);

    // sort pending admins by school name
    const sortedPendingAdmins = [...pendingAdmins].sort((a, b) => {
        if (!pendingSortDirection) return 0;

        const schoolNameA = schoolNames[a.school_id] || a.school_id;
        const schoolNameB = schoolNames[b.school_id] || b.school_id;

        if (pendingSortDirection === 'asc') {
            return schoolNameA.localeCompare(schoolNameB);
        } else {
            return schoolNameB.localeCompare(schoolNameA);
        }
    });

    // sort approved admins by school name
    const sortedApprovedAdmins = [...approvedAdmins].sort((a, b) => {
        if (!approvedSortDirection) return 0;

        const schoolNameA = schoolNames[a.school_id] || a.school_id;
        const schoolNameB = schoolNames[b.school_id] || b.school_id;

        if (approvedSortDirection === 'asc') {
            return schoolNameA.localeCompare(schoolNameB);
        } else {
            return schoolNameB.localeCompare(schoolNameA);
        }
    });

    // toggle sort direction for pending admins
    const togglePendingSort = () => {
        setPendingSortDirection((prev) => {
            if (prev === null) return 'asc';
            if (prev === 'asc') return 'desc';
            return null;
        });
    };

    // toggle sort direction for approved admins
    const toggleApprovedSort = () => {
        setApprovedSortDirection((prev) => {
            if (prev === null) return 'asc';
            if (prev === 'asc') return 'desc';
            return null;
        });
    };

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
        <div className="h-full max-h-screen overflow-auto pb-8 px-8">
            <div className="container mx-auto">
                <div className="mt-8">
                    {error && (
                        <div className="text-red-500 mb-4 p-4 bg-red-50 rounded-lg">
                            {error}
                        </div>
                    )}

                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="text-gray-500">Loading...</div>
                        </div>
                    ) : (
                        <>
                            {/* Pending School Request Section */}
                            {pendingAdmins.length > 0 && (
                                <div className="mb-12">
                                    <h2 className="text-2xl font-bold mb-2">
                                        PENDING SCHOOL REQUEST
                                    </h2>
                                    <p className="text-[#343A3A] mb-6">
                                        Review the list of pending schools and
                                        decide whether to approve or deny each
                                        one based on the submitted details. Use
                                        the action buttons provided to manage
                                        which schools are added to the database.
                                    </p>

                                    <div className="overflow-hidden rounded-lg">
                                        {/* Header */}
                                        <div className="grid grid-cols-12 bg-gray-100 py-4 px-6">
                                            <div className="col-span-1"></div>
                                            <div className="col-span-4 flex items-center">
                                                <button
                                                    className="flex items-center text-left font-medium text-gray-900"
                                                    onClick={togglePendingSort}
                                                >
                                                    School Name{' '}
                                                    <ArrowUpDown className="ml-2 h-4 w-4" />
                                                </button>
                                            </div>
                                            <div className="col-span-4 text-left font-medium text-gray-900">
                                                Email
                                            </div>
                                            <div className="col-span-3"></div>
                                        </div>

                                        {/* Rows */}
                                        {sortedPendingAdmins.map(
                                            (admin, idx) => (
                                                <div
                                                    key={admin.email}
                                                    className="grid grid-cols-12 border-b py-4 px-6"
                                                >
                                                    <div className="col-span-1 flex items-center text-gray-500">
                                                        {idx + 1}
                                                    </div>
                                                    <div className="col-span-4 flex items-center">
                                                        {schoolNames[
                                                            admin.school_id
                                                        ] || admin.school_id}
                                                    </div>
                                                    <div className="col-span-4 flex items-center">
                                                        {admin.email}
                                                    </div>
                                                    <div className="col-span-3 flex justify-end gap-2">
                                                        <button
                                                            className="bg-[#02B56B] hover:bg-green-600 text-white font-medium py-1.5 px-6 rounded"
                                                            onClick={() =>
                                                                handleApprove(
                                                                    admin.email
                                                                )
                                                            }
                                                        >
                                                            APPROVE
                                                        </button>
                                                        <button
                                                            className="bg-[#C01A18] hover:bg-red-600 text-white font-medium py-1.5 px-6 rounded"
                                                            onClick={() =>
                                                                handleDelete(
                                                                    admin.email
                                                                )
                                                            }
                                                        >
                                                            DENY
                                                        </button>
                                                    </div>
                                                </div>
                                            )
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Approved Schools Section */}
                            <div className="mb-8">
                                <h2 className="text-2xl font-bold mb-2">
                                    SCHOOLS
                                </h2>
                                <p className="text-[#343A3A mb-6">
                                    This table lists each school currently in
                                    the database, along with its name and the
                                    point of contact&apos;s email address. It
                                    also includes a delete option, allowing
                                    administrators to remove schools as needed
                                    for accurate and up-to-date record keeping.
                                </p>

                                <div className="overflow-hidden rounded-lg">
                                    {/* Header */}
                                    <div className="grid grid-cols-12 bg-gray-100 py-4 px-6">
                                        <div className="col-span-1"></div>
                                        <div className="col-span-4 flex items-center">
                                            <button
                                                className="flex items-center text-left font-medium text-gray-900"
                                                onClick={toggleApprovedSort}
                                            >
                                                School Name{' '}
                                                <ArrowUpDown className="ml-2 h-4 w-4" />
                                            </button>
                                        </div>
                                        <div className="col-span-4 text-left font-medium text-gray-900">
                                            Email
                                        </div>
                                        <div className="col-span-3"></div>
                                    </div>

                                    {/* Rows */}
                                    {sortedApprovedAdmins.map((admin, idx) => (
                                        <div
                                            key={admin.email}
                                            className="grid grid-cols-12 border-b py-4 px-6"
                                        >
                                            <div className="col-span-1 flex items-center text-gray-500">
                                                {idx + 1}
                                            </div>
                                            <div className="col-span-4 flex items-center">
                                                {schoolNames[admin.school_id] ||
                                                    admin.school_id}
                                            </div>
                                            <div className="col-span-4 flex items-center">
                                                {admin.email}
                                            </div>
                                            <div className="col-span-3 flex justify-end">
                                                <button
                                                    className="bg-black hover:bg-gray-800 text-white font-medium py-1.5 px-6 rounded"
                                                    onClick={() =>
                                                        handleDelete(
                                                            admin.email
                                                        )
                                                    }
                                                >
                                                    DELETE
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
