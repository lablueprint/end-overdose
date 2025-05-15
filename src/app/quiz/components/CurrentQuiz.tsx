import Mcq from './Mcq';
import TrueFalse from './TrueFalse';

interface CurrentQuizProps {
    quiz: number;
}

export default function CurrentQuiz({ quiz }: CurrentQuizProps) {
    switch (quiz) {
        case 0:
            return (
                <TrueFalse
                    title="What are Opioids?"
                    description="Testing what you've learned about opioids."
                    quizIndex={0}
                    quizName={quiz}
                />
            );
        case 1:
            return (
                <Mcq
                    title="What is Fentanyl?"
                    description="Proving what you know about the drug Fentanyl."
                    quizIndex={0}
                    quizName={quiz}
                />
            );
        case 2:
            return (
                <TrueFalse
                    title="What is Opioid Overdose"
                    description="Checking what you will do in case of an emergency."
                    quizIndex={1}
                    quizName={quiz}
                />
            );
        case 3:
            return (
                <Mcq
                    title="What is Naloxone"
                    description="Making sure you are prepared to save lives."
                    quizIndex={1}
                    quizName={quiz}
                />
            );
    }
}
