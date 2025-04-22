import {
    Description,
    Dialog,
    DialogPanel,
    DialogTitle,
    DialogBackdrop,
} from '@headlessui/react';
import '../styles.css';
import { useState } from 'react';
interface FeedbackProps {
    question: string;
    feedback: string;
    currentQuestionIndex: number;
    numQuestions: number;
    setSelectedAnswer: (newSelectedAnswer: number | null) => void;
    setIsQuestionSelected: (newIsQuestionSelected: boolean) => void;
    setFeedback: (newFeedback: string) => void;
    setCurrentQuestionIndex: (currentQuestionIndex: number) => void;
}

export default function Feedback({
    question,
    feedback,
    currentQuestionIndex,
    numQuestions,
    setSelectedAnswer,
    setIsQuestionSelected,
    setFeedback,
    setCurrentQuestionIndex,
}: FeedbackProps) {
    const [isOpen, setIsOpen] = useState(true);

    const onContinue = () => {
        if (currentQuestionIndex < numQuestions - 1) {
            setSelectedAnswer(null);
            setIsQuestionSelected(false);
            setFeedback('');
        }
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        console.log('currentQuestionIndex: ', currentQuestionIndex);
        setIsOpen(false);
    };

    return (
        <>
            <Dialog open={isOpen} onClose={onContinue} className="relative">
                <DialogBackdrop className="fixed inset-0 bg-black/30" />
                <div className="dialog-container">
                    <DialogPanel className="max-w-lg space-y-4 border bg-white p-12 rounded-lg shadow-lg">
                        <DialogTitle
                            className={`feedback ${feedback === 'Wrong!' ? 'wrong' : 'correct'}`}
                        >
                            {feedback}
                        </DialogTitle>
                        <Description>Question: {question}</Description>
                        <div className="continue-container">
                            <button onClick={onContinue}>Continue</button>
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>
        </>
    );
}
