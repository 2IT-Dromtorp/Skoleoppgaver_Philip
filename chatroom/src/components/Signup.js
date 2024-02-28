import React from 'react'
import { Outlet, Link, useNavigate } from "react-router-dom";

function Signup() {
  return (
    <div id="main">
      <div id='loginSection'>
        <p>LOGO</p>
        <div id='inputWrapper'>
        <input placeholder='Brukernavn'></input>
        </div>
        <div id='inputWrapper'>
        <input placeholder='Email'></input>
        </div>
        <div id='inputWrapper'>
        <input placeholder='Passord'></input>
        </div>
        <button id='submitButton'>Opprett bruker</button>
      </div>
    </div>
  )
}

export default Signup