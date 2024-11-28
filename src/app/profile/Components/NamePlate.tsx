import React from 'react';
import './profileStyles.css';

interface NamePlateProps {
    // interface
    name: string;
    selectedIndex: number;
    index: number;
}

/* Notes:
      - We want to properly define the types for the props
      - Typical naming conventions for interfaces are:
          {Component Name}Props
  */

const NamePlate = ({ name, index, selectedIndex }: NamePlateProps) => {
    // child
    if (index == selectedIndex) {
        return (
            <div style={{ height: '25px' }}>
                <p className="selectedNamePlate">{name}</p>
            </div>
        );
    } else {
        return (
            <div style={{ height: '25px' }}>
                <p>{name}</p>
            </div>
        );
    }
};

export default NamePlate;
