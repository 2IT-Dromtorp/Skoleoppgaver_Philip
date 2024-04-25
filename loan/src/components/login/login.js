import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import FancyInput from '../../modules/customs/fancyinput/fancyinput';
import FancyButton from '../../modules/customs/fancybutton/fancybutton';
import './login.css';

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const doLogin = () => {
        console.log(email, password);
    }

    return (
        <div id='login-window'>
            <div id='login-form'>
                <FancyInput type='text' name='Email' value={email} onChange={setEmail}/>
                <FancyInput type='password' name='Password' value={password} onChange={setPassword}/>
                <FancyButton name='Login' onClick={doLogin}/>
            </div>
        </div>
    )
}

export default Login;
