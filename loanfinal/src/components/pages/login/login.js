import React, { useState } from 'react';
import FancyInput from '../../modules/fancyinput/fancyinput';
import { Link, useNavigate } from 'react-router-dom';

function Login({ setEmail, setLoggedIn }) {
    const [email, setEmailState] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const logIn = async () => {
    }

    const handleEmail = (event) => {
        setEmailState(event);
    };

    const handlePassword = (event) => {
        setPassword(event);
    };

    return (
        <div className='login'>
            <div className='form'>
                <FancyInput type='text' placeholder='Email' value={email} onChange={handleEmail} />
                <FancyInput type='password' placeholder='Password' value={password} onChange={handlePassword} />
                <button onClick={logIn}>Log in</button>
                <div>{message}</div>
            </div>
            <div>
                <Link to="/signup">Sign Up</Link>
            </div>
        </div>
    )
}

export default Login;
