import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import FancyInput from '../../modules/customs/fancyinput/fancyinput';
import FancyButton from '../../modules/customs/fancybutton/fancybutton';
import './signup.css';

function Signup() {
  return (
    <div id='login-window'>
      <div id='login-form'>
        <FancyInput />
      </div>
    </div>
  )
}

export default Signup