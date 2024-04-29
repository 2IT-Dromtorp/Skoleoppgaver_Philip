import React, { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import FancyInput from '../../modules/fancyinput/fancyinput';
import FancyDropdown from '../../modules/fancydropdown/fancydropdown';
import FancyButton from '../../modules/fancybutton/fancybutton';
import './signup.css';

function Signup() {

    useEffect(() => {
        document.title = 'Sign up';
    }, []);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [selectedOption, setSelectedOption] = useState('');

    const handleEmail = (event) => {
        setEmail(event);
    };

    const handlePassword = (event) => {
        setPassword(event);
    };

    const handleSelectOption = (option) => {
        setSelectedOption(option);
    };

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const isValidPassword = (password) => {
        const passwordRegex = /^[a-zA-Z0-9!@#$%^&*()_+{}\[\]:;<>,.?~\-|]+$/;
        return passwordRegex.test(password);
    };

    const navigate = useNavigate();

    const createUser = () => {
        if (email === '' || password === '' || selectedOption === '') {
            return;
        }
        if (!isValidEmail(email)) {
            return;
        }
        if (!isValidPassword(password)) {
            return;
        }
        fetch('/api/v1/createuser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password,
                role: selectedOption
            })
        })
            .then(response => {
                if (response.ok) {
                    setEmail('');
                    setPassword('');
                    setSelectedOption('');
                    setInterval(() => navigate('/login'), 1000);
                }
                return response.json();
            })
            .then(data => console.log(data))
            .catch(error => console.error('Error creating user:', error));
    };

    return (
        <div className='window' id='signup'>
            <div className='left-aside' id='signup'>
            </div>
            <div className='right-aside' id='signup'>
                <div className='form' id='signup'>
                    <FancyInput type='text' placeholder='Email' value={email} onChange={handleEmail} />
                    <FancyInput type='password' placeholder='Password' value={password} onChange={handlePassword} />
                    <FancyDropdown placeholder='Role' options={['Student', 'Teacher', 'System Administrator']} selectedOption={selectedOption} onSelect={handleSelectOption} />
                    <FancyButton onClick={createUser} name='Create user' />
                    <Link to='/login' id='link'>Already have an account? Log in</Link>
                </div>
            </div>
        </div>
    );
}

export default Signup;
