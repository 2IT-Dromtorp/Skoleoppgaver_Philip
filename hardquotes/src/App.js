import React, { useState } from 'react';
import './App.css';
const tiananmen = "https://i.ibb.co/yBxNp6M/image-2024-01-30-122444707.png";
const socialcredits = "https://i.ibb.co/58WqM8Y/4f633a9e8508310bc1a18f9092ce078b.jpg";
const negativesocialcredits = "https://i.ibb.co/wQPwZJM/image-2024-01-30-084132169.png";

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
