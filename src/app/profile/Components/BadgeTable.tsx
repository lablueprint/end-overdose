'use client';

import React, { useState, useEffect } from 'react';
import styles from '../profile.module.css';
import Badge from './Badge';

/* Notes:
    Component for holding badges and handling earned/unearned appearance
  */

const BadgeTable = () => {
    /**const [badgeList, setBadgeList] = useState(
        new Map([
            ['Badge 1', false],
            ['Badge 2', false],
            ['Badge 3', false],
            ['Badge 4', false],
            ['Badge 5', false],
            ['Badge 6', false],
            ['Badge 7', false],
            ['Badge 8', false],
            ['Badge 9', false],
            ['Badge 10', false],
        ])
    ); **/

    const [badgeList, setBadgeList] = useState([
        'Badge 1',
        'Badge 2',
        'Badge 3',
        'Badge 4',
        'Badge 5',
        'Badge 6',
        'Badge 7',
        'Badge 8',
        'Badge 9',
        'Badge 10',
    ]);

    const [badgesEarned, setBadgesEarned] = useState([
        'Badge 1',
        'Badge 3',
        'Badge 7',
        'Badge 9',
        'Badge 10',
    ]);

    const listValues = badgeList.map((badge: string) =>
        badgesEarned.includes(badge) ? (
            <Badge key={badge} badgeTitle={badge} isActive={true} />
        ) : (
            <Badge key={badge} badgeTitle={badge} isActive={false} />
        )
    );

    return (
        <div className={styles.badgeTableContainer}>
            <h1 className={styles.badgeHeader}> Badges </h1>
            <div className={styles.badgeTable}>{listValues}</div>
        </div>
    );
};

export default BadgeTable;
