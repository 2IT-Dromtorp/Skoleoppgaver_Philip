import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Quiz() {
    const [selectedAnswer, setSelectedAnswer] = useState(null);

    const questions = [
        {
            question: "What is the capital of France?",
            answers: ["Paris", "Berlin", "London", "Rome"]
        },
        // Add more questions as needed
    ];

    const handleAnswerSelection = (answer) => {
        setSelectedAnswer(answer);
    };

    return (
        <>
            <Link to="/">Back</Link>
            <div id='quiz'>
                <span id='title'>Quiz</span>
                {questions.map((q, index) => (
                    <div key={index}>
                        <div id='question'>
                            <p>{q.question}</p>
                        </div>
                        <div id='answers'>
                            {q.answers.map((answer, ansIndex) => (
                                <div id="answer-box" key={ansIndex} onClick={() => handleAnswerSelection(answer)}>
                                    <div id={`answer ${selectedAnswer === answer ? 'selected' : ''}`}>
                                        {answer}
                                    </div>
                                </div>
                            ))}
                        </div>|
                    </div>
                ))}
            </div>
            <div>
                {/*empty div to keep the quiz at the middle*/}
            </div>
        </>
    );
}

export default Quiz;
