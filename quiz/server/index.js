const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

app.use(express.static("build"));

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

app.get('/checkanswers', (req, res) => {
    const userAnswers = req.query;
    const correctAnswers = {
        q1: '1',
        q2: '2',
        q3: '3',
        q4: '4',
        q5: '5',
    };

    const result = {};

    for (const question in userAnswers) {
        if (userAnswers.hasOwnProperty(question)) {
            const userAnswer = userAnswers[question];
            const correctAnswer = correctAnswers[question];

            result[question] = userAnswer === correctAnswer;
        }
    }

    res.json(result);
});  