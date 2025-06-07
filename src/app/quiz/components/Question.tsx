'use client';
import { useState } from 'react';
import '../styles.css';

interface QuestionProps {
    question: string;
    answers: string[];
    onAnswerSelected: (answerIndex: number) => void; // Add callback for answer selection
    selectedAnswer: number | null;
    showFeedback: boolean;
    correctAnswer: number;
}

export default function Question({
    question,
    answers,
    onAnswerSelected,
    selectedAnswer,
    showFeedback,
    correctAnswer,
}: QuestionProps) {
    return (
        <>
            <div className="mcq-question-text">{question}</div>

            <div className="answers-container">
                {answers.map((answer, index) => {
                    let className = '';
                    if (!showFeedback) {
                        if (
                            selectedAnswer !== null &&
                            selectedAnswer !== index
                        ) {
                            className = 'greyed';
                        }
                    } else {
                        // After continue is pressed show correct or incorrect
                        if (index === correctAnswer) {
                            className = 'correct';
                        } else if (
                            index === selectedAnswer &&
                            selectedAnswer !== correctAnswer
                        ) {
                            className = 'incorrect';
                        } else {
                            className = 'greyed';
                        }
                    }

                    return (
                        <button
                            key={index}
                            className={className}
                            onClick={() => {
                                if (!showFeedback) {
                                    onAnswerSelected(index);
                                }
                            }}
                            disabled={showFeedback}
                        >
                            <div>
                                <img
                                    className="star-image-center"
                                    src={`/mcq-fish-${index}.svg`}
                                    alt="feedback"
                                    width={150}
                                    height={75}
                                />
                            </div>
                            <div className="mcq-answer-text">{answer}</div>
                        </button>
                    );
                })}
            </div>
        </>
    );
}

/* <>
      <div className="mcq-question-text">{question}</div>

      <div className="answers-container">
        {answers.map((answer, index) => {
          // Determine which CSS class to apply
          let className = '';
          if (!showFeedback) {
            // Before “Continue” – grey out every button except the one they clicked
            if (selectedAnswer !== null && selectedAnswer !== index) {
              className = 'greyed';
            }
          } else {
            // After “Continue” – show correct vs. incorrect
            if (index === correctAnswer) {
              className = 'correct';
            } else if (index === selectedAnswer && selectedAnswer !== correctAnswer) {
              className = 'incorrect';
            } else {
              className = 'greyed';
            }
          }

          return (
            <button
              key={index}
              className={className}
              onClick={() => {
                if (!showFeedback) {
                  onAnswerSelected(index);
                }
              }}
              disabled={showFeedback} 
            >
              <div>
                <img
                  className="star-image-center"
                  src={`/mcq-fish-${index}.svg`}
                  alt="feedback"
                  width={150}
                  height={75}
                />
              </div>
              <div className="mcq-answer-text">{answer}</div>
            </button>
          );
        })}
      </div>
    </> */
