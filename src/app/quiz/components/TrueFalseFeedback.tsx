import React, { useState, useEffect } from 'react';
import '../styles.css';

interface TrueFalseFeedbackProps {
    answer: boolean;
}

export default function TrueFalseFeedback({ answer }: TrueFalseFeedbackProps) {
    const [feedback, setFeedback] = useState<string>('');
    const [isOpen, setIsOpen] = useState(true);
    const [className, setClassName] = useState<string>(''); // Renamed 'class' to 'className'

    useEffect(() => {
        if (answer) {
            setFeedback('Correct!');
            setClassName('correct-bar');
        } else {
            setFeedback('Incorrect!');
            setClassName('incorrect-bar');
        }
        // const timer = setTimeout(() => {
        //     setIsOpen(false);
        // }, 5000);
        // return () => clearTimeout(timer);
    }, [answer]);

    return (
        isOpen && (
            <div className={className}>
                <p className="feedback-text">{feedback}</p>
            </div>
        )
    );
}
