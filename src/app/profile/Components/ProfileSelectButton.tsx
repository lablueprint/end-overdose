import React, { useState } from 'react';
import styles from '../profile.module.css';

/* Notes:
 * Component for maintaining look of the "role" subtitle under the main name
 * Internally holds list of preset profile pictures called profilePictures (str list)
 *Input picIndex argument determines which picture out of the list is displayed.
 * onClick reflected in frontend changed picIndex held in page state
 * picIndex passed from page component
 * onClick passed from page component
 */

interface profileSelectButtonProps {
    picIndex: number;
    onClick: (picIndex: number) => void;
}

const ProfileSelectButton = ({
    picIndex,
    onClick,
}: profileSelectButtonProps) => {
    const profilePictures = [
        '/sadcat.png',
        '/happycat.png',
        '/normalcat.png',
        '/normal.jpg',
        '/discordgrey.png',
    ];

    const handleClick = () => {
        onClick(picIndex);
    };

    // child
    return (
        <div className={styles.profileSelectButton}>
            <img
                src={profilePictures[picIndex]}
                width={50}
                height={50}
                alt="Profile Picture"
                onClick={handleClick}
            />{' '}
        </div>
    );
};

export default ProfileSelectButton;
