import Image from 'next/image';
import styles from '../game.module.css';

const NewDialogueState = () => {
    return (
        <div className={styles.gameContainer}>
            <div className={styles.peopleGroup}>
                <Image
                    src="/person_asset.png"
                    width={130}
                    height={350}
                    alt="Character 1 "
                />
            </div>
            <div className={styles.peopleGroup}>
                <Image
                    src="/person_asset.png"
                    width={130}
                    height={350}
                    alt="Character 1 "
                />
                <Image
                    src="/person_asset.png"
                    width={130}
                    height={350}
                    alt="Character 1 "
                />
            </div>
            <div className={styles.textSpacing}>
                <div className={styles.characterName}>
                    <p> Character Name </p>
                </div>
                <div className={styles.dialogueBox}>
                    {' '}
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    eget volutpat orci. Sed in nibh placerat, aliquet justo
                    quis, semper diam. Vestibulum at tortor aliquam, tincidunt
                    orci quis, scelerisque dui. Duis sit amet ornare arcu, quis
                    finibus felis. Nunc quis nisl ut dolor posuere blandit.
                    Morbi vulputate lobortis quam, non tempor arcu sollicitudin
                    eget. Donec in enim viverra, scelerisque risus nec, molestie
                    nisi.
                </div>
            </div>
        </div>
    );
};

export default NewDialogueState;
