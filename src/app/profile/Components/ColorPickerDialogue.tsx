'use client';

import { Dialog, Transition } from '@headlessui/react';
import styles from '../profile.module.css';
import { Fragment } from 'react';

/* Define TypeScript Props */
interface ColorPickerDialogProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    selectedColor: string;
    setSelectedColor: (color: string) => void;
}

export default function ColorPickerDialog({
    isOpen,
    setIsOpen,
    selectedColor,
    setSelectedColor,
}: ColorPickerDialogProps) {
    const colors: string[] = [
        '#ff0000',
        '#00ff00',
        '#0000ff',
        '#ffff00',
        '#ff00ff',
        '#00ffff',
        '#000000',
        '#ffffff',
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
                        {/* Left Side: Large Color Preview Box */}
                        <div
                            className={styles.colorPreview}
                            style={{ backgroundColor: selectedColor }}
                        ></div>

                        {/* Right Side: Grid of Color Choices */}
                        <div className={styles.colorGrid}>
                            {colors.map((color, index) => (
                                <button
                                    key={index}
                                    className={styles.colorSquare}
                                    style={{ backgroundColor: color }}
                                    onClick={() => setSelectedColor(color)} // Updates Home.tsx state
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}
