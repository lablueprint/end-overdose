interface Quiz {
    name: string;
    score: number;
}

export type Student = {
    student_id: string;
    email: string;
    school_name: string;
    nameplate: string;
    kibble_count: number;
    course_completion: {
        opioidCourse: {
            courseScore: number; // % of final score >=80 then we do ++passed
            courseProgress: number; // % of lessons completed == 100
            //attempts on final
        };
        careerCourse: {
            courseScore: number; // % of final score
            courseProgress: number; // % of lessons completed
        };
    };
    quizzes: Quiz[];
    badges: string[];
    certificates: string[];
};

// example:
export const StudentJosh: Student = {
    student_id: '12345',
    email: 'josh@fusd.net',
    school_name: 'Fremont Unified School District',
    nameplate: 'Josh Doe',
    kibble_count: 1000,
    course_completion: {
        opioidCourse: {
            courseScore: 50, // half of lessons completed
            courseProgress: 25, // half of modules completed in the current lesson
        },
        careerCourse: {
            courseScore: 75,
            courseProgress: 50,
        },
    },
    quizzes: [
        { name: 'quiz1', score: 50 },
        { name: 'quiz2', score: 80 },
    ],
    badges: ['coolbadge', 'wonderfulbadge'],
    certificates: ['opioidCertificate'],
};

// Type guard function
export const isStudent = (obj: any): obj is Student => {
    return (
        typeof obj === 'object' &&
        obj !== null &&
        typeof obj.student_id === 'string' &&
        typeof obj.email === 'string' &&
        typeof obj.school_name === 'string' &&
        typeof obj.nameplate === 'string' &&
        typeof obj.kibble_count === 'number' &&
        typeof obj.course_completion === 'object' &&
        typeof obj.course_completion.opioidCourse === 'object' &&
        typeof obj.course_completion.opioidCourse.courseScore === 'number' &&
        typeof obj.course_completion.opioidCourse.courseProgress === 'number' &&
        typeof obj.course_completion.careerCourse === 'object' &&
        typeof obj.course_completion.careerCourse.courseScore === 'number' &&
        typeof obj.course_completion.careerCourse.courseProgress === 'number' &&
        Array.isArray(obj.quizzes) && // Assuming `Quiz[]` is an array
        Array.isArray(obj.badges) &&
        Array.isArray(obj.certificates)
    );
};
