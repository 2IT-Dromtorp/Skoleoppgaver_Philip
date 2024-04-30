import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import FancyInput from '../../modules/fancyinput/fancyinput';
import FancyDropdown from '../../modules/fancydropdown/fancydropdown';
import FancyButton from '../../modules/fancybutton/fancybutton';
import './signup.css';

function Signup() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [selectedOption, setSelectedOption] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const handleEmail = (event) => {
        setEmail(event);
    };

    const handlePassword = (event) => {
        setPassword(event);
    };

    const handleSelectOption = (option) => {
        setSelectedOption(option);
    };

    const doSignup = () => {
        const body = JSON.stringify({
            email: email,
            password: password,
            role: selectedOption
        });
        console.log(body);
        fetch('/api/v1/accounts/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: body
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.success) {
                    setErrorMsg('Account created')
                } else {
                    setErrorMsg(data.message);
                }
            }).catch((err) => {
                console.error('Error:', err);
            });
    };

    return (
        <div className='window' id='signup'>
            <div className='left-aside' id='signup'>
            </div>
            <div className='right-aside' id='signup'>
                <div className='form' id='signup'>
                    <span className='title-2em'>Sign up</span>
                    <FancyInput type='text' placeholder='Email' value={email} onChange={handleEmail} />
                    <FancyInput type='password' placeholder='Password' value={password} onChange={handlePassword} />
                    <FancyDropdown placeholder='Role' options={['Student', 'Teacher', 'System Administrator']} selectedOption={selectedOption} onSelect={handleSelectOption} />
                    <FancyButton onClick={doSignup} name='Create user' />
                    <Link to='/login' className='link'>Already have an account? Log in</Link>
                    <span>{errorMsg}</span>
                </div>
            </div>
        </div>
    );
}

export default Signup;
