'use client';

import RolePlate from './Components/RolePlate';
import { useState } from 'react';
import ConfirmButton from './Components/ConfirmButton';
import BadgeTable from './Components/BadgeTable';
import ProfilePicture from './Components/ProfilePicture';
import ProfileSelectButton from './Components/ProfileSelectButton';
import styles from './profile.module.css';

/*
 * Notes:
 * userRole (string): role of account (student or administrator currently)
 * selectedProfilePicture (int): presetProfilePicture currently in use (int 0 < selectedProfilePicture < profilePictures.length())
 * name (string): Name of profile
 * profileChange (bool): marks whether profile picture has been chosen
 */

export default function Home() {
    const [userRole, setUserRole] = useState('administrator');
    const [selectedProfilePicture, setSelectedProfilePicture] = useState(0);

    const [name, setName] = useState('FirstName LastName');
    const [profileChanged, setProfileChanged] = useState(false);

    const changeProfilePicture = (newProfileIndex: number) => {
        setSelectedProfilePicture(newProfileIndex);
        setProfileChanged(true);
    };

    return (
        <div>
            <title> End Overdose </title>
            <main>
                <div>
                    <h1 className={styles.profileText}> Profile </h1>
                </div>
                <div className={styles.pageContainer}>
                    <ProfilePicture picIndex={selectedProfilePicture} />
                    <div className={styles.pageContainer}>
                        <h1 className={styles.nameText}>{name}</h1>
                        <RolePlate role={userRole} />
                    </div>
                    <BadgeTable />
                    <div className={styles.profileSelectButtonContainer}>
                        <ProfileSelectButton
                            picIndex={1}
                            onClick={changeProfilePicture}
                        />
                        <ProfileSelectButton
                            picIndex={2}
                            onClick={changeProfilePicture}
                        />
                        <ProfileSelectButton
                            picIndex={3}
                            onClick={changeProfilePicture}
                        />
                        <ProfileSelectButton
                            picIndex={4}
                            onClick={changeProfilePicture}
                        />
                        <div className={styles.profileSelectButton}>
                            <ConfirmButton
                                changesMade={profileChanged}
                                onPress={() => {
                                    setProfileChanged(false);
                                }}
                            />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export type WrapperProps = {
    mainApp: React.ElementType;
};
