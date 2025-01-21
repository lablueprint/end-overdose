import axios from 'axios';
import { faker } from '@faker-js/faker'; // Recommended randomization library

//select 20 30 50 from the schools (100 total)

// Interface remains the same as in your original code
interface StudentData {
    student_id: number;
    name: {
        first: string;
        last: string;
    };
    school_name: string;
    badges?: string[];
    course_completion?: Record<string, any>;
}

// Function to create a random student
const createRandomStudent = (school: string): StudentData => {
    // Array of schools to randomly choose from
    const badges = ['EndOverdose', 'TeaPot', 'UnitedWay'];

    return {
        student_id: faker.number.int({ min: 100000000, max: 999999999 }),

        name: {
            first: faker.person.firstName(), // Generates a random first name
            last: faker.person.lastName(), // Generates a random last name
        },

        school_name: school, // Randomly selects a school

        badges: [
            faker.helpers.arrayElement(badges), // Random badge 1
        ],

        course_completion: {
            course1: faker.number.int({ min: 0, max: 100 }), // Random completion between 0-100
            course2: faker.number.int({ min: 0, max: 100 }), // Random completion between 0-100
        },
    };
};

// Main script to populate students
async function populateStudents() {
    console.log(`Generating 100 random students`);

    //20 of School: Palmdale
    for (let i = 0; i < 20; i++) {
        const studentData = createRandomStudent('Palmdale');
        try {
            const response = await axios.post(
                'http://localhost:3000/api/students',
                studentData
            );
            //console.log(`Created student ${i}`);
        } catch (error) {
            console.error(`Error creating student:`, error);
        }

        // Optional: Add a small delay to prevent overwhelming the server
        await new Promise((resolve) => setTimeout(resolve, 100));
    }

    //30 of School: NewHall
    for (let i = 0; i < 30; i++) {
        const studentData = createRandomStudent('NewHall');
        try {
            const response = await axios.post(
                'http://localhost:3000/api/students',
                studentData
            );
            //console.log(`Created student ${i}`);
        } catch (error) {
            console.error(`Error creating student:`, error);
        }

        // Optional: Add a small delay to prevent overwhelming the server
        await new Promise((resolve) => setTimeout(resolve, 100));
    }

    //50 of School: Garvey
    for (let i = 0; i < 50; i++) {
        const studentData = createRandomStudent('Garvey');
        try {
            const response = await axios.post(
                'http://localhost:3000/api/students',
                studentData
            );
            //console.log(`Created student ${i}`);
        } catch (error) {
            console.error(`Error creating student:`, error);
        }

        // Optional: Add a small delay to prevent overwhelming the server
        await new Promise((resolve) => setTimeout(resolve, 100));
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
