import React from 'react';
import Shield from '../../assets/Viken.svg';
import User from '../../assets/person-fill.svg';
import Dropdown from '../../assets/dropdown.svg'
import { Link } from 'react-router-dom';
import './/globalnav.css';


function Navbar() {

  return (
    <nav id='globalnav'>
      <div id='globalnav-content'>
        <Link className='globalnav-item' to='/'>
          <img id='shield' src={Shield} alt='shield' />
        </Link>
        <ul id='list'>
          <li>
            <Link className='globalnav-item' to='/account'>
              <img id='user' src={User} alt='user' />
            </Link>
          </li>
          <li>
            <button className='globalnav-item #dropdown-menu'>
              <img id='dropdown' src={Dropdown} alt='dropdown' />
            </button>
          </li>
        </ul>
      </div>
    </nav >
  )
}

export default Navbar