import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './css/global.css';
import { Outlet } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

function Template() {
    return (
        <div className='page-wrapper'>
            <Navbar draggable='false' buttons={[{ to: '/', text: 'Home' }, { to: '/tournaments', text: 'Tournaments' }]} />
            <Outlet />
        </div>
    );
}

export default Template;

const Navbar = ({ buttons = [] }) => {

    const [user, setUser] = useState(null);

    const navigate = useNavigate();

    const checkUser = () => {
        const jwtToken = localStorage.getItem('token');
        if (jwtToken) {
            const decodedToken = jwtDecode(jwtToken);
            console.log(decodedToken);
            setUser(decodedToken);
        }
    }

    useEffect(() => {
        checkUser();
    }, []);

    const logout = () => {
        localStorage.removeItem('token');
        navigate('/');
        checkUser(); // Call checkUser here to update user state after logout
    };

    return (
        <nav className='globalnav-flex'>
            <div className='globalnav-flex-content'>
                <ul className='globalnav-navigation'>
                    {buttons.map((button) => (
                        <Navbutton key={button.to} to={button.to} text={button.text} />
                    ))}
                </ul>
                <ul className='globalnav-profile'>
                    {user ? (
                        <div className='align-flex'>
                            <Link draggable='false' to={`/profile/${user.id}`}>
                                <div className='rounded-flex'>
                                    <img draggable='false' alt='User' className='rounded' src={user.profile_picture} />
                                </div>
                            </Link>
                            <div className='align-flex-button'>
                                <button className='logout-button' onClick={logout}>Logout</button>
                            </div>
                        </div>
                    ) : (
                        <Navbutton to='/login' text='Login' />
                    )}
                </ul>
            </div>
        </nav>
    );
}

const Navbutton = ({ to, text }) => {
    return (
        <div className='navbutton-flex'>
            <Link className='navbutton-flex-link' to={to}>
                {text}
            </Link>
        </div>
    );
}
