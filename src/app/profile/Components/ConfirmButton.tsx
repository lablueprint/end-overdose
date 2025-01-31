import styles from '../profile.module.css';

/**
 * Component for confirmation button that appears under scrollable list associated with confirming name selection in backend
 */

interface ConfirmButtonProps {
    changesMade: boolean;
    onPress: () => void;
}

const ConfirmButton = ({ changesMade, onPress }: ConfirmButtonProps) => {
    return (
        <div>
            <button
                className={
                    changesMade ? styles.activeConfirm : styles.inactiveConfirm
                }
                onClick={onPress}
            >
                Confirm
            </button>
        </div>
    );
};

export default ConfirmButton;
