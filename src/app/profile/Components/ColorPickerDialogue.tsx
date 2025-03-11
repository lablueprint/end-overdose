'use client';

import { Dialog, Transition } from '@headlessui/react';
import styles from '../profile.module.css';
import { Fragment } from 'react';
import Image from 'next/image';

interface ColorPickerDialogProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    selectedColor: string;
    setSelectedColor: (color: string) => void;
    selectedCat: string;
    setSelectedCat: (cat: string) => void;
    selectedBackground: string;
    setSelectedBackground: (background: string) => void;
}

export default function ColorPickerDialog({
    isOpen,
    setIsOpen,
    selectedColor,
    setSelectedColor,
    selectedBackground,
    setSelectedBackground,
    selectedCat,
    setSelectedCat,
}: ColorPickerDialogProps) {
    const colors: string[] = [
        '#242286',
        '#02B56B',
        '#E9392C78',
        '#00C7AD',
        '#A7CBC9',
        '#CCF500',
        '#ffffff',
    ];

    const backgrounds: string[] = ['/fish.png', '/transparent.png'];

    const cats: string[] = [
        '/birthdaycat.png',
        '/cat.png',
        '/cowboycat.png',
        '/piratecat.png',
        '/treasurecat.png',
        '/sophisticatedcat.png',
        '/sadcat.png',
    ];

    return (
        <Transition show={isOpen} as={Fragment}>
            <Dialog
                as="div"
                className={styles.dialogContainer}
                onClose={() => setIsOpen(false)}
            >
                <div className={styles.dialog}>
                    {/* Close Button */}
                    <button
                        className={styles.closeButton}
                        onClick={() => setIsOpen(false)}
                    >
                        X
                    </button>

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
                                <div>
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
                                </div>

                                {/* BACKGROUNDS */}
                                <div>
                                    <h3 className={styles.gridLabel}>
                                        Backgrounds
                                    </h3>
                                    <div className={styles.backgroundGrid}>
                                        {backgrounds.map((bg, index) => (
                                            <button
                                                key={index}
                                                className={styles.imageSquare}
                                                onClick={() =>
                                                    setSelectedBackground(bg)
                                                }
                                            >
                                                <Image
                                                    src={bg}
                                                    alt={`Background ${index}`}
                                                    width={40}
                                                    height={40}
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
                                    <h3 className={styles.gridLabel}>Cats</h3>
                                    <div className={styles.catGrid}>
                                        {cats.map((cat, index) => (
                                            <button
                                                key={index}
                                                className={styles.imageSquare}
                                                onClick={() =>
                                                    setSelectedCat(cat)
                                                }
                                            >
                                                <Image
                                                    src={cat}
                                                    alt={`Cat ${index}`}
                                                    width={40}
                                                    height={40}
                                                    className={styles.catButton}
                                                />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}
