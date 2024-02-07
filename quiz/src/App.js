import React from 'react';
import './App.css';

function App() {
  const doSubmit = async (e) => {
    e.preventDefault();
    window.location.href("https://vg.no");
  };

  const renderQuestion = (questionNumber, options) => (
    <div key={questionNumber}>
      <span>{`Q${questionNumber}: ${options[0]}`}</span>
      {options.slice(1).map((option, index) => (
        <label key={index + 1}>
          <input type="radio" name={`q${questionNumber}`} value={option} />
          {` ${option}`}
        </label>
      ))}
    </div>
  );

  return (
    <div id="quiz">
      <form id="quizform" onSubmit={doSubmit}>
        <span>IT Quiz</span>

        {[
          {
            question: 'Hva står IT for?',
            options: ['Informasjonsteknologi', 'Intelligent Teknologi', 'Interaktiv Testing'],
          },
          {
            question: 'Hvilket språk brukes ofte til webutvikling?',
            options: ['JavaScript', 'Python', 'Java'],
          },
          {
            question: 'Hva er en CPU?',
            options: ['Central Processing Unit', 'Computer Processing Unit', 'Central Printed Unit'],
          },
          {
            question: 'Hva er en IP-adresse?',
            options: ['Internet Protocol Address', 'Internal Processing Address', 'Interactive Page Address'],
          },
          {
            question: 'Hva er en SQL-database?',
            options: ['Structured Query Language', 'Simple Question Language', 'Software Quality Logic'],
          },
        ].map((question, index) => renderQuestion(index + 1, question.options))}

        <input type="submit" id="submit" value="Submit" />
      </form>
    </div>
  );
}

export default App;
