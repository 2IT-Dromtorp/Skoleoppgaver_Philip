import React, { useState } from 'react';
import tiananmen from "./images/man-Chinese-line-tanks-Beijing-demonstrators-Tiananmen-June-5-1989.webp";
import socialcredits from "./images/4f633a9e8508310bc1a18f9092ce078b.jpg";
import negativesocialcredits from "./images/image-2024-01-30-084132169.png";
import './App.css';

function App() {

  const images = [
    tiananmen,
    socialcredits,
    negativesocialcredits
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
  const [randomLink, setRandomLink] = useState('');

  const hardQuote = () => {
    const randomQuoteIndex = Math.floor(Math.random() * quotes.length);
    const randomImageIndex = Math.floor(Math.random() * images.length);

    const selectedQuote = quotes[randomQuoteIndex];
    const selectedImage = images[randomImageIndex];

    setRandomQuote(selectedQuote);
    setRandomImage(selectedImage);
  };

  return (
    <div id='main'>
      <a id='qbtn' onClick={hardQuote}>Generate hard quote.</a>
      <div id='content'>{randomQuote && <p>{randomQuote}</p>}
      {randomImage && <img src={randomImage} width="20%" />}</div>
    </div>
  );
}

export default App;
