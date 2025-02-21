import { useState } from 'react';

interface ClickableDialogueProps {
    xPos: number;
    yPos: number;
}

const ClickableDialogue = ({ xPos, yPos }: ClickableDialogueProps) => {
    const [dialogueIndex, setDialogueIndex] = useState(0);

    const dialogueArray = [
        'Hello there! Welcome to my wonderful game. Click on the chat box above to progress the dialogue',
        'Inside here, you will find a countless number of cool and exciting opportunities (click again)',
        "So have fun, and explore! (click again (I won't keep warning you to click again after this))",
        'This is the final text in this dialogue (try clicking, I dare you',
    ];

    const handleClick = () => {
        if (dialogueIndex != dialogueArray.length - 1)
            setDialogueIndex(dialogueIndex + 1);
    };

    return (
        <div
            style={{
                position: 'absolute',
                bottom: `${yPos}px`,
                left: `${xPos}px`,
            }}
        >
            <button
                style={{
                    width: '200px',
                    height: '100px',
                    color: 'black',
                    backgroundColor: 'white',
                }}
                onClick={handleClick}
            >
                {dialogueArray[dialogueIndex]}
            </button>
        </div>
    );
};

export default ClickableDialogue;
