import React, { useState } from 'react';
import dialogueData from './dialogueData';
import { DialogueNode } from './types';
import { NumberColorFormat } from '@faker-js/faker';

interface DialogueTreeProps {
    xPos: number;
    yPos: number;
}

const DialogueTree = ({ xPos, yPos }: DialogueTreeProps) => {
    const [currentNode, setCurrentNode] = useState<DialogueNode>(
        dialogueData[1]
    ); // Start with node 1

    const handleResponseClick = (nextId: number) => {
        if (dialogueData[nextId]) {
            setCurrentNode(dialogueData[nextId]);
        }
    };

    return (
        <div
            style={{
                backgroundColor: 'white',
                width: '200px',
                height: '100px',
                position: 'absolute',
                bottom: `${yPos}px`,
                left: `${xPos}px`,
            }}
        >
            <p>{currentNode.text}</p>

            <div className="responses">
                {currentNode.responses.map((response, index) => (
                    <button
                        key={index}
                        onClick={() => handleResponseClick(response.next)}
                        style={{ borderWidth: '1px', borderColor: 'black' }}
                    >
                        {response.text}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default DialogueTree;
