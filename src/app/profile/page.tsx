'use client';

import { useState, useEffect } from 'react';
import BadgeTable from './Components/BadgeTable';
import styles from './profile.module.css';
import AuthWrap from '@/components/AuthWrap';
import { useUserStore } from '@/store/userStore';
import { getStudentFromID2 } from '@/app/api/students/actions';
import Image from 'next/image';
import ColorPickerDialog from './Components/ColorPickerDialogue';
import BadgeModal from './Components/BadgeModal';
import Certificate from '../certificates/Certificate';
import { set } from 'react-hook-form';
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
    const [selectedColor, setSelectedColor] = useState('');
    const [selectedCat, setSelectedCat] = useState('/cat.png');
    const [selectedBackground, setSelectedBackground] = useState('');
    const [nameplate, setNameplate] = useState('');
    const [unlockedThemes, setUnlockedThemes] = useState<string[]>([]);

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
    useEffect(() => {
        async function fetchThemes() {
            if (user && 'student_id' in user) {
                const student = await getStudentFromID2(user.student_id);
                if ('profile' in student) {
                    setSelectedBackground(
                        `/backgrounds/${student.profile.background}-profile.png`
                    );
                    setSelectedCat(`/cats/${student.profile.cat}.png`);
                    setNameplate(student.profile.nameplate);
                    const unlocked = student.profile.unlocked;
                    const cleaned = unlocked.filter(
                        (name: string) => name !== ''
                    );
                    setUnlockedThemes(cleaned);
                }
            }
        }
        fetchThemes();
    }, [user]);

    const changeProfilePicture = (newProfileIndex: number) => {
        setSelectedProfilePicture(newProfileIndex);
        setProfileChanged(true);
    };

    return (
        <div className={styles.profileContainer}>
            <div className={styles.leftSide}>
                <div className={styles.nameContainer}>
                    {' '}
                    <p className={styles.nameTag}> {nameplate} </p>
                </div>
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
                        Edit Profile
                    </button>
                </div>
                <p className={styles.achievementsTag}>CERTIFICATES</p>
                <div className={styles.scrollWrapper}>
                    <ul className={styles.horizontalList}>
                        <Certificate courseName="Opioid Prevention Course" />
                    </ul>
                </div>
                {/* <div className={styles.lhsAchievementsContainer}>
                    <BadgeTable selectedBadges={selectedBadges} />
                </div>
                <div className={styles.viewButtonContainer}>
                    <button
                        className={styles.viewButton}
                        onClick={() => setIsBadgeModalOpen(true)}
                    >
                        <p className={styles.viewText}> View All </p>
                    </button>
                </div> */}
            </div>
            {/* <div className={styles.rightSide}></div> */}
            <ColorPickerDialog
                isOpen={isDialogOpen}
                setIsOpen={setIsDialogOpen}
                selectedColor={selectedColor}
                setSelectedColor={setSelectedColor}
                selectedCat={selectedCat}
                setSelectedCat={setSelectedCat}
                selectedBackground={selectedBackground}
                setSelectedBackground={setSelectedBackground}
                unlockedThemes={unlockedThemes}
            />
            {isBadgeModalOpen && (
                <BadgeModal
                    selectedBadges={selectedBadges}
                    setSelectedBadges={setSelectedBadges}
                    badgesEarned={badgesEarned}
                    onClose={() => setIsBadgeModalOpen(false)}
                />
            )}
            {/* {kibbleCount} */}
        </div>
    );
}

export type WrapperProps = {
    mainApp: React.ElementType;
};
