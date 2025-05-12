'use client';

import { useState, useEffect } from 'react';
import BadgeTable from './Components/BadgeTable';
import styles from './profile.module.css';
import AuthWrap from '@/components/AuthWrap';
import { useUserStore } from '@/store/userStore';
import Image from 'next/image';
import ColorPickerDialog from './Components/ColorPickerDialogue';
import BadgeModal from './Components/BadgeModal';
/*
 * Notes:
 * Dynamically renders profile banner/picture with cat, color and background.
 *
 * TODO:
 * Profile picture,
 * need to store color, cat, background, inventory, kibble, and badgesEarned in database.
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
    // if (user && 'student_id' in user) {
    //     const kibbleCount = getKibbleFromStudentID(user.student_id);
    // }
    // useEffect(() => {
    //     async function fetchKibble() {
    //         if (user && 'student_id' in user) {
    //             const kibble = await getKibbleFromStudentID(user.student_id);
    //             if (kibble !== null) {
    //                 setKibbleCount(kibble.kibble_count);
    //             }
    //         }
    //     }
    //     fetchKibble();
    // }, [user]);
    const changeProfilePicture = (newProfileIndex: number) => {
        setSelectedProfilePicture(newProfileIndex);
        setProfileChanged(true);
    };

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
            {kibbleCount}
        </div>
    );
}

export type WrapperProps = {
    mainApp: React.ElementType;
};
