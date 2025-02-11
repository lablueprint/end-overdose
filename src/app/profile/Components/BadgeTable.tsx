'use client';

import React, { useState, useEffect } from 'react';
import styles from '../profile.module.css';
import Badge from './Badge';

/* NO ARGUMENTS
 *
 * Notes
 *
 * Component for holding badges and handling earned/unearned appearance
 * Internally, badgeTable internally holds (and in the future fetches) a list of all available badges called badgeList (str list)
 *  and a list of the earned badges, badgesEarned (str list).
 */

const BadgeTable = () => {
    const [badgeList, setBadgeList] = useState([
        //TODO: FETCH FORM DATABASE
        'Badge 1',
        'Badge 2',
        'Badge 3',
    ]);

    const [badgesEarned, setBadgesEarned] = useState(['Badge 1', 'Badge 3']);

    const listValues = badgeList.map((badge: string) =>
        badgesEarned.includes(badge) ? (
            <Badge key={badge} badgeTitle={badge} isActive={true} />
        ) : (
            <Badge key={badge} badgeTitle={badge} isActive={false} />
        )
    );

    return <div className={styles.badgeTable}>{listValues}</div>;
};

export default BadgeTable;
