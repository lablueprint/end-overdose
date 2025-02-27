import Image from 'next/image';
import styles from '../game.module.css';
import { SceneProp } from '@/types/Game';
import { useState } from 'react';

export default function DialogueState({ scene }: SceneProp) {
    const [speakerIndex, setSpeakerIndex] = useState(0);
    const [dialogueIndex, setDialogueIndex] = useState(0);

    const goToNextDialogue = () => {
        if (
            dialogueIndex <
            scene.characters[speakerIndex].dialogue.length - 1
        ) {
            setDialogueIndex(dialogueIndex + 1);
        } else if (speakerIndex < scene.characters.length - 1) {
            setSpeakerIndex(speakerIndex + 1);
            setDialogueIndex(0);
        }
    };

    return (
        <div className={styles.gameContainer} onClick={goToNextDialogue}>
            <div className={styles.background}>
                <Image
                    src={scene.background}
                    alt="Background"
                    fill
                    style={{ objectFit: 'cover' }}
                />
            </div>
            <div className={styles.peopleGroup}>
                {scene.characters.slice(0, 1).map((character, index) => (
                    <Image
                        key={index}
                        src={character.avatar || '/placeholder.svg'}
                        width={130}
                        height={350}
                        alt={`Character ${index + 1}`}
                    />
                ))}
            </div>
            <div className={styles.peopleGroup}>
                {scene.characters
                    .slice(1) // From the second character onwards until the end
                    .map((character, index) => (
                        <Image
                            key={index}
                            src={character.avatar || '/placeholder.svg'}
                            width={130}
                            height={350}
                            alt={`Character ${index + 2}`}
                        />
                    ))}
            </div>
            <div className={styles.textSpacing}>
                <div className={styles.characterName}>
                    <p> {scene.characters[speakerIndex].name} </p>
                </div>
                <div className={styles.dialogueBox}>
                    {' '}
                    {scene.characters[speakerIndex].dialogue[dialogueIndex]}
                </div>
            </div>
        </div>
    );
}
