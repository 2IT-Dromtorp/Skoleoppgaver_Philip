import React from 'react'
import './styles/profile.css'

function Profile() {

    const userId = localStorage.getItem('userId')
    const name = localStorage.getItem('name')
    const email = localStorage.getItem('email')
    const url = localStorage.getItem('url')


    return (
        <main id='page-render'>
            <div className='profile-render'>
                <div className='profile'>
                    <img className='profile-image' src={url} alt='profile'/>
                </div>
                <div className='stats'>
                    <span className='stats-text'>{name}</span>
                    <span className='stats-text'>{email}</span>
                </div>
            </div>
        </main>
    )
}

export default Profile