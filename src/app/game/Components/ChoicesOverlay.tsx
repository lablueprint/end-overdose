import Image from 'next/image';
import styles from '../game.module.css';
import { SceneProp } from '@/types/Game';
import { useState, useEffect } from 'react';
import { useGameStore } from '@/store/gameStore';
import { useRef } from 'react';

interface ChoicesOverlayProps {
    scene: Scene;
    currentScore: number;
    setCurrentScore: (score: number) => void;
    totalQuestions: number;
    setTotalQuestions: (total: number) => void;
    missedQuestions: Question[];
    setMissedQuestions: (missed: Question[]) => void;
}

interface Question {
    question: string;
    correctAnswer: number | string;
    selectedAnswer: number | string | null;
    isCorrect: boolean;
    allChoices: string[];
}

const ChoicesOverlay = ({
    scene,
    currentScore,
    setCurrentScore,
    totalQuestions,
    setTotalQuestions,
    missedQuestions,
    setMissedQuestions,
}: ChoicesOverlayProps) => {
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
        // Prevent repeated attempts on the same wrong answer
        if (incorrectChoices.includes(choiceIndex)) {
            return;
        }

        const choice = action.choices[choiceIndex];
        const correctChoiceIndex = action.choices.findIndex(
            (c) => c.nextScene !== 'Wrong Action'
        );

        const correctChoiceText =
            action.choices[correctChoiceIndex]?.text || '';
        const selectedChoiceText = action.choices[choiceIndex]?.text || '';
        const isCorrect = choiceIndex === correctChoiceIndex;

        // If this is the first answer to this question
        if (!hasCountedThisQuestion) {
            setTotalQuestions(totalQuestions + 1);
            setHasCountedThisQuestion(true);

            // Mark the question as failed if it's wrong
            if (!isCorrect) {
                hasFailedRef.current = true;
            }

            // If correct and no prior failure, increment score
            if (isCorrect && !hasFailedRef.current) {
                setCurrentScore(currentScore + 1);
            }

            // Record the FIRST attempt (even if it's correct later, don't record again)
            setMissedQuestions((prev) => [
                ...prev,
                {
                    question: action.question,
                    correctAnswer: correctChoiceText,
                    selectedAnswer: selectedChoiceText,
                    isCorrect: isCorrect && !hasFailedRef.current,
                    allChoices: action.choices.map((c) => c.text),
                },
            ]);
        }

        // Track incorrect attempts visually
        if (!isCorrect) {
            setIncorrectChoices([...incorrectChoices, choiceIndex]);
        }

        // Move to next scene or show feedback dialogue
        if (choice.nextDialogue) {
            setCustomDialogue(choice.nextDialogue);
            setPendingScene(choice.nextScene || 'resultScene');
            toggleDialogue();
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
                {/* <div className={styles.blurredPeopleGroup1}>
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
                </div> */}
                <div className={styles.choicesOverlay}>
                    <div>
                        {/* <p className={styles.question}> What would you do?</p> */}
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
