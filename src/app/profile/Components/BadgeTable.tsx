'use client';

/* ONE ARGUMENT: Selected badges is a list of the names of the badges that you have currently selected
 *
 * Notes
 *
 * As of 3/13, Badge Table is just used as a convenient group of badges. This component may become useless in future iterations
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
