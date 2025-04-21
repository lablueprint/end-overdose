import Image from 'next/image';
import styles from '../game.module.css';
import { SceneProp } from '@/types/Game';
import { useState, useEffect } from 'react';
import { useGameStore } from '@/store/gameStore';
import { useRef } from 'react';

const ChoicesOverlay = ({ scene }: SceneProp) => {
    const [actionIndex, setActionIndex] = useState(0);
    const [action, setAction] = useState(() => scene.actions?.[0]);
    const changeScene = useGameStore((state) => state.changeScene);
    const toggleDialogue = useGameStore((state) => state.toggleDialogue);
    const setCustomDialogue = useGameStore((state) => state.setCustomDialogue);
    const setPendingScene = useGameStore((state) => state.setPendingScene);

    const [incorrect, setIncorrect] = useState(false);
    const incorrectChoices = useGameStore((state) => state.incorrectChoices);
    const setIncorrectChoices = useGameStore(
        (state) => state.setIncorrectChoices
    );
    useEffect(() => {
        setAction(scene.actions[actionIndex]);
        setHasCountedThisQuestion(false);
        hasFailedRef.current = false;
    }, [actionIndex, scene.actions]);

    const incrementCorrect = useGameStore((state) => state.incrementCorrect);
    const incrementTotal = useGameStore((state) => state.incrementTotal);
    const [hasCountedThisQuestion, setHasCountedThisQuestion] = useState(false);

    const hasFailedRef = useRef(false);

    const evalAnswer = (choiceIndex: number) => {
        if (incorrectChoices.includes(choiceIndex)) {
            return; // already tried this one, ignore
        }

        const choice = action.choices[choiceIndex];

        if (!hasCountedThisQuestion) {
            incrementTotal();
            setHasCountedThisQuestion(true);
        }

        if (choice.nextDialogue) {
            setCustomDialogue(choice.nextDialogue);

            if (choice.nextScene === 'Wrong Action') {
                setIncorrectChoices([...incorrectChoices, choiceIndex]);
                hasFailedRef.current = true;
                toggleDialogue();
            } else {
                if (!hasFailedRef.current && hasCountedThisQuestion) {
                    incrementCorrect(); //only count if no earlier mistake
                }
                setPendingScene(choice.nextScene || 'resultScene');
                toggleDialogue();
            }
        } else {
            changeScene(choice.nextScene || 'resultScene');
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
