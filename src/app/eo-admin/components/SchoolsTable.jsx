'use client';
import { useRouter } from 'next/navigation';
import { ArrowUpDown } from 'lucide-react';
import { useState } from 'react';

export default function SchoolsTable({ schools }) {
    const router = useRouter();
    const [sortField, setSortField] = useState(null);
    const [sortDirection, setSortDirection] = useState('asc');

    // Handle sorting
    const handleSort = (field) => {
        if (sortField === field) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('asc');
        }
    };

    // Sort schools based on current sort field and direction
    const sortedSchools = [...schools].sort((a, b) => {
        if (!sortField) return 0;

        const aValue = a[sortField];
        const bValue = b[sortField];

        if (sortDirection === 'asc') {
            return aValue > bValue ? 1 : -1;
        } else {
            return aValue < bValue ? 1 : -1;
        }
    });

    return (
        <div className="w-full overflow-hidden rounded-lg">
            {/* Table Header */}
            <div className="grid grid-cols-12 bg-gray-100 py-4 px-6">
                <div className="col-span-4 flex items-center">
                    <button
                        className="flex items-center text-left font-medium text-gray-900"
                        onClick={() => handleSort('school_name')}
                    >
                        School <ArrowUpDown className="ml-2 h-4 w-4" />
                    </button>
                </div>
                <div className="col-span-3 text-left font-medium text-gray-900">
                    Email
                </div>
                <div className="col-span-2 text-left font-medium text-gray-900">
                    Students #
                </div>
                <div className="col-span-2 text-left font-medium text-gray-900">
                    Courses
                </div>
                <div className="col-span-1"></div>
            </div>

            {/* Table Body */}
            {sortedSchools.map((school, index) => {
                return (
                    <div
                        key={school.school_id}
                        className="grid grid-cols-12 border-b py-3 px-6"
                    >
                        <div className="col-span-4 flex self-center">
                            <span className="text-gray-500 mr-2">
                                {index + 1}
                            </span>
                            <div className="flex flex-col">
                                <span>{school.school_name}</span>
                            </div>
                        </div>
                        <div className="col-span-3 self-center">
                            {school.school_email}
                        </div>
                        <div className="col-span-2 self-center">
                            {school.student_count}
                        </div>
                        <div className="col-span-2 self-center">
                            {school.courseCount || 0}
                        </div>
                        <div className="col-span-1 flex justify-end self-center">
                            <button
                                className="rounded bg-black px-4 py-1.5 font-medium uppercase text-white hover:bg-gray-800"
                                onClick={() =>
                                    router.push(`eo-admin/${school.school_id}`)
                                }
                            >
                                VIEW
                            </button>
                        </div>
                    </div>
                );
            })}

            {/* Empty state */}
            {schools.length === 0 && (
                <div className="p-6 text-center text-gray-500">
                    No schools found
                </div>
            )}
        </div>
    );
}
