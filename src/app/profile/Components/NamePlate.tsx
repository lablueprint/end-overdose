import React from 'react';
import styles from '../profile.module.css';

interface NamePlateProps {
    // interface
    name: string;
    selectedIndex: number;
    index: number;
}

/* Notes:
     Component for singular name field that scrollable list is constructed with
  */

const NamePlate = ({ name, index, selectedIndex }: NamePlateProps) => {
    // child
    if (index == selectedIndex) {
        return (
            <div className={styles.namePlateContainer}>
                <p className={styles.selectedNamePlate}>{name}</p>
            </div>
        );
    } else {
        return (
            <div className={styles.namePlateContainer}>
                <p>{name}</p>
            </div>
        );
    }
};

export default NamePlate;
