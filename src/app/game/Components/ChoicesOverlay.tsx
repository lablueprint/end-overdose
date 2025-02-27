import Image from 'next/image';
import styles from '../game.module.css';

const ChoicesOverlay = () => {
    return (
        <div className={styles.pageContainer}>
            <div className={styles.gameContainer}>
                <div className={styles.peopleGroup}>
                    <Image
                        src="/person_asset.png"
                        width={130}
                        height={350}
                        alt="Character 1 "
                        className={styles.blurredImage}
                    />
                </div>
                <div className={styles.peopleGroup}>
                    <Image
                        src="/person_asset.png"
                        width={130}
                        height={350}
                        alt="Character 1 "
                        className={styles.blurredImage}
                    />
                    <Image
                        src="/person_asset.png"
                        width={130}
                        height={350}
                        alt="Character 1 "
                        className={styles.blurredImage}
                    />
                </div>
                <div className={styles.choicesOverlay}>
                    <div>
                        <p className={styles.question}> What would you do?</p>
                        <div className={styles.choices}>
                            <button className={styles.choiceButton}>
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
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChoicesOverlay;
