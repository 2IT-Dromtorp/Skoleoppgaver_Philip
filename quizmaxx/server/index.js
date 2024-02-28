const express = require('express');
const app = express();
const quizData = require('./quizData.json');
const port = process.env.PORT || 8080

app.use(express.static("build"));

app.get('/quiz', (req, res) => {
  res.json(quizData);
});

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
