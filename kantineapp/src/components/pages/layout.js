import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import "./styles/layout.css";

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

    const navigate = useNavigate();

    const logout = () => {
        localStorage.clear();
        navigate("/")
    }

    const name = localStorage.getItem("name")
    const loginStatus = localStorage.getItem("loginStatus");
    const userId = localStorage.getItem("userId");
    const url = localStorage.getItem("url");

    return (
        <nav id='globalnav'>
            <div className='gnContent'>
                <ul className='gnList'>
                    <li className='li'>
                        <Link to="/" id='link'>
                            Home
                        </Link>
                    </li>
                    <li className='li'>
                        <Link to="/addproduct" id='link'>
                            Add Products
                        </Link>
                    </li>
                    {loginStatus ? (
                        <li className='li'>
                            <span className='username'>
                                {name}
                            </span>
                            <Link to={`/profile/${userId}`} id='link'>
                                <div className='user'>
                                    <div className='profileImage'>
                                        <img src={url} alt='Profile' className='image' />
                                    </div>
                                </div>
                            </Link>
                            <button className='logout-btn' onClick={logout}>
                                <span>Logout</span>
                            </button>
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
