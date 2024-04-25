import React from 'react'
import './landing.css'
import FancyInput from '../../modules/fancyinput/fancyinput'
import FancyDropdown from '../../modules/fancydropdown/fancydropdown'

function Landing() {
    return (
        <div id='content'>
            <div className='container'>
                <div className='search'>
                    <FancyInput type='text' placeholder='Search for players' />
                    <FancyDropdown />
                </div>
            </div>
        </div>
    )
}

export default Landing
