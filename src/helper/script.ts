import axios from 'axios';

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

// Function to create a student
const createStudent1 = (n: number): StudentData => {
    return {
        student_id: n,
        name: {
            first: 'Tom' + n,
            last: 'Oh' + n,
        },
        school_name: 'School1',
        badges: ['test1'],
        course_completion: {},
    };
};

// Main script to populate students
async function populateStudents() {
    console.log(`Generating 20 students for School1`);
    for (let i = 0; i < 20; i++) {
        const studentData = createStudent1(i);
        try {
            const response = await axios.post(
                'http://localhost:3000/api/students',
                studentData
            );
            console.log(`Created student ${i}`);
        } catch (error) {
            console.error(`Error creating student for School1:`, error);
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
