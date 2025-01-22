import Image from 'next/image';
import {
    Description,
    Dialog,
    DialogPanel,
    DialogTitle,
} from '@headlessui/react';
import { useState } from 'react';
import styles from '../profile.module.css';

/**
 * Badge element that table is constructed with
 */

interface BadgeProps {
    badgeTitle: string;
    isActive: boolean;
}

const Badge = ({ badgeTitle, isActive }: BadgeProps) => {
    // child
    const [isOpen, setIsOpen] = useState(false);

    const badgeDescription =
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
    if (isActive) {
        return (
            <div>
                <img
                    src={'/badge.png'}
                    width={50}
                    height={50}
                    alt="Badge Image"
                    onClick={() => setIsOpen(true)}
                />
                <Dialog
                    open={isOpen}
                    onClose={() => setIsOpen(false)}
                    className={styles.badgeDialog}
                >
                    <div className={styles.badgeDialogPanelContainer}>
                        <DialogPanel className={styles.badgeDialogPanel}>
                            <DialogTitle className={styles.badgeDialogTitle}>
                                {badgeTitle}
                            </DialogTitle>
                            <Description>{badgeDescription}</Description>
                            <button
                                onClick={() => setIsOpen(false)}
                                className={styles.badgeDialogCloseButton}
                            >
                                Close
                            </button>
                        </DialogPanel>
                    </div>
                </Dialog>
                <p className={styles.inactiveText}>{badgeTitle}</p>
            </div>
        );
    } else {
        return (
            <div>
                <img
                    src={'/badge-grey.jpeg'}
                    width={50}
                    height={50}
                    alt="Badge Image"
                    onClick={() => setIsOpen(true)}
                />
                <Dialog
                    open={isOpen}
                    onClose={() => setIsOpen(false)}
                    className={styles.badgeDialog}
                >
                    <div className={styles.badgeDialogPanelContainer}>
                        <DialogPanel className={styles.badgeDialogPanel}>
                            <DialogTitle className={styles.badgeDialogTitle}>
                                {badgeTitle}
                            </DialogTitle>
                            <Description>{badgeDescription}</Description>
                            <button
                                onClick={() => setIsOpen(false)}
                                className={styles.badgeDialogCloseButton}
                            >
                                Close
                            </button>
                        </DialogPanel>
                    </div>
                </Dialog>
                <p className={styles.inactiveText}>{badgeTitle}</p>
            </div>
        );
    }
};

export default Badge;
