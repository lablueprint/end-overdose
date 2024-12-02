import React from 'react';
import './profileStyles.css';

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
            <div className="namePlateContainer">
                <p className="selectedNamePlate">{name}</p>
            </div>
        );
    } else {
        return (
            <div className="namePlateContainer">
                <p>{name}</p>
            </div>
        );
    }
};

export default NamePlate;
