import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import "./styles/layout.css";
import Profile from "../../assets/profile.png";

function Layout() {
    return (
        <div id='render'>
            <Navbar />
            <div id='app-mount'>
                <Outlet />
            </div>
        </div>
    );
}

export default Layout;

const Navbar = () => {

    const loginStatus = localStorage.getItem("loginStatus");
    console.log("Login status:", loginStatus)

    return (
        <nav id='globalnav'>
            <div className='gnContent'>
                <ul className='gnList'>
                    <li className='li'>
                        <Link to="/" id='link'>
                            Home
                        </Link>
                    </li>
                    {loginStatus ? (
                        <li className='li'>
                            <Link to="/profile" id='link'>
                                <div className='user'>
                                    <div className='profileImage'>
                                        <img src={Profile} alt='Profile' className='image' />
                                    </div>
                                </div>
                            </Link>
                        </li>
                    ) : (
                        <li className='li'>
                            <Link to="/login" id='link'>Login</Link>
                        </li>
                    )}
                </ul>
            </div>
        </nav>
    );
};
