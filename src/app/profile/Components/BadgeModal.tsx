'use client';

import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import Badge from './Badge';
import styles from '../profile.module.css';
import { useState } from 'react';

interface BadgeModalProps {
    selectedBadges: string[];
    setSelectedBadges: (badges: string[]) => void;
    badgesEarned: string[];
    onClose: () => void;
}

const BadgeModal = ({
    selectedBadges,
    setSelectedBadges,
    badgesEarned,
    onClose,
}: BadgeModalProps) => {
    const [selectedBadgeIndex, setSelectedBadgeIndex] = useState<number | null>(
        null
    );

    const handleBadgeClick = (badge: string) => {
        if (selectedBadgeIndex !== null) {
            const updatedBadges = [...selectedBadges];
            updatedBadges[selectedBadgeIndex] = badge;
            setSelectedBadges(updatedBadges);
            setSelectedBadgeIndex(null);
        }
    };

    return (
        <Dialog open={true} onClose={onClose} className={styles.badgeDialog}>
            <div className={styles.badgeDialogOverlay}>
                <DialogPanel className={styles.badgeDialogPanel}>
                    <DialogTitle className={styles.badgeDialogTitle}>
                        Select Badges
                    </DialogTitle>

                    {/* Selected badges section */}
                    <div className={styles.modalSection}>
                        <h3 className={styles.modalSubTitle}>
                            Currently Selected Badges
                        </h3>
                        <div className={styles.badgeTable}>
                            {selectedBadges.map((badge, index) => (
                                <div
                                    key={index}
                                    className={styles.modalBadgeWrapper}
                                    onClick={() => setSelectedBadgeIndex(index)}
                                    style={{
                                        border:
                                            selectedBadgeIndex === index
                                                ? '2px solid blue'
                                                : 'none',
                                        cursor: 'pointer',
                                    }}
                                >
                                    <Badge
                                        badgeTitle={badge}
                                        isActive={true}
                                        disableModal={true}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Earned badges section */}
                    <div className={styles.modalSection}>
                        <h3 className={styles.modalSubTitle}>Earned Badges</h3>
                        <div className={styles.badgeTable}>
                            {badgesEarned.map((badge) => (
                                <div
                                    key={badge}
                                    className={styles.modalBadgeWrapper}
                                    onClick={() => handleBadgeClick(badge)}
                                    style={{
                                        cursor:
                                            selectedBadgeIndex !== null
                                                ? 'pointer'
                                                : 'default',
                                    }}
                                >
                                    <Badge
                                        badgeTitle={badge}
                                        isActive={true}
                                        disableModal={true}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    <button
                        onClick={onClose}
                        className={styles.badgeDialogCloseButton}
                    >
                        Close
                    </button>
                </DialogPanel>
            </div>
        </Dialog>
    );
};

export default BadgeModal;
