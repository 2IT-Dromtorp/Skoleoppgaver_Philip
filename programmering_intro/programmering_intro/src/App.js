import logo from './logo.svg';
import './App.css';

function Programmering() {
  return (
  <div>
<div class="titlebar"><span>Grunnleggende Programmering</span></div>
  <Oppgave1 />
  <br></br>
  <Oppgave2 />
  <br></br>
  <Oppgave3 />
  <br></br>
  <Oppgave4 />
  </div>
  )
}


function Oppgave1 () {
  return (
  <div class="oppgave">
    <p>Oppgave 1</p>
    <br></br>
    <p>A) let test = 8; - integer</p>
    <p>B) let test = "test"; - string</p>
    <p>C) let produkt = 2 * 3 </p>
    <p>D) let broek = 2 / 3</p>
    <p>E) </p>
  </div>
  )
}

function Oppgave2 () {
  return (
  <div class="oppgave">
    <p>Oppgave 2</p>
    <br></br>
    <p>A) </p>
    <p>B) </p>
    <p>C) </p>
  </div>
  )
}

function Oppgave3 () {
  return (
  <div class="oppgave">
    <p>Oppgave 3</p>
    <br></br>
    <p>A)</p>
    <p>B) </p>
  </div>
  )
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

export default Programmering;