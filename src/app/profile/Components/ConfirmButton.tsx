import styles from '../profile.module.css';

/**
 * Component for confirmation button that appears under scrollable list associated with confirming name selection in backend
 */

interface ConfirmButtonProps {
    changesMade: boolean;
    onPress: () => void;
}

const ConfirmButton = ({ changesMade, onPress }: ConfirmButtonProps) => {
    // child
    if (changesMade) {
        return (
            <div>
                <button className={styles.activeConfirm} onClick={onPress}>
                    Confirm
                </button>
            </div>
        );
    } else {
        return (
            <div>
                <button className={styles.inactiveConfirm} onClick={onPress}>
                    Confirm
                </button>
            </div>
        );
    }
};

export default ConfirmButton;
