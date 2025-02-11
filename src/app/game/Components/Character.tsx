import { useState, useEffect } from 'react';
import { useGameStore } from '@/store/gameStore';

function Character() {
    const maxX = 450; // Define the maximum x value of the character (calculated by gamecanvas size - character size)
    const minX = 0; //Define the minimum x value possible to be within the confines of the gamecanvas
    const speed = 10;

    const sceneIndex = useGameStore((state) => state.sceneIndex);
    const prevScene = useGameStore((state) => state.prevScene);
    const nextScene = useGameStore((state) => state.nextScene);
    const position = useGameStore((state) => state.position);
    const moveCharacter = useGameStore((state) => state.moveCharacter);
    const sceneNum = useGameStore((state) => state.sceneNum);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowLeft') {
                if (position.x == minX) {
                    if (sceneIndex == 0) {
                        return;
                    } else {
                        moveCharacter(maxX, 0);
                        prevScene();
                    }
                } else {
                    moveCharacter(speed * -1, 0);
                }
            } else if (e.key === 'ArrowRight') {
                if (position.x == maxX) {
                    if (sceneIndex == sceneNum - 1) {
                        return;
                    } else {
                        moveCharacter(maxX * -1, 0);
                        nextScene();
                    }
                } else {
                    moveCharacter(speed, 0);
                }
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [position, moveCharacter, nextScene, prevScene, sceneIndex, sceneNum]); // No dependencies needed since we use the functional updater

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
