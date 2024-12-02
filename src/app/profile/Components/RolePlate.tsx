'use client';

import React, { useState } from 'react';
import './profileStyles.css';

/* Notes:
    Component for maintaining look of the "role" subtitle under the main name
  */

const RolePlate = () => {
    const [userRole, setUserRole] = useState('administrator');

    // child
    return (
        <div>
            <p> {userRole} </p>
        </div>
    );
};

export default RolePlate;
