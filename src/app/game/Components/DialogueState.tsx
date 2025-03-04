import Image from 'next/image';
import styles from '../game.module.css';
import { SceneProp } from '@/types/Game';
import { useState } from 'react';
import { useGameStore } from '@/store/gameStore';

export default function DialogueState({ scene }: SceneProp) {
    const [dialogueIndex, setDialogueIndex] = useState(0);
    const toggleDialogue = useGameStore((state) => state.toggleDialogue);

    console.log('dialogueIndex: ', dialogueIndex);
    console.log('dialogue name: ', scene.dialogue[dialogueIndex].name);
    console.log('dialogue text: ', scene.dialogue[dialogueIndex].text);

    const goToNextDialogue = () => {
        if (dialogueIndex < scene.dialogue.length - 1) {
            setDialogueIndex(dialogueIndex + 1);
        } else {
            toggleDialogue();
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
            <div className={styles.peopleGroup1}>
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
            <div className={styles.peopleGroup2}>
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
                    <p> {scene.dialogue[dialogueIndex].name} </p>
                </div>
                <div className={styles.dialogueBox}>
                    {' '}
                    {scene.dialogue[dialogueIndex].text}
                </div>
            </div>
        </div>
    );
}
