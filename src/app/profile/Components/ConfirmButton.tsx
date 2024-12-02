import './profileStyles.css';

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
                <button className="activeConfirm" onClick={onPress}>
                    Confirm
                </button>
            </div>
        );
    } else {
        return (
            <div>
                <button className="inactiveConfirm" onClick={onPress}>
                    Confirm
                </button>
            </div>
        );
    }
};

export default ConfirmButton;
