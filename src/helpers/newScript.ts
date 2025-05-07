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

// Each individual course has this information
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
    courses: CoursesCompletion;
    fish_count: number;
    certificates: Record<string, string>; // Record is essentially a dictionary of string -> string
    hasLoggedIn: boolean;
}

// Generate a random date string within the last year
const generateRandomDate = (): string => {
    const today = new Date();
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(today.getFullYear() - 1);

    const randomDate = new Date(
        oneYearAgo.getTime() +
            Math.random() * (today.getTime() - oneYearAgo.getTime())
    );

    const months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
    ];

    return `${months[randomDate.getMonth()]} ${randomDate.getDate()} ${randomDate.getFullYear()}`;
};

// Updated function to create a random student with the new schema
const createRandomStudent = (school: string): NewStudentData => {
    // Following the exact order of properties in the interface

    // 1. student_id
    const student_id = faker.number
        .int({ min: 100000000, max: 999999999 })
        .toString();

    // 2. school_name
    const school_name = school;

    // 3. profile
    const firstName = faker.person.firstName();
    const middleName = faker.person.middleName();
    const lastName = faker.person.lastName();

    const profile: Profile = {
        unlocked: ['narcat'],
        cat: 'narcat',
        background: 'narcat',
        nameplate: `${firstName} ${middleName} ${lastName}`,
    };

    // 4. Generate quizzes and calculate scores for courses_average_score
    const quizCount = 3;
    const quizzes: QuizInfo[] = [];
    let totalScore = 0;

    for (let i = 0; i < quizCount; i++) {
        const score = faker.number.int({ min: 0, max: 100 });
        totalScore += score;
        quizzes.push({
            name: `opioid ${i + 1}`,
            score: score,
        });
    }

    const courseProgress = faker.number.int({ min: 0, max: 95 });
    const courseAverage =
        quizCount > 0 ? Math.round(totalScore / quizCount) : 0;

    // Course average score SAME AS COURSESCORE FOR NOW
    const courses_average_score = courseAverage;

    // 5. all_courses_completed
    const all_courses_completed = courseProgress === 100;

    // 6. courses
    const courses: CoursesCompletion = {
        opioidCourse: {
            courseProgress: courseProgress,
            courseScore: courseAverage,
            quizzes: quizzes,
        },
    };

    // 7. fish_count
    const fish_count = faker.number.int({ min: 0, max: 50 });

    // 8. certificates with course -> date mapping
    const certificates: Record<string, string> = {};
    certificates['opioid'] = generateRandomDate(); //Giving everyone a certificate regardless for testing purpoeses

    // 9. hasLoggedIn
    const hasLoggedIn = faker.datatype.boolean();

    return {
        student_id,
        school_name,
        profile,
        courses_average_score,
        all_courses_completed,
        courses,
        fish_count,
        certificates,
        hasLoggedIn,
    };
};

// Main script to populate students with school distribution
async function populateStudents() {
    console.log(`Generating 100 random students`);

    const schools = [
        { name: 'Palmdale', count: 20 },
        { name: 'NewHall', count: 30 },
        { name: 'Garvey', count: 50 },
    ];

    for (const school of schools) {
        console.log(`Generating ${school.count} students for ${school.name}`);

        for (let i = 0; i < school.count; i++) {
            const studentData = createRandomStudent(school.name);
            try {
                const response = await axios.post(
                    'http://localhost:3000/api/students',
                    studentData
                );
                // console.log(`Created student ${i+1} for ${school.name}`);
            } catch (error) {
                console.error(
                    `Error creating student for ${school.name}:`,
                    error
                );
            }

            // Add a small delay to prevent overwhelming the server
            await new Promise((resolve) => setTimeout(resolve, 100));
        }
    }
}

// For testing purposes
const testStudent = createRandomStudent('Palmdale');
console.log(JSON.stringify(testStudent, null, 2));

// Run the script
// populateStudents()
//     .then(() => {
//         console.log('Student population complete!');
//     })
//     .catch((error) => {
//         console.error('Error in student population:', error);
//     });
