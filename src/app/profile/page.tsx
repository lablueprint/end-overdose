'use client';

import { useState, useEffect, Fragment } from 'react';
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

export default function Home() {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isBadgeModalOpen, setIsBadgeModalOpen] = useState(false);

    const [selectedColor, setSelectedColor] = useState('');
    const [selectedCat, setSelectedCat] = useState('/cat.png');
    const [selectedBackground, setSelectedBackground] = useState('');
    const [nameplate, setNameplate] = useState('');
    const [unlockedThemes, setUnlockedThemes] = useState<string[]>([]);

    const user = useUserStore((state) => state.user);

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
                    const cleaned = student.profile.unlocked.filter(
                        (n: string) => n
                    );
                    setUnlockedThemes(cleaned);
                }
            }
        }
        fetchThemes();
    }, [user]);

    return (
        <>
            {/* ——————— Main Profile Layout ——————— */}
            <div className={styles.profileContainer}>
                <div className={styles.leftSide}>
                    <div className={styles.nameContainer}>
                        <p className={styles.nameTag}>{nameplate}</p>
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
                </div>
            </div>

            {/* ——————— Color Picker Modal ——————— */}
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

            {/* ——————— Badge Modal ——————— */}
            {isBadgeModalOpen && (
                <BadgeModal
                    selectedBadges={[]}
                    setSelectedBadges={() => {}}
                    badgesEarned={[]}
                    onClose={() => setIsBadgeModalOpen(false)}
                />
            )}
        </>
    );
}
