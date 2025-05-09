import axios from 'axios';
import { faker } from '@faker-js/faker';
import { NewStudent } from '../types/newStudent';

// Define the type for student ID information
interface StudentIdInfo {
    student_firebase_id: string;
    student_password: string;
}

// School interface based on the provided schema
interface School {
    school_id: string;
    school_name: string;
    enrolled_students: number;
    average_performances: {
        opioidCourse: number;
    };
    students_completed: number;
    students_in_progress: number;
    student_ids: Record<string, StudentIdInfo>;
}

// Extended NewStudent interface with MongoDB _id field
interface StudentWithId extends NewStudent {
    _id: string; // This will be the Firebase/MongoDB ID
}

// Function to generate a random 7-character password
const generateRandomPassword = (): string => {
    const chars =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let password = '';
    for (let i = 0; i < 7; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
};

// Main function to populate schools
async function populateSchools() {
    try {
        console.log('Starting school population process...');

        // 1. Define school information
        const schoolsInfo = [
            { name: 'Palmdale', id: '0001', expectedCount: 20 },
            { name: 'NewHall', id: '0002', expectedCount: 30 },
            { name: 'Garvey', id: '0003', expectedCount: 50 },
        ];

        // 2. Fetch all students from the database
        const response = await axios.get('http://localhost:3000/api/students');
        const allStudents = response.data as StudentWithId[]; //so allStudents is an array of StudentWithId which is just newStudent type plus firebase _id

        console.log(`Retrieved ${allStudents.length} students from database`);

        // 3. Group students by school
        const studentsBySchool: Record<string, StudentWithId[]> = {};
        allStudents.forEach((student) => {
            if (!studentsBySchool[student.school_name]) {
                studentsBySchool[student.school_name] = [];
            }
            studentsBySchool[student.school_name].push(student);
        });

        // 4. Create and populate school objects
        for (const schoolInfo of schoolsInfo) {
            const schoolStudents = studentsBySchool[schoolInfo.name] || [];
            const actualCount = schoolStudents.length;

            console.log(
                `Processing ${schoolInfo.name}: Found ${actualCount} students (Expected: ${schoolInfo.expectedCount})`
            );

            // Create the school object
            const school: School = {
                school_id: schoolInfo.id,
                school_name: schoolInfo.name,
                enrolled_students: actualCount,
                average_performances: {
                    opioidCourse: 0, // Initially 0 as specified
                },
                students_completed: schoolStudents.filter(
                    (s) => s.all_courses_completed
                ).length,
                students_in_progress: schoolStudents.filter(
                    (s) => !s.all_courses_completed
                ).length,
                student_ids: {},
            };

            // Populate student_ids with Firebase IDs and generated passwords
            schoolStudents.forEach((student) => {
                school.student_ids[student.student_id] = {
                    student_firebase_id: student._id,
                    student_password: generateRandomPassword(),
                };
            });

            // 5. Save the school to the database
            try {
                await axios.post('http://localhost:3000/api/schools', school);
                console.log(
                    `Successfully created school: ${schoolInfo.name} (ID: ${schoolInfo.id})`
                );
            } catch (error) {
                console.error(
                    `Error creating school ${schoolInfo.name}:`,
                    error
                );
            }

            // Add a small delay to prevent overwhelming the server
            await new Promise((resolve) => setTimeout(resolve, 500));
        }

        console.log('School population complete!');
    } catch (error) {
        console.error('Error in school population process:', error);
    }
}

// Run the script
populateSchools()
    .then(() => {
        console.log('All schools have been populated successfully!');
    })
    .catch((error) => {
        console.error('Fatal error in school population:', error);
    });
