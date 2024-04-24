import React from 'react'
import './fancybutton.css'

function FancyButton({ name }) {
  return (
    <div id='fancy-button'>
        <button id='button'>{name}</button>
    </div>
  )
}

export default FancyButton