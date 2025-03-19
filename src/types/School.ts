export type SchoolDocument = {
    id: string;
    school: School;
};

export type School = {
    //SCHOOL FIELDS
    school_name: string;
    school_id: number; //NOT NEEDED
    school_email: string; //NOT NEEDED

    //STUDENT FIELDS
    student_ids: Map<string, string>; //NOT NEEDED
    student_count: number;

    //TOGGLE COURSES
    course_ids: Array<string>; //School admin can toggle courses
};

//RANDOM EXPORT FUNCTION THAT WERE HERE BEFORE
// export const WolfPackAlphaUniversity: School = {
//     school_name: 'Alpha School of the Wolfpacks',
//     student_ids: new Map([
//         ['WolfLover123', 'AWOOOOOOO'],
//         ['Cow', 'Mooooooooo'],
//         ['Joe Bruin', 'rawrrrrrrrr'],
//     ]),
//     course_ids: ['12345', '67890'],
// };

// export const UCLA: School = {
//     name: 'UCLA',
//     school_ids: new Map([
//         ['Julio Frenk', 'currChancellor'],
//         ['Gene Block', 'rip'],
//         ['Mick Cronin', 'ILoveJaimeJacquez'],
//     ]),
//     course_ids: ['12345'],
// };

// export const SchoolDocumentTest: SchoolDocument = {
//     id: '045454390',
//     school: WolfPackAlphaUniversity,
// };
