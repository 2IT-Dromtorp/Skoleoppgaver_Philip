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

  return (
  <div class="oppgave">
    <p>Oppgave 2</p>
    <br></br>
    <p>2 A) Arealet til rektanglet er {rektangelAreal}m²</p>
    <p>2 B) Arealet til trekanten er {trekantAreal}m²</p>
    <p>2 C) </p>
  </div>
  )
}

function Oppgave3 () {
  return (
  <div class="oppgave">
    <p>Oppgave 3</p>
    <br></br>
    <p>3 A)</p>
    <p>3 B) </p>
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