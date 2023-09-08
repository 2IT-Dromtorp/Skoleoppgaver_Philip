import React, { useState, useEffect } from 'react';

export default function NumberCount() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const savedCount = localStorage.getItem('count');
    if (savedCount !== null) {
      setCount(parseInt(savedCount));
    }
  }, []);

  function NumberUp() {
    const newCount = count + 1;
    setCount(newCount);
    localStorage.setItem('count', newCount.toString());
  }

  function NumberDown() {
    const newCount = count - 1;
    setCount(newCount);
    localStorage.setItem('count', newCount.toString());
  }

  return (
    <div className='NumberCount'>
      <button className='ButtonUp' onClick={NumberUp}><img src="/images/uparrow.png" alt="Button Image" height="100px" /></button>
      <p className='number'>{count}</p>
      <button className='ButtonDown' onClick={NumberDown}><img src="/images/downarrow.png" alt="Button Image" height="100px" /></button>
    </div>
  );
}
