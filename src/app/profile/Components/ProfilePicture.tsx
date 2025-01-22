'use client';

import React, { useState } from 'react';
import Image from 'next/image';

/*
 * one argument: picIndex (int)
 *
 * Notes:
 *
 * Component for maintaining look of the "role" subtitle under the main name
 *
 * Internally holds list of preset profile pictures called profilePictures (str list)
 *
 * Input picIndex argument determines which picture out of the list is displayed.
 *
 * picIndex passed from page Component
 *
 *
 */

interface profilePictureProps {
    picIndex: number;
}

const ProfilePicture = ({ picIndex }: profilePictureProps) => {
    const profilePictures = [
        '/sadcat.png',
        '/happycat.png',
        '/normalcat.png',
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
