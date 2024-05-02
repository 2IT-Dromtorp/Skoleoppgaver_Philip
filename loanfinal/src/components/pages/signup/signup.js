import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import FancyInput from '../../modules/fancyinput/fancyinput';
import FancyDropdown from '../../modules/fancydropdown/fancydropdown';
import FancyButton from '../../modules/fancybutton/fancybutton';
import './signup.css';

function Signup() {
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState('');
    const [className, setClassName] = useState('');

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
    const handleConfirmPassword = (event) => {
        setConfirmPassword(event);
    };

    const handleRole = (event) => {
        setRole(event);
    };
    const handleClassName = (event) => {
        setClassName(event);
    };

    const handleSignup = () => {
        const body = {
            first_name: firstName,
            last_name: lastName,
            phone_number: phoneNumber,
            email: email,
            password: password,
            conf_password: confirmPassword,
            role: role,
            className: className
        };
        fetch('/api/v1/account/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('username', data.userDetails.first_name + ' ' + data.userDetails.last_name);
                    localStorage.setItem('email', data.userDetails.email);
                    localStorage.setItem('loggedIn', true);
                    navigate('/account');
                    window.location.reload();
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <main className='main'>
            <section className='signup-section-module'>
                <div className='signup-module-data-content'>
                    <div className='module-form'>
                        <span className='module-header'>Sign up</span>
                        <FancyInput placeholder='First Name' required type='text' value={firstName} onChange={handleFirstName} />
                        <FancyInput placeholder='Last Name' required type='text' value={lastName} onChange={handleLastName} />
                        <FancyInput placeholder='Phone Number' required type='tel' value={phoneNumber} onChange={handlePhoneNumber} />
                        <FancyInput placeholder='Email' required type='email' value={email} onChange={handleEmail} />
                        <FancyInput placeholder='Password' required type='password' value={password} onChange={handlePassword} />
                        <FancyInput placeholder='Confirm Password' required type='password' value={confirmPassword} onChange={handleConfirmPassword} />
                        <FancyDropdown options={['Student', 'Teacher', 'Admin']} placeholder='Role' onSelect={handleRole} />
                        <FancyDropdown options={['1IMA', '1IMB', '1IMC', '2ITA', '2ITB', '2MK', 'Administration']} placeholder='Class' onSelect={handleClassName} />
                        <FancyButton text='Sign Up' onClick={handleSignup} />
                        <Link to='/login' className='link'>Already have an account? Log in</Link>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default Signup;
