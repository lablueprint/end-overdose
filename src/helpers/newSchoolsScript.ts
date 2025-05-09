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
