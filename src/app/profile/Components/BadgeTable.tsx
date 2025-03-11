'use client';

/* NO ARGUMENTS
 *
 * Notes
 *
 * Component for holding badges and handling earned/unearned appearance
 * Internally, badgeTable internally holds (and in the future fetches) a list of all available badges called badgeList (str list)
 *  and a list of the earned badges, badgesEarned (str list).
 */

import React from 'react';
import styles from '../profile.module.css';
import Badge from './Badge';

const BadgeTable = ({ selectedBadges }: { selectedBadges: string[] }) => {
    const listValues = selectedBadges.map((badge: string) => (
        <Badge key={badge} badgeTitle={badge} isActive={true} />
    ));

    return <div className={styles.badgeTable}>{listValues}</div>;
};

export default BadgeTable;
