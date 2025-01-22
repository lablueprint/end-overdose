import React, { useState } from 'react';
import styles from '../profile.module.css';

/* Notes:
    Component for maintaining look of the "role" subtitle under the main name
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
