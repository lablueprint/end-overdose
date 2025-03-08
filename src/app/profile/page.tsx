'use client';

import RolePlate from './Components/RolePlate';
import { useState, useEffect } from 'react';
import ConfirmButton from './Components/ConfirmButton';
import BadgeTable from './Components/BadgeTable';
import ProfilePicture from './Components/ProfilePicture';
import ProfileSelectButton from './Components/ProfileSelectButton';
import styles from './profile.module.css';
import AuthWrap from '@/components/AuthWrap';
import { useUserStore } from '@/store/userStore';
import { getKibbleFromStudentID } from '@/app/api/students/actions';
import Image from 'next/image';
import ColorPickerDialog from './Components/ColorPickerDialogue';
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
    const [kibbleCount, setKibbleCount] = useState(0);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedColor, setSelectedColor] = useState('#009F5D'); // Default white

    // const [name, setName] = useState('FirstName LastName');
    const [profileChanged, setProfileChanged] = useState(false);
    const user = useUserStore((state) => state.user);
    const role = useUserStore((state) => state.role);
    if (user && 'student_id' in user) {
        const kibbleCount = getKibbleFromStudentID(user.student_id);
    }
    useEffect(() => {
        async function fetchKibble() {
            if (user && 'student_id' in user) {
                const kibble = await getKibbleFromStudentID(user.student_id);
                if (kibble !== null) {
                    setKibbleCount(kibble.kibble_count);
                }
            }
        }
        fetchKibble();
    }, [user]);
    const changeProfilePicture = (newProfileIndex: number) => {
        setSelectedProfilePicture(newProfileIndex);
        setProfileChanged(true);
    };

    /* return (
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
    ); */

    return (
        <div className={styles.profileContainer}>
            <div className={styles.leftSide}>
                <div
                    className={styles.profilePictureHolder}
                    style={{ backgroundColor: selectedColor }}
                >
                    <Image
                        src="/fish.png"
                        alt=""
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{
                            width: '100%',
                            height: 'auto',
                            objectFit: 'contain',
                        }}
                    />
                    <button
                        className={styles.colorButton}
                        onClick={() => setIsDialogOpen(true)}
                    >
                        X
                    </button>
                </div>
                <div className={styles.nameContainer}>
                    {' '}
                    <p className={styles.nameTag}> FirstName LastName</p>
                </div>
                <div>
                    <p className={styles.achievementsTag}>Achievements</p>
                </div>
                <div className={styles.lhsAchievementsContainer}>
                    <BadgeTable />
                </div>
            </div>
            <div className={styles.rightSide}></div>
            <ColorPickerDialog
                isOpen={isDialogOpen}
                setIsOpen={setIsDialogOpen}
                selectedColor={selectedColor}
                setSelectedColor={setSelectedColor}
            />
        </div>
    );
}

export type WrapperProps = {
    mainApp: React.ElementType;
};

<div className={styles.rhsInfoContainer}>
    <div className={styles.progressBar}>
        <p> level 2</p>
        <div
            style={{
                borderRadius: '50%',
                backgroundColor: 'whitesmoke',
                height: '30px',
                width: '30px',
            }}
        ></div>
    </div>
    <div className={styles.assignmentList}>
        <div className={styles.assignment} />
        <div className={styles.assignment} />
        <div className={styles.assignment} />
        <div className={styles.assignment} />
    </div>
</div>;
