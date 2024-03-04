import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


function AccountPage({ isLoggedIn, username }) {

    return (
        <div id='mainWindow'>
            <div id='account'>
                <h1>@{username}</h1>
                <div id='accountData'>
                    <span></span>
                </div>
            </div>
        </div>
    )
}

export default AccountPage