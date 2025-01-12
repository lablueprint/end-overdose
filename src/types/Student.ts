export type Student = {
    student_id: string;
    email?: string;
    school_name: string;
    nameplate: string;
    course_completion: {
        opioidCourse: number;
        careerCourse: number;
    };
    badges: string[];
};

// example:
// const student: Student = {
//     student_id: '12345',
//     email: 'student@fusdk.net',
//     school_name: 'Fremont Unified School District',
//     nameplate: 'Student Name',
//     course_completion: {
//         opioidCourse: 100,
//         careerCourse: 50,
//     },
//     badges: ['badge1', 'badge2'],
// };
