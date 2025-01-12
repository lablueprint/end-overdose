export type AdminRole = 'school_admin' | 'eo_admin';

export type Admin = {
    name: {
        first: string;
        last: string;
    };
    email: string;
    role: AdminRole;
    school_name: string;
    approved: boolean;
};

// example:
// const admin: Admin = {
//     name: {
//         first: 'John',
//         last: 'Doe',
//     },
//     email: 'johndoe@fusdk.net',
//     role: 'school_admin',
//     school_name: 'Fremont Unified School District',
//     approved: true,
// };
