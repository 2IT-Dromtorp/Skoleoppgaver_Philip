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
    const [selectedRole, setSelectedRole] = useState('');
    const [selectedClass, setSelectedClass] = useState('');

    const handleFirstName = (event) => setFirstName(event);
    const handleLastName = (event) => setLastName(event);
    const handlePhoneNumber = (event) => setPhoneNumber(event);
    const handleEmail = (event) => setEmail(event);
    const handlePassword = (event) => setPassword(event);
    const handleConfirmPassword = (event) => setConfirmPassword(event);
    const handleSelectedRole = (event) => setSelectedRole(event);
    const handleSelectedClass = (event) => setSelectedClass(event);

    const doSignup = () => {
        const body = {
            first_name: firstName,
            last_name: lastName,
            phone_number: phoneNumber,
            email: email,
            password: password,
            confirm_password: confirmPassword,
            role: selectedRole,
            class: selectedClass
        };
        console.log(body);
    };

    return (
        <main className='main'>
            <section className='signup-section-module'>
                <div className='signup-module-data-content'>
                    <div className='module-form'>
                        <span className='module-header'>Sign up</span>
                        <FancyInput type='text' placeholder='First name*' value={firstName} onChange={handleFirstName} />
                        <FancyInput type='text' placeholder='Last name*' value={lastName} onChange={handleLastName} />
                        <FancyInput type='tel' placeholder='Phone number*' value={phoneNumber} onChange={handlePhoneNumber} />
                        <FancyInput type='text' placeholder='Email*' value={email} onChange={handleEmail} />
                        <FancyInput type='password' placeholder='Password*' value={password} onChange={handlePassword} />
                        <FancyInput type='password' placeholder='Confirm password*' value={confirmPassword} onChange={handleConfirmPassword} />
                        <FancyDropdown placeholder='Role*' options={['Student', 'Teacher', 'Admin']} selected={selectedRole} onSelect={handleSelectedRole} />
                        <FancyDropdown placeholder='Class*' options={['1IMA', '1IMB', '1IMC', '2ITA', '2ITB', '2MK']} selected={selectedClass} onSelect={handleSelectedClass} />
                        <FancyButton onClick={doSignup} name='Create user' />
                        <Link to='/login' className='link'>Already have an account? Log in</Link>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default Signup;