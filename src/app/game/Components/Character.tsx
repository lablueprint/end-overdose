import { useState, useEffect } from 'react';

function Character() {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const maxX = 450; // Define the game frame limit
    const speed = 10;

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            setPosition((prev) => {
                let newX = prev.x;

                if (e.key === 'ArrowLeft') {
                    newX = prev.x - speed;
                    if (newX < 0) newX = maxX; // Wrap around when going left
                } else if (e.key === 'ArrowRight') {
                    newX = prev.x + speed;
                    if (newX > maxX) newX = 0; // Wrap around when going right
                }

                return { ...prev, x: newX };
            });
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, []); // No dependencies needed since we use the functional updater

    useEffect(() => {
        console.log(position); // Always logs the updated position
    }, [position]);

    return (
        <div>
            <div
                style={{
                    position: 'absolute',
                    left: `${position.x}px`,
                    bottom: '0',
                    width: '50px',
                    height: '50px',
                    backgroundColor: 'black',
                }}
            ></div>
        </div>
    );
}

export default Character;
