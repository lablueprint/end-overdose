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

export type NewStudentData = {
    student_id: string;
    school_name: string;
    profile: Profile;
    courses_average_score: number;
    all_courses_completed: boolean;
    courses: CoursesCompletion;
    fish_count: number;
    certificates: Record<string, string>; // Record is essentially a dictionary of string -> string
    hasLoggedIn: boolean;
};
