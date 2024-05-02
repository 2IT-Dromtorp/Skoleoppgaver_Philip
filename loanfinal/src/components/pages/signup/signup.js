import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import FancyInput from '../../modules/fancyinput/fancyinput';
import FancyDropdown from '../../modules/fancydropdown/fancydropdown';
import FancyButton from '../../modules/fancybutton/fancybutton';
import './signup.css';

function Signup() {

    const navigate = useNavigate();

    const [role, setRole] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');
    const [selectedOption, setSelectedOption] = useState('');
    const [errorMsg, setErrorMsg] = useState('');


    const handleFirstName = (event) => {
        setFirstName(event);
    };
    const handleLastName = (event) => {
        setLastName(event);
    };

    const handlePhoneNumber = (event) => {
        setPhoneNumber(event);
    };
    const handleEmail = (event) => {
        setEmail(event);
    };

    const handlePassword = (event) => {
        setPassword(event);
    };

    const handleConfPassword = (event) => {
        setConfPassword(event);
    };

    const handleSelectOption = (option) => {
        setSelectedOption(option);
    };

    const doSignup = () => {
        const body = JSON.stringify({
            first_name: firstName,
            last_name: lastName,
            phone_number: phoneNumber,
            email: email,
            password: password,
            conf_password: confPassword,
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
                    setErrorMsg('Account created.')
                    setFirstName('');
                    setLastName('');
                    setPhoneNumber('');
                    setEmail('');
                    setPassword('');
                    setConfPassword('');
                    setSelectedOption('');
                    navigate('/login');
                } else {
                    setErrorMsg(data.message);
                }
            }).catch((err) => {
                console.error('Error:', err);
            });
    };

    return (
        <main className='main'>
            <section className='signup-section-module'>
                <div className='signup-module-data-content'>
                    <div className='module-left'>
                        <div className='module-left-info'>
                            <span className='module-header'>Welcome</span>
                            <span className='module-subhead'>Sign up to get started</span>
                            <p className='module-text'>Welcome to our IT equipment lending platform! Borrow laptops, tablets, projectors, and more with ease. Empowering students, teachers, and administrators to excel in the digital realm. Join us and unlock limitless possibilities today!</p>
                        </div>
                    </div>
                    <div className='module-right'>
                        <div className='module-form'>
                            <span className='module-header'>Sign up</span>
                            <FancyInput type='text' placeholder='First name' value={firstName} onChange={handleFirstName} />
                            <FancyInput type='text' placeholder='Last name' value={lastName} onChange={handleLastName} />
                            <FancyInput type='tel' placeholder='Phone number' value={phoneNumber} onChange={handlePhoneNumber} />
                            <FancyInput type='text' placeholder='Email' value={email} onChange={handleEmail} />
                            <FancyInput type='password' placeholder='Password' value={password} onChange={handlePassword} />
                            <FancyInput type='password' placeholder='Confirm password' value={confPassword} onChange={handleConfPassword} />
                            <FancyDropdown placeholder='Role' options={['Student', 'Teacher', 'Admin']} selectedOption={selectedOption} onSelect={handleSelectOption} />
                            <FancyButton onClick={doSignup} name='Create user' />
                            <Link to='/login' className='link'>Already have an account? Log in</Link>
                            <span className='error'>{errorMsg}</span>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default Signup;
