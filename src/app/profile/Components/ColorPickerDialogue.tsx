'use client';

import { Dialog, Transition } from '@headlessui/react';
import styles from '../profile.module.css';
import { useUserStore } from '@/store/userStore';
import { useState } from 'react';
import { Fragment } from 'react';
import Image from 'next/image';
import { changeBackground, changeCat } from '@/app/api/students/actions';

/**
 * Notes:
 *
 * Six Arguments: isOpen, setIsOpen, selectedColor, setSelectedColor, selectedBackground, setSelectedBackground, selectedCat, setSelected Cat
 *
 * selectedBadges is the current list of badges that is selected. Currently does not have a limit of above 3. It is passed down from parent, but not held in global state.
 * We should review if this is best pracitce.
 *
 * Arguments are self explanatory and all are passed down from parent.
 *
 * TODO:
 * Store changes in database for user reflecting change in background, cat, and color.
 */

interface ColorPickerDialogProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    selectedColor: string;
    setSelectedColor: (color: string) => void;
    selectedCat: string;
    setSelectedCat: (cat: string) => void;
    selectedBackground: string;
    setSelectedBackground: (background: string) => void;
    unlockedThemes: string[];
}

export default function ColorPickerDialog({
    isOpen,
    setIsOpen,
    selectedColor,
    selectedBackground,
    setSelectedBackground,
    selectedCat,
    setSelectedCat,
    unlockedThemes,
}: ColorPickerDialogProps) {
    const [unlockedCats, setUnlockedCats] = useState<string[]>([]);
    const backgrounds = unlockedThemes.map(
        (name) => `/backgrounds/${name}-profile.png`
    );
    const cats = unlockedThemes.map((name) => `/cats/${name}.png`);
    const user = useUserStore((state) => state.user);
    const handleChangeBackground = async (bg: string) => {
        if (!user || !('student_id' in user)) return;

        const backgroundName = bg.split('/').pop()?.split('-')[0];
        await changeBackground(user.student_id, backgroundName || '');
    };

    const handleChangeCat = async (cat: string) => {
        if (!user || !('student_id' in user)) return;

        const name = cat.split('/').pop()?.split('.')[0];
        await changeCat(user.student_id, name || '');
        console.log(name);
    };

    return (
        <Transition show={isOpen} as={Fragment}>
            <div className={styles.introText}>Edit Profile</div>
            <Dialog
                as="div"
                className={styles.dialogContainer}
                onClose={() => setIsOpen(false)}
            >
                <div className={styles.dialog}>
                    <div className={styles.introText}>EDIT PROFILE</div>
                    {/* Close Button */}
                    <div className={styles.description}>
                        {' '}
                        Personalize your Narcat&apos;s look with fun outfits and
                        backgrounds that match your vibe!
                    </div>
                    <div className={styles.dialogContent}>
                        {/* Left Side: Large Preview */}
                        <div className={styles.leftDialog}>
                            <div
                                className={styles.colorPreview}
                                style={{ backgroundColor: selectedColor }}
                            >
                                {selectedBackground && (
                                    <Image
                                        src={selectedBackground}
                                        alt="Background"
                                        width={0}
                                        height={0}
                                        sizes="100vw"
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                        }}
                                    />
                                )}
                                {selectedCat && (
                                    <Image
                                        src={selectedCat}
                                        alt="Cat Overlay"
                                        fill
                                        sizes="(max-width: 768px) 33vw, 100px"
                                        priority
                                        className={styles.previewCat}
                                    />
                                )}
                            </div>
                        </div>

                        {/* Right Side: Grid Selectors */}
                        <div className={styles.rightDialog}>
                            <div className={styles.gridOptions}>
                                {/* COLORS */}
                                {/* <div>
                                    <h3 className={styles.gridLabel}>Colors</h3>
                                    <div className={styles.colorGrid}>
                                        {colors.map((color, index) => (
                                            <button
                                                key={index}
                                                className={styles.colorSquare}
                                                style={{
                                                    backgroundColor: color,
                                                }}
                                                onClick={() =>
                                                    setSelectedColor(color)
                                                }
                                            />
                                        ))}
                                    </div>
                                </div> */}

                                {/* BACKGROUNDS */}
                                <div>
                                    <h3 className={styles.gridLabel}>
                                        BACKGROUNDS
                                    </h3>
                                    <div className={styles.backgroundGrid}>
                                        {backgrounds.map((bg, index) => (
                                            <button
                                                key={index}
                                                className={[
                                                    styles.imageSquare,
                                                    bg === selectedBackground &&
                                                        styles.imageSquareSelected,
                                                ]
                                                    .filter(Boolean)
                                                    .join(' ')}
                                                onClick={async () => {
                                                    setSelectedBackground(bg);
                                                    await handleChangeBackground(
                                                        bg
                                                    );
                                                }}
                                            >
                                                <Image
                                                    src={bg.replace(
                                                        /-profile(\.\w+)$/,
                                                        '-thumbnail$1'
                                                    )}
                                                    alt={`Background ${index}`}
                                                    width={100}
                                                    height={100}
                                                    className={
                                                        styles.backgroundButton
                                                    }
                                                />
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* CATS */}
                                <div>
                                    <h3 className={styles.gridLabel}>
                                        NARCAT AVATARS
                                    </h3>
                                    <div className={styles.catGrid}>
                                        {cats.map((cat, index) => (
                                            <button
                                                key={index}
                                                className={[
                                                    styles.imageSquare,
                                                    cat === selectedCat &&
                                                        styles.imageSquareSelected,
                                                ]
                                                    .filter(Boolean)
                                                    .join(' ')}
                                                onClick={async () => {
                                                    setSelectedCat(cat);
                                                    await handleChangeCat(cat);
                                                }}
                                            >
                                                <Image
                                                    src={cat}
                                                    alt={`Cat ${index}`}
                                                    width={100}
                                                    height={100}
                                                    className={styles.catButton}
                                                />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Close Button */}
                        <button
                            className={styles.closeButton}
                            onClick={() => setIsOpen(false)}
                        >
                            Save
                        </button>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}
