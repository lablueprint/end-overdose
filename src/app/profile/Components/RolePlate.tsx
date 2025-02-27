'use client';

import React, { useState } from 'react';

/* Notes:
    Component for maintaining look of the "role" subtitle under the main name
    Takes in role prop (string) from page
  */

interface rolePlateProps {
    role: string;
}

const RolePlate = ({ role }: rolePlateProps) => {
    // child
    return (
        <div>
            <p>Logged in as: {role} </p>
        </div>
    );
};

export default RolePlate;
