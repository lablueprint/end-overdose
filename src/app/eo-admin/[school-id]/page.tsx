'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { getSingleSchoolAdminEmailMap } from '@/app/api/admins/actions';
import { getSchoolDataByID, getSchoolStats } from '@/app/api/schools/actions';
import ProgressBar from './Components/ProgressBar';
import StatusPieChart from './Components/CustomPieChart';
import { NewSchool } from '@/types/newSchool';

export default function SchoolStatPage() {
    const topics = [{ label: 'Opioid', percentage: 0 }];
    const params = useParams();
    const schoolId = params['school-id'] as string;
    const [school, setSchool] = useState<NewSchool | null>();
    const [schoolStats, setSchoolStats] = useState<any | null>(null);
    const [schoolPassFail, setSchoolPassFail] = useState<any | null>(null);
    const [schoolEmail, setSchoolEmail] = useState<string>("");
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                // Fetch school data from the API
                const school = await getSchoolDataByID(schoolId);
                const schoolStatsById = await getSchoolStats(schoolId);
                const schoolAdmins = await getSingleSchoolAdminEmailMap();
                if (school) {
                    setSchool(school);
                    setSchoolStats(schoolStatsById);
                    setSchoolEmail(schoolAdmins[schoolId] || 'No admin registered');
                    console.log('School data fetched successfully');
                } else {
                    console.error('No school data found for the given ID');
                }
            } catch (error) {
                console.error('Error fetching school data:', error);
            } finally {
                setLoading(false);
            }
        };
        if (schoolId) {
            fetchData();
        }
    }, [schoolId]);
    if (loading) {
        return <div>Loading...</div>;
    }
    return (
        <div className="max-w-6xl mx-auto px-4 py-6 pt-16">
            <div className="mb-8">
                <div className="flex flex-col">
                    <div className="flex items-baseline gap-4">
                        <h1 className="text-3xl font-bold">
                            {school?.school_name}
                        </h1>
                    </div>

                    <div className="mt-4 text-gray-600">
                        <span>{schoolEmail}</span>
                    </div>
                </div>
            </div>
            <div className="border-b border-gray-300 py-4 mb-8">
                <nav className="flex space-x-8">
                    <button className="pb-2 text-black font-semibold border-b-2 border-black">
                        Overview
                    </button>
                    <button className="pb-2 text-gray-400 hover:text-black">
                        Courses
                    </button>
                </nav>
            </div>
            <div className="grid grid-cols-4 gap-4 mb-8 rounded-2xl shadow-md px-6 py-4 bg-white">
                <div className="border-r">
                    <div className="text-gray-500 mb-1">Enrolled Students</div>
                    <div className="text-2xl font-bold">{schoolStats.enrolled_students}</div>
                </div>

                <div className="border-r">
                    <div className="text-gray-500 mb-1">Avg. Performance</div>
                    <div className="text-2xl font-bold">{schoolStats.average_score}%</div>
                </div>

                <div className="border-r">
                    <div className="text-gray-500 mb-1">Students Completed</div>
                    <div className="text-2xl font-bold">{schoolStats.students_completed}</div>
                </div>

                <div>
                    <div className="text-gray-500 mb-1">
                        Students In Progress
                    </div>
                    <div className="text-2xl font-bold">{schoolStats.students_in_progress}</div>
                </div>
            </div>
            <div className="flex justify-between gap-8">
                <div className="w-3/5 p-4 bg-white rounded-2xl shadow-md">
                    <h1 className="text-3xl font-bold pb-4">Topics</h1>
                    <div className="pl-8 pr-4 pb-6 flex flex-col space-y-6">
                        {Object.entries(school?.average_performances || {}).map(
                            ([rawLabel, percentage]) => {
                                const match = rawLabel.match(/^(\w+)Course$/);
                                const name = match ? match[1] : rawLabel;
                                const label = name.charAt(0).toUpperCase() + name.slice(1);

                                return (
                                    <ProgressBar
                                        key={rawLabel}
                                        label={label}
                                        percentage={percentage}
                                    />
                                );
                            }
                        )}
                    </div>
                </div>
                <div className="w-2/5 p-4 bg-white rounded-2xl shadow-md space-y-4">
                    <h1 className="text-3xl font-bold pb-4">Steps to Take</h1>
                    <StatusPieChart
                        failPercent={10}
                        inProgressPercent={schoolStats.students_in_progress / schoolStats.enrolled_students * 100}
                        passPercent={50}
                    />
                </div>
            </div>
        </div>
    );
}
