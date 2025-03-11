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
import BadgeModal from './Components/BadgeModal';
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
    const [selectedColor, setSelectedColor] = useState('#009F5D');
    const [selectedCat, setSelectedCat] = useState('/cat.png');
    const [selectedBackground, setSelectedBackground] = useState('/fish.png');

    const [selectedBadges, setSelectedBadges] = useState([
        'Badge 1',
        'Badge 2',
        'Badge 3',
    ]);
    const [badgesEarned, setBadgesEarned] = useState([
        'Badge 1',
        'Badge 2',
        'Badge 3',
        'Badge 4',
        'Badge 5',
        'Badge 6',
        'Badge 7',
        'Badge 8',
        'Badge 9',
    ]);
    const [isBadgeModalOpen, setIsBadgeModalOpen] = useState(false);

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
                        src={selectedBackground}
                        alt="Background"
                        fill
                        className={styles.backgroundImage}
                    />
                    <Image
                        src={selectedCat}
                        alt="Overlay"
                        width={100}
                        height={100}
                        sizes="(max-width: 768px) 33vw, 100px"
                        priority
                        className={styles.overlayImage}
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
                    <BadgeTable selectedBadges={selectedBadges} />
                </div>
                <div className={styles.viewButtonContainer}>
                    <button
                        className={styles.viewButton}
                        onClick={() => setIsBadgeModalOpen(true)}
                    >
                        <p className={styles.viewText}> View All </p>
                    </button>
                </div>
            </div>
            <div className={styles.rightSide}></div>
            <ColorPickerDialog
                isOpen={isDialogOpen}
                setIsOpen={setIsDialogOpen}
                selectedColor={selectedColor}
                setSelectedColor={setSelectedColor}
                selectedCat={selectedCat}
                setSelectedCat={setSelectedCat}
                selectedBackground={selectedBackground}
                setSelectedBackground={setSelectedBackground}
            />
            {isBadgeModalOpen && (
                <BadgeModal
                    selectedBadges={selectedBadges}
                    setSelectedBadges={setSelectedBadges}
                    badgesEarned={badgesEarned}
                    onClose={() => setIsBadgeModalOpen(false)}
                />
            )}
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
