import logo from './logo.svg';
import './App.css';
import ArealCalculator from './ArealCalculator';
import { useState } from 'react';

function ConsoleLog() {
  const Oppg1 = document.getElementById("Oppg1")
  const Oppg2 = document.getElementById("Oppg2")
  const Oppg3 = document.getElementById("Oppg3")
  const Oppg4 = document.getElementById("Oppg4")
    console.log(Oppg1);
    console.log(Oppg2);
    console.log(Oppg3);
    console.log(Oppg4);
}

function Oppgave1 () {
  return (
  <div class="oppgave">
    <p>Oppgave 1</p>
    <br></br>
    <p id="Oppg1">1 A) let test = 8; - integer</p>
    <p id="Oppg2">1 B) let test = "test"; - string</p>
    <p id="Oppg3">1 C) let produkt = 2 * 3 </p>
    <p id="Oppg4">1 D) let broek = 2 / 3</p>
  </div>
  )
}

function Oppgave2({lengde, bredde}) {

  const rektangelAreal = lengde * bredde;

  const trekantAreal = lengde * bredde / 2;

  function ArealKalkulator() {
    let rektangelResult = LengdeValue * BreddeValue;
    let trekantResult = LengdeValue * BreddeValue / 2;
    const [LengdeValue, setLengdeValue] = useState('');
    const [BreddeValue, setBreddeValue] = useState('');
    const [Rektangel, setRektangel] = useState('');
    const [Trekant, setTrekant] = useState('');
  }

  return (
  <div class="oppgave">
    <p>Oppgave 2</p>
    <br></br>
    <p>2 A) Arealet til rektanglet er {rektangelAreal}m²</p>
    <p>2 B) Arealet til trekanten er {trekantAreal}m²</p>
    <p>2 C) </p>
    <input type='text'></input>
    <input type='text'></input>
    <p className='rektangelResult'></p>
    <p className='trekantResult'></p>
  </div>
  )
}

function Oppgave3() {
  const [inputValue, setInputValue] = useState('');
  const [result, setResult] = useState('');

  const handleLangVerificatorClick = () => {
    const input = inputValue.toUpperCase();

    if (input === 'N') {
      setResult('Du er Norsk');
    } else if (input === 'S') {
      setResult('Du er Svensk');
    } else if (input === 'D') {
      setResult('Du er Dansk');
    } else {
      setResult('Feil input');
    }
  };

  function fjernInput() {
    setInputValue('');
    setResult('');
  };

  return (
    <div className="oppgave">
      <p>Oppgave 3</p>
      <br />
      <p>3 A) Skriv "N" om du er norsk, "S" hvis du er svensk og "D" hvis du er dansk.</p>
      <input
        type='text'
        placeholder='skriv her'
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button onClick={handleLangVerificatorClick}>Submit</button>
      <p className='sprak'>{result}</p>
      <button onClick={fjernInput}>Fjern Input</button>
      <p>3 B)</p>
    </div>
  );
}

function Oppgave4 () {
  return (
  <div class="oppgave">
    <p>Oppgave 4</p>
    <br></br>
    <p>4) </p>
  </div>
  )
}

function Programmering() {

  let [sider, setArealTrekant] = useState(3)

  function ArealTrekant() {
    setArealTrekant(sider + 4)

  }


  return (
  <div>
<div class="titlebar"><span>Grunnleggende Programmering</span></div>
  <Oppgave1 />
  <br></br>
  <Oppgave2 lengde={8} bredde={8} />
  <br></br>
  <Oppgave3 />
  <br></br>
  <Oppgave4 />
  <br></br>
  <ConsoleLog />
  <br></br>
  <ArealCalculator sider={sider} ArealTrekant={ArealTrekant}/>
  </div>
  )
}

export default Programmering;