import React from 'react';
import FancyInput from '../../modules/customs/fancyinput/fancyinput';
import FancyButton from '../../modules/customs/fancybutton/fancybutton';
import './login.css';

function Login() {
    return (
        <div id='login-window'>
            <div id='login-form'>
                <FancyInput placeholder="Username" type='text' value={''}/>
                <FancyInput placeholder="Password" type='password' value={''}/>
                <FancyInput placeholder="Email" type='text' value={''}/>
                Problems with password?
                <FancyButton name='Login'>Login</FancyButton>
            </div>
        </div>
    );
}

export default Login;
