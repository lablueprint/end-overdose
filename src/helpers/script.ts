import axios from 'axios';
import { faker } from '@faker-js/faker';

// Updated interfaces based on the new schema
interface Quiz {
    name: string;
    score: number;
}

interface StudentData {
    student_id: string;
    email?: string;
    school_name: string;
    nameplate: string;
    kibble_count: number;
    course_completion: {
        opioidCourse: {
            courseScore: number; // % of final score
            courseProgress: number; // % of lessons completed
        };
        careerCourse: {
            courseScore: number; // % of final score
            courseProgress: number; // % of lessons completed
        };
    };
    quizzes: Quiz[];
    badges: string[];
}

// Function to create a random student with the new schema
const createRandomStudent = (school: string): StudentData => {
    // Array of badges to randomly choose from
    const badgeOptions = ['EndOverdose', 'TeaPot', 'UnitedWay'];

    // Generate 0-3 random badges
    const numBadges = faker.number.int({ min: 0, max: 3 });
    const badges = faker.helpers.arrayElements(badgeOptions, numBadges);

    // Generate random quizzes (1-5 quizzes)
    const quizCount = faker.number.int({ min: 1, max: 5 });
    const quizzes: Quiz[] = [];

    for (let i = 0; i < quizCount; i++) {
        quizzes.push({
            name: `Quiz ${i + 1}`,
            score: faker.number.int({ min: 0, max: 100 }),
        });
    }

    // First and last name for the nameplate
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();

    return {
        student_id: faker.number
            .int({ min: 100000000, max: 999999999 })
            .toString(),
        email: faker.internet.email({ firstName, lastName }),
        school_name: school,
        nameplate: `${firstName} ${lastName}`,
        kibble_count: faker.number.int({ min: 0, max: 1000 }),
        course_completion: {
            opioidCourse: {
                courseScore: faker.number.int({ min: 0, max: 100 }),
                courseProgress: faker.number.int({ min: 0, max: 100 }),
            },
            careerCourse: {
                courseScore: faker.number.int({ min: 0, max: 100 }),
                courseProgress: faker.number.int({ min: 0, max: 100 }),
            },
        },
        quizzes: quizzes,
        badges: badges,
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

// Run the script
populateStudents()
    .then(() => {
        console.log('Student population complete!');
    })
    .catch((error) => {
        console.error('Error in student population:', error);
    });
