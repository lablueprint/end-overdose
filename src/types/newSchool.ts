interface StudentIdInfo {
    student_firebase_id: string;
    student_password: string;
}

// School interface based on the provided schema
export type NewSchool = {
    school_id: string;
    school_name: string;
    enrolled_students: number;
    average_performances: {
        opioidCourse: number;
    };
    students_completed: number;
    students_in_progress: number;
    student_ids: Record<string, StudentIdInfo>;
};
