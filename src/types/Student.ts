export type Student = {
    student_id: string;
    email?: string;
    school_name: string;
    nameplate: string;
    course_completion: {
        opioidCourse: {
            courseProgress: number; // % of lessons completed
            lessonProgress: number; // % of modules completed in the current lesson
        };
        careerCourse: {
            courseProgress: number; // % of lessons completed
            lessonProgress: number; // % of modules completed in the current lesson
        };
    };
    badges: string[];
};

// example:
export const StudentJosh: Student = {
    student_id: '12345',
    email: 'josh@fusd.net',
    school_name: 'Fremont Unified School District',
    nameplate: 'Josh Doe',
    course_completion: {
        opioidCourse: {
            courseProgress: 50, // half of lessons completed
            lessonProgress: 25, // half of modules completed in the current lesson
        },
        careerCourse: {
            courseProgress: 75,
            lessonProgress: 50,
        },
    },
    badges: ['coolbadge', 'wonderfulbadge'],
};