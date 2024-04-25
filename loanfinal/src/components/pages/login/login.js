import React, { useState } from 'react';
import FancyInput from '../../modules/fancyinput/fancyinput';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const logIn = async () => {
        const body = JSON.stringify({
            email: email,
            password: password
        });

        fetch('/api/v1/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: body
        })
            .then(response => response.json())
            .then(data => {
                setMessage(data.message);
            })
            .catch(error => {
                setMessage('Failed to log in');
                console.error('Error:', error);
            });
    };

    const handleEmail = (event) => {
        setEmail(event.target.value);
    };

    const handlePassword = (event) => {
        setPassword(event.target.value);
    };

    return (
        <div className='login'>

            <div className='form'>
                <FancyInput type='text' placeholder='Email' value={email} onChange={handleEmail} />
                <FancyInput type='password' placeholder='Password' value={password} onChange={handlePassword} />
                <button onClick={logIn}>Log in</button>
                <div>{message}</div>
            </div>
        </div>
    )
}

export default Login