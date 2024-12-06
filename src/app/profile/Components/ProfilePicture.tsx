'use client';

import React, { useState } from 'react';
import './profileStyles.css';
import Image from 'next/image';
import { profile } from 'console';

/* Notes:
    Component for maintaining look of the "role" subtitle under the main name
  */

interface profilePictureProps {
    picIndex: number;
}

const ProfilePicture = ({ picIndex }: profilePictureProps) => {
    const profilePictures = [
        '/sadcat.png',
        '/antonio.png',
        '/drake.jpg',
        '/normal.jpg',
        '/discordgrey.png',
    ];
    // child
    return (
        <div>
            <Image
                src={profilePictures[picIndex]}
                width={250}
                height={250}
                style={{ borderRadius: '100%', overflow: 'hidden' }}
                alt="Profile Picture"
            />
        </div>
    );
};

export default ProfilePicture;
