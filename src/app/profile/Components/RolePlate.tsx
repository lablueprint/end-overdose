'use client';

import React, { useState } from 'react';

/* Notes:
      - We want to properly define the types for the props
      - Typical naming conventions for interfaces are:
          {Component Name}Props
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
