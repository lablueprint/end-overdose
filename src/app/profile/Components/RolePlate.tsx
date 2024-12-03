'use client';

import React, { useState } from 'react';
import './profileStyles.css';

/* Notes:
    Component for maintaining look of the "role" subtitle under the main name
  */

interface rolePlateProps {
    role: string;
}

const RolePlate = ({ role }: rolePlateProps) => {
    // child
    return (
        <div>
            <p> {role} </p>
        </div>
    );
};

export default RolePlate;
