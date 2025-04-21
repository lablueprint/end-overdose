import Image from 'next/image';
import styles from '../game.module.css';
import { useState, useEffect } from 'react';
import { useGameStore } from '@/store/gameStore';

export default function DialogueState() {
    const scene = useGameStore((state) => state.currScene);
    const customDialogue = useGameStore((state) => state.customDialogue);
    const setCustomDialogue = useGameStore((state) => state.setCustomDialogue);
    const pendingScene = useGameStore((state) => state.pendingScene);
    const setPendingScene = useGameStore((state) => state.setPendingScene);
    const changeScene = useGameStore((state) => state.changeScene);
    const toggleDialogue = useGameStore((state) => state.toggleDialogue);

    const dialogue = useGameStore(
        (state) => state.customDialogue ?? state.currScene.dialogue
    );
    const [dialogueIndex, setDialogueIndex] = useState(0);

    useEffect(() => {
        setDialogueIndex(0);
    }, [customDialogue]);

    const goToNextDialogue = () => {
        if (dialogueIndex < dialogue.length - 1) {
            setDialogueIndex(dialogueIndex + 1);
        } else {
            setDialogueIndex(0);
            toggleDialogue(); // Always toggle back to choices

            if (pendingScene) {
                changeScene(pendingScene); //go to new scene if it's correct
                setPendingScene(null);
            }

            setCustomDialogue(null); // Always clear the feedback dialogue
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
            {/* <div className={styles.peopleGroup1}>
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
            </div> */}
            {/* <div className={styles.textSpacing}>
                <div className={styles.characterName}>
                    <p> {scene.dialogue[dialogueIndex].name} </p>
                </div>
                <div className={styles.dialogueBox}>
                    {' '}
                    {scene.dialogue[dialogueIndex].text}
                </div>
            </div> */}
            <div className={styles.textSpacing}>
                <div className={styles.dialogueBox}>
                    <div className={styles.avatarSection}>
                        <Image
                            src={
                                scene.characters[
                                    dialogueIndex % scene.characters.length
                                ].avatar
                            }
                            alt="Avatar"
                            width={120}
                            height={120}
                            className={styles.avatar}
                        />
                    </div>
                    <div className={styles.textSection}>
                        <div className={styles.characterName}>
                            {dialogue[dialogueIndex].name}
                        </div>
                        <div className={styles.messageText}>
                            {dialogue[dialogueIndex].text}
                        </div>
                    </div>
                    <div className={styles.arrow}>▶</div>
                </div>
            </div>
        </div>
    );
}
