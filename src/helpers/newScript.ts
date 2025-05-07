//This is the new script for populating the newStudent Database collection

import axios from 'axios';
import { faker } from '@faker-js/faker';

// First, let's define the new interface based on the schema

interface Profile {
    unlocked: string[];
    cat: string;
    background: string;
    nameplate: string;
}

interface QuizInfo {
    name: string;
    score: number;
}

//Each individual course has this information
interface CourseCompletion {
    courseProgress: number;
    courseScore: number;
    quizzes: QuizInfo[];
}

interface CoursesCompletion {
    opioidCourse: CourseCompletion;
    // Could add other courses as needed
}

interface NewStudentData {
    student_id: string;
    school_name: string;
    profile: Profile;
    courses_average_score: number;
    all_courses_completed: boolean;
    courses_completion: CoursesCompletion;
    fish_count: number;
    certificates: string[];
    hasLoggedIn: boolean;
}

// Updated function to create a random student with the new schema
const createRandomStudent = (school: string): NewStudentData => {
    // First and last name for the nameplate
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();

    // Available theme options
    const themeOptions = ['cowboy', 'space', 'pirate', 'ninja']; //DEFAULT IS NARCAT

    // Generate 1-2 random unlocked themes
    const unlockedThemes = faker.helpers.arrayElements(
        themeOptions,
        faker.number.int({ min: 1, max: 2 })
    );

    // Select one of the unlocked themes for cat and background
    const selectedTheme = faker.helpers.arrayElement(unlockedThemes);

    // Generate random quizzes (1-3 quizzes)
    const quizCount = faker.number.int({ min: 1, max: 3 });
    const quizzes: QuizInfo[] = [];
    let totalScore = 0;

    for (let i = 0; i < quizCount; i++) {
        const score = faker.number.int({ min: 0, max: 100 });
        totalScore += score;
        quizzes.push({
            name: `Quiz ${i + 1}`,
            score: score,
        });
    }

    // Course completion data
    const courseProgress = faker.number.int({ min: 0, max: 100 });
    const courseScore = quizCount > 0 ? Math.round(totalScore / quizCount) : 0;

    // Certificates based on course completion
    const certificates: string[] = [];
    if (courseProgress === 100) {
        certificates.push('opioid');
    }

    // Determine if all courses are completed
    const all_courses_completed = courseProgress === 100;

    return {
        student_id: faker.number
            .int({ min: 100000000, max: 999999999 })
            .toString(),
        school_name: school,
        profile: {
            unlocked: unlockedThemes,
            cat: selectedTheme,
            background: selectedTheme,
            nameplate: `${firstName} ${lastName}`,
        },
        courses_average_score: courseScore,
        all_courses_completed: all_courses_completed,
        courses_completion: {
            opioidCourse: {
                courseProgress: courseProgress,
                courseScore: courseScore,
                quizzes: quizzes,
            },
        },
        fish_count: faker.number.int({ min: 0, max: 50 }),
        certificates: certificates,
        hasLoggedIn: faker.datatype.boolean(),
    };
};

// Test the function
const testStudent = createRandomStudent('Palmdale');
console.log(JSON.stringify(testStudent, null, 2));
