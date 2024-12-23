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
