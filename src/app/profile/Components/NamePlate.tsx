import React from 'react';

interface NamePlateProps {
    // interface
    name: string;
}

/* Notes:
      - We want to properly define the types for the props
      - Typical naming conventions for interfaces are:
          {Component Name}Props
  */

const NamePlate = ({ name }: NamePlateProps) => {
    // child
    return (
        <div>
            <p>{name}</p>
        </div>
    );
};

export default NamePlate;
