import React from 'react'
import { Outlet, Link, useNavigate } from "react-router-dom";

function Login() {
  return (
    <div id="main">
      <div id='loginSection'>
        <p>LOGO</p>
        <div id='inputWrapper'>
        <input placeholder='Brukernavn'></input>
        </div>
        <div id='inputWrapper'>
        <input placeholder='Passord'></input>
        </div>
        <button id='submitButton'>Logg inn</button>
        <span>eller</span>
        <Link id='signupLink' to='/signup'>Opprett konto</Link>
      </div>
    </div>
  )
}

export default Login