import Image from 'next/image';
import styles from '../game.module.css';
import { SceneProp } from '@/types/Game';
import { useState } from 'react';

const ChoicesOverlay = ({ scene }: SceneProp) => {
    const action = scene.actions[0];
    const choices = action.choices;
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
                            alt={`Character ${index + 1}`}
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
                                alt={`Character ${index + 2}`}
                            />
                        ))}
                </div>
                <div className={styles.choicesOverlay}>
                    <div>
                        <p className={styles.question}> What would you do?</p>
                        <div className={styles.choices}>
                            {/* <button className={styles.choiceButton}>
                                {' '}
                                Choice 1
                            </button>
                            <button className={styles.choiceButton}>
                                {' '}
                                Choice 2
                            </button>
                            <button className={styles.choiceButton}>
                                {' '}
                                Choice 3
                            </button>
                            <button className={styles.choiceButton}>
                                {' '}
                                Choice 4
                            </button> */}

                            {choices.map((choice, index) => (
                                <button
                                    key={index}
                                    className={styles.choiceButton}
                                >
                                    {choice.text}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChoicesOverlay;
