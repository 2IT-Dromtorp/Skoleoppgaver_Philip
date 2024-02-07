import React, { useState, useEffect } from 'react';

function Klubb() {
  return (
    /*{klubber.map((klubb, index) => (
        <div key={index} id='klubb'>
          <p id='klubbNavn'>{klubb.name}</p>
          <p>{klubb.regi}</p>
          <p>{klubb.lokasjon}</p>
          <p>{klubb.tider}</p>
        </div>
      ))}*/
    <div id='klubb-container'>
      <div id='klubb'>
        <p id='klubbNavn'>Klubba 1</p>
      </div>
      <div id='klubb'>
        <p id='klubbNavn'>Klubba 2</p>
      </div>
      <div id='klubb'>
        <p id='klubbNavn'>Klubba 3</p>
      </div>
      <div id='klubb'>
        <p id='klubbNavn'>Klubba 4</p>
      </div>
    </div>
  );
}

export default Klubb;