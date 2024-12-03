'use client';

import React, { useState, useEffect } from 'react';
import './profileStyles.css';
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

    /**   useEffect(() => {
        for (let i = 0; i < badgesEarned.length; i++) {
            setBadgeList(new Map(badgeList).set(badgesEarned[i], true));
        }
    }, [badgesEarned]); */

    const listValues = badgeList.map((badge: string) =>
        badgesEarned.includes(badge) ? (
            <Badge key={badge} badgeTitle={badge} isActive={true} />
        ) : (
            <Badge key={badge} badgeTitle={badge} isActive={false} />
        )
    );

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                margin: '20px',
            }}
        >
            <h1 style={{ fontSize: 24, marginBottom: '10px' }}> Badges </h1>
            <div className="badge-table">{listValues}</div>
        </div>
    );
};

export default BadgeTable;
