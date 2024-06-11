import React from 'react';
import { Outlet } from 'react-router-dom';
import Background from '../../assets/images/bg_start.jpg';
import Logo from '../../assets/images/e480414ba046e5923941.svg';

function Template() {
    return (
        <div className='background'>
            <Outlet />
        </div>
    );
}

export default Template;
