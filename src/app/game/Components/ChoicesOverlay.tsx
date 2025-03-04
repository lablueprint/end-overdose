import Image from 'next/image';
import styles from '../game.module.css';
import { SceneProp } from '@/types/Game';
import { useState, useEffect } from 'react';
import { useGameStore } from '@/store/gameStore';

const ChoicesOverlay = ({ scene }: SceneProp) => {
    const [actionIndex, setActionIndex] = useState(0);
    const [action, setAction] = useState(scene.actions[actionIndex]);
    const changeScene = useGameStore((state) => state.changeScene);
    const toggleDialogue = useGameStore((state) => state.toggleDialogue);

    const [incorrect, setIncorrect] = useState(false);
    const [incorrectChoices, setIncorrectChoices] = useState<number[]>([]);

    useEffect(() => {
        setAction(scene.actions[actionIndex]);
    }, [actionIndex, scene.actions]);

    const evalAnswer = (choiceIndex: number) => {
        // Check if their answer choice was correct
        if (action.choices[choiceIndex].nextScene === 'Wrong Action') {
            // if incorrect
            setIncorrectChoices((prev) => [...prev, choiceIndex]); // Add incorrect choice to the list
            setIncorrect(true);
            return;
        }

        // If answer choice was correct
        setIncorrectChoices([]);
        setIncorrect(false);
        if (actionIndex < scene.actions.length - 1) {
            setActionIndex(actionIndex + 1);
        } else {
            toggleDialogue();
            changeScene(action.choices[choiceIndex].nextScene);
        }
    };

    return (
        <div className={styles.pageContainer}>
            <div className={styles.gameContainer}>
                <div className={styles.background}>
                    <Image
                        src={scene.background}
                        alt="Background"
                        fill
                        className={styles.blurredImage}
                    />
                </div>
                <div className={styles.blurredPeopleGroup1}>
                    {scene.characters.slice(0, 1).map((character, index) => (
                        <Image
                            key={index}
                            src={character.avatar || '/placeholder.svg'}
                            width={130}
                            height={350}
                            alt={character.name}
                        />
                    ))}
                </div>
                <div className={styles.blurredPeopleGroup2}>
                    {scene.characters
                        .slice(1) // From the second character onwards until the end
                        .map((character, index) => (
                            <Image
                                key={index}
                                src={character.avatar || '/placeholder.svg'}
                                width={130}
                                height={350}
                                alt={character.name}
                            />
                        ))}
                </div>
                <div className={styles.choicesOverlay}>
                    <div>
                        <p className={styles.question}> What would you do?</p>
                        <div className={styles.choices}>
                            {action &&
                                action.choices.map((choice, index) => (
                                    <button
                                        key={index}
                                        className={`${styles.choiceButton} ${
                                            incorrectChoices.includes(index)
                                                ? styles.incorrectChoice
                                                : ''
                                        }`}
                                        onClick={() => evalAnswer(index)}
                                    >
                                        {choice.text}
                                    </button>
                                ))}
                        </div>
                        <div className={styles.incorrect}>
                            {incorrect ? (
                                <p className={styles.incorrectText}>
                                    That answer is incorrect
                                </p>
                            ) : (
                                <p></p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChoicesOverlay;
