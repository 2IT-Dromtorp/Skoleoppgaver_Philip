import React from 'react'
import './fancybutton.css'

function FancyButton({ name, onClick }) {
  return (
    <div id='fancy-button'>
        <button id='button' onClick={onClick}>{name}</button>
    </div>
  )
}

export default FancyButton