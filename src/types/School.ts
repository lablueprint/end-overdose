export type SchoolDocument = {
    id: string;
    school: School;
};

export type School = {
    name: string;
    school_ids: Map<string, string>;
    course_ids: Array<string>;
};

export const WolfPackAlphaUniversity: School = {
    name: 'Alpha School of the Wolfpacks',
    school_ids: new Map([
        ['WolfLover123', 'AWOOOOOOO'],
        ['Cow', 'Mooooooooo'],
        ['Joe Bruin', 'rawrrrrrrrr'],
    ]),
    course_ids: ['12345', '67890'],
};

export const UCLA: School = {
    name: 'UCLA',
    school_ids: new Map([
        ['Julio Frenk', 'currChancellor'],
        ['Gene Block', 'rip'],
        ['Mick Cronin', 'ILoveJaimeJacquez'],
    ]),
    course_ids: ['12345'],
};

export const SchoolDocumentTest: SchoolDocument = {
    id: '045454390',
    school: WolfPackAlphaUniversity,
};
