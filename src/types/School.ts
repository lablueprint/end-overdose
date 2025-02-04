export type SchoolDocument = {
    id: string;
    school: School;
};

export type School = {
    name: string; //Name of School
    school_ids: Map<string, string>; //key: username, value; passwords
};

export const WolfPackAlphaUniversity: School = {
    name: 'Alpha School of the Wolfpacks',
    school_ids: new Map([
        ['WolfLover123', 'AWOOOOOOO'],
        ['Cow', 'Mooooooooo'],
        ['Joe Bruin', 'rawrrrrrrrr'],
    ]),
};

export const UCLA: School = {
    name: 'UCLA',
    school_ids: new Map([
        ['Julio Frenk', 'currChancellor'],
        ['Gene Block', 'rip'],
        ['Mick Cronin', 'ILoveJaimeJacquez'],
    ]),
};

export const SchoolDocumentTest: SchoolDocument = {
    id: '045454390',
    school: WolfPackAlphaUniversity,
};
