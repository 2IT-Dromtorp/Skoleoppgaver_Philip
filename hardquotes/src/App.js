import React, { useState } from 'react';
import tiananmen from "./images/man-Chinese-line-tanks-Beijing-demonstrators-Tiananmen-June-5-1989.webp";
import xijinping from "./images/lqDFDXXvfqMs7kyQ9y1FrGcQzdCE23uMPlcxFqo_oYE.webp";
import socialcredit from "./images/4f633a9e8508310bc1a18f9092ce078b.jpg";
import './App.css';

function App() {

  const images = [
    tiananmen,
    xijinping,
    socialcredit
  ];

  const quotes = [
    "你知道该怎么做吗？",
    "让它工作、让它快速、让它美丽。",
    "正在发生什么，正在发生什么，就是正在发生的事情，现在！",
    "你过得好吗，不，你真的过得好吗？",
    "我们不能将 JavaScript Python 化。"
  ];

  const [randomQuote, setRandomQuote] = useState('');
  const [randomImage, setRandomImage] = useState('');

  const hardQuote = () => {
    const randomQuoteIndex = Math.floor(Math.random() * quotes.length);
    const randomImageIndex = Math.floor(Math.random() * images.length);

    const selectedQuote = quotes[randomQuoteIndex];
    const selectedImage = images[randomImageIndex];

    setRandomQuote(selectedQuote);
    setRandomImage(selectedImage);
  };

  return (
    <div>
      <button onClick={hardQuote}>Press for a hard quote.</button>
      {randomQuote && <p>{randomQuote}</p>}
      {randomImage && <img src={randomImage} alt="Random Image" height="400px"/>}
    </div>
  );
}

export default App;
