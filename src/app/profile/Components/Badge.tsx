import {
    Description,
    Dialog,
    DialogPanel,
    DialogTitle,
} from '@headlessui/react';
import { useState } from 'react';
import styles from '../profile.module.css';

/**
 * Notes:
 *
 * THREE ARGUMENTS: badgetitle, isActive, disableModal
 *
 *
 * Badge element that table is constructed with
 * badgeTitle is the name of the badge,
 * isActive represents whether or not the player has the badge.
 * An active badge currently displays as gold with gold text, while an inactive badge is greyed out.
 * The badgeTitle displays below the badge.
 *
 * disableModal is for when you do not want the info modal to pop up, such as the badge selection modal in the showcase of profiles. It is a boolean value.
 *
 * Each badge contains a dialog, which is the modal with an explanation of how to get the badge. C
 * urrently the badge description is basic lorem ipsum.
 *
 * Find documentation for the modal at https://headlessui.com/react/dialog
 *
 * NOTE: Currently using older, worst <img> tag because onClick seems to be faulty on <Image>. May be worth investigation
 */

interface BadgeProps {
    badgeTitle: string;
    isActive: boolean;
    disableModal?: boolean;
}

const Badge = ({ badgeTitle, isActive, disableModal }: BadgeProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const badgeDescription =
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

    const handleClick = () => {
        if (!disableModal) setIsOpen(true);
    };

    return (
        <div className={styles.badgeContainer}>
            <div
                className={styles.badgeCircle}
                style={{ backgroundColor: isActive ? 'gold' : 'grey' }} //Changes background color of badge dependent on active state
                onClick={() => handleClick}
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
};

export default Badge;
