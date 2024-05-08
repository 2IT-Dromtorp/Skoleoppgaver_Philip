import React from 'react'
import { Outlet, Link } from 'react-router-dom'
import './global.css'
import './navbar.css'

function Layout() {
  return (
    <div className='render'>
      <Navbar />
      <Outlet />
    </div>
  )
}

export default Layout

const Navbar = () => {
  return (
    <nav className='globalnav'>
      <div className='globalnav-content'>
        <ul className='globalnav-list'>
          <ListItem text='Sigma' />
          <ListItem text='Sigma' />
          <ListItem text='Sigma' />
          <ListItem text='Sigma' />
          <ListItem text='Sigma' />
          <ListItem text='Sigma' />
        </ul>
        <ul className='globalnav-list'>
          <ListItem text='USER'/>
        </ul>
      </div>
    </nav>
  )
}

const ListItem = ({ text, to, src }) => {
  return (
    <li className='globalnav-list-item'><Link to={to} className='globalnav-link'><span className='globalnav-text-container'>{text}</span><img className='globalnav-image-container' src={src}/></Link></li>
  )
}