import React from 'react'
import { Outlet, Link } from 'react-router-dom'
import "../styles/layout.css"
import "../styles/globalnav.css"

function Layout() {
    return (
        <div id='app-render'>
            <Navbar />
            <Outlet />
        </div>
    )
}

export default Layout

const Navbar = () => {
    return (
        <nav id='globalnav'>
            <div className='gn-content'>
                <ul className='gn-list'>
                    <GlobalnavListItem to="/" label="LINK" />
                    <GlobalnavListItem to="/" label="LINK" />
                    <GlobalnavListItem to="/" label="LINK" />
                    <GlobalnavListItem to="/" label="LINK" />
                    <GlobalnavListItem to="/" label="LINK" />
                </ul>
            </div>
        </nav>
    )
}

const GlobalnavListItem = ({ to, label }) => {
    return (
        <li className='gn-list-item'>
            <Link className='gn-list-item-link' to={to}><span className='gn-list-item-textbox'>{label}</span></Link>
        </li>
    )
}