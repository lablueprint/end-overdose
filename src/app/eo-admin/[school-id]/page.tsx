'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { getSchoolDataByID } from '@/app/api/schools/actions';
import { getCourseProgress } from '@/app/api/students/actions';
import ProgressBar from './Components/ProgressBar';
import StatusPieChart from './Components/CustomPieChart';
import { NewSchool } from '@/types/newSchool';

export default function SchoolStatPage() {
    const params = useParams();
    const schoolId = params['school-id'] as string;
    const [school, setSchool] = useState<NewSchool | null>();
    const [progressCounts, setProgressCounts] = useState({
        notStarted: 0,
        inProgress: 0,
        completed: 0,
        total: 0,
    });
    const [loading, setLoading] = useState(true);

    //NOTE: If we look at the dependencies of this useEffect, then we see that we only rerun this if schoolId changes
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                // 1. Fetch school data from the API
                const school = await getSchoolDataByID(schoolId);

                if (school && school.student_ids) {
                    setSchool(school);

                    // 2. Get list of students and iterate through them
                    const firebaseIds = Object.values(school.student_ids).map(
                        (entry) => entry.student_firebase_id
                    );

                    // Initialize counters
                    let notStarted = 0;
                    let inProgress = 0;
                    let completed = 0;

                    // 3. Loop through each student using their firebase ID
                    for (const firebaseId of firebaseIds) {
                        const progress = await getCourseProgress(
                            firebaseId,
                            'opioidCourse'
                        );

                        // Count each student based on their progress
                        if (progress === 0) {
                            notStarted++;
                        } else if (progress > 0 && progress < 100) {
                            inProgress++;
                        } else if (progress === 100) {
                            completed++;
                        }
                    }

                    // 4. Update useState with the final counts
                    setProgressCounts({
                        notStarted,
                        inProgress,
                        completed,
                        total: firebaseIds.length,
                    });

                    console.log('Progress counts:', {
                        notStarted,
                        inProgress,
                        completed,
                        total: firebaseIds.length,
                    });
                } else {
                    console.error('No school data or student_ids found');
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

    // Calculate percentages for the pie chart
    const calculatePercentages = () => {
        if (progressCounts.total === 0) {
            return {
                notStartedPercent: 0,
                inProgressPercent: 0,
                completedPercent: 0,
            };
        }

        const { completed, inProgress, notStarted, total } = progressCounts;

        return {
            completedPercent: Math.round((completed / total) * 100 * 10) / 10, //This multiply and divide by 10 is to help with int rounding
            inProgressPercent: Math.round((inProgress / total) * 100 * 10) / 10,
            notStartedPercent: Math.round((notStarted / total) * 100 * 10) / 10,
        };
    };

    const { completedPercent, inProgressPercent, notStartedPercent } =
        calculatePercentages();

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-6 pt-16">
            {/* 3. Use the information in the React return */}
            <div className="mb-8">
                <div className="flex flex-col">
                    <div className="flex items-baseline gap-4">
                        <h1 className="text-3xl font-bold">
                            {school?.school_name}
                        </h1>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-4 gap-4 mb-8 rounded-2xl shadow-md px-6 py-4 bg-white">
                <div className="border-r">
                    <div className="text-gray-500 mb-1">Enrolled Students</div>
                    <div className="text-2xl font-bold">
                        {school?.enrolled_students || 0}
                    </div>
                </div>

                <div className="border-r">
                    <div className="text-gray-500 mb-1">Students Completed</div>
                    <div className="text-2xl font-bold">
                        {progressCounts.completed}
                    </div>
                </div>

                <div>
                    <div className="text-gray-500 mb-1">
                        Students In Progress
                    </div>
                    <div className="text-2xl font-bold">
                        {progressCounts.inProgress}
                    </div>
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
                                const label =
                                    name.charAt(0).toUpperCase() +
                                    name.slice(1);

                                const completionText = `${progressCounts.completed}/${progressCounts.total}`;

                                return (
                                    <ProgressBar
                                        key={rawLabel}
                                        label={label}
                                        percentage={completionText}
                                    />
                                );
                            }
                        )}
                    </div>
                </div>

                <div className="w-2/5 p-4 bg-white rounded-2xl shadow-md space-y-4">
                    <h1 className="text-3xl font-bold pb-4">
                        Completion Rates
                    </h1>
                    {progressCounts.total > 0 && (
                        <div className="mb-4 text-sm text-gray-600">
                            <div>Completed: {progressCounts.completed}</div>
                            <div>In Progress: {progressCounts.inProgress}</div>
                            <div>Not Started: {progressCounts.notStarted}</div>
                            <div>Total: {progressCounts.total}</div>
                        </div>
                    )}
                    <StatusPieChart
                        notStartedPercent={notStartedPercent}
                        inProgressPercent={inProgressPercent}
                        completedPercent={completedPercent}
                    />
                </div>
            </div>
        </div>
    );
}
