import React, { useState } from 'react';
import FancyInput from '../../modules/fancyinput/fancyinput';
import './signup.css';

function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const signUp = async () => {
        const body = JSON.stringify({
            email: email,
            password: password
        });

        fetch('/api/v1/signup', {
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
                setMessage('Failed to create user');
                console.error('Error:', error);
            });
    };

    const handleEmail = (event) => {
        setEmail(event);
    };

    const handlePassword = (event) => {
        setPassword(event);
    };

    return (
        <div className='signup'>
            
            <div className='form'>
                <FancyInput type='text' placeholder='Email' value={email} onChange={handleEmail} />
                <FancyInput type='password' placeholder='Create password' value={password} onChange={handlePassword} />
                <button onClick={signUp}>Sign up</button>
                <div>{message}</div>
            </div>
        </div>
    );
}

export default Signup;
