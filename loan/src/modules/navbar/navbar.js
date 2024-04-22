import React from 'react';
import Logo from '../../assets/Viken.svg';


function Navbar() {
  return (
    <div id='navbar'>
      <div id='logo'>
        <img id='logo-navbar' src={Logo} />
        <span>Viken</span>
      </div>
      <div id='pages'>

      </div>
      <div id='user'>

      </div>
    </div>
  )
}

export default Navbar