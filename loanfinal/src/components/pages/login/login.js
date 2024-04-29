import React, { useEffect, useState } from 'react';
import FancyInput from '../../modules/fancyinput/fancyinput';
import FancyButton from '../../modules/fancybutton/fancybutton';
import './login.css';
import { Link, useNavigate } from 'react-router-dom';

function Login({ setLoggedIn, setEmail, setId }) {
    useEffect(() => {
        document.title = 'Login';
    }, []);

    const [email, setEmailState] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const isValidPassword = (password) => {
        const passwordRegex = /^[a-zA-Z0-9!@#$%^&*()_+{}\[\]:;<>,.?~\-|]+$/;
        return passwordRegex.test(password);
    };

    const handleEmail = (event) => {
        setEmailState(event);
    };

    const handlePassword = (event) => {
        setPassword(event);
    };

    return (
        <div className='window' id='login'>
            <div className='form'>
                <FancyInput type='text' placeholder='Email' value={email} onChange={handleEmail} />
                <FancyInput type='password' placeholder='Password' value={password} onChange={handlePassword} />
                <FancyButton name='Login' />
                <Link to="/signup" id='link'>Sign Up</Link>
                <span>{message}</span>
            </div>
        </div>
    )
}

export default Login;
