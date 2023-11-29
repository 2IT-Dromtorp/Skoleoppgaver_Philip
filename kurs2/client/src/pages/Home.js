import React, { useEffect, useState } from 'react'
import { Outlet, Link, useNavigate } from "react-router-dom";
import DatakunnskapLogo from '../images/retrocomputer.png';
import KroppsovingLogo from '../images/gym1600x900.jpg';
import HeimkunnskappLogo from '../images/heimkunnskap.jpg';
import NorskLogo from '../images/norwayflag2048x1152.png';

function Home() {
    const navigate = useNavigate();
    return (
        <>
            <div id='header-container'>
                <div id='header'><h1>Opplæring av godt voksne</h1></div>
                <div id='sub-header'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam a mattis ipsum. Nullam eu felis odio. Etiam tempus felis ac condimentum ultrices. Mauris eget dignissim enim. Fusce vulputate, orci nec facilisis egestas, elit nunc laoreet metus, tristique condimentum turpis massa ut massa. Cras elementum sem sit amet convallis pellentesque. Sed.</div>
            </div>
            <div id='image'></div>
            <div id='kurs'>
            <div id='kurs-infoheader'><h1>Kurskatalog</h1></div>
            <div id='kurs-infocontainer'>
                <div onClick={() => navigate('/datakunnskap')} id='kurs-box'><div id='img-container'><img src={DatakunnskapLogo} /></div><h2>Datakunnskap</h2></div>
                <div onClick={() => navigate('/kroppsoving')} id='kurs-box'><div id='img-container'><img src={KroppsovingLogo} /></div><h2>Kroppsøving</h2></div>
                <div onClick={() => navigate('/norsk')} id='kurs-box'><div id='img-container'><img src={NorskLogo} /></div><h2>Norsk</h2></div>
                <div onClick={() => navigate('/heimkunnskap')} id='kurs-box'><div id='img-container'><img src={HeimkunnskappLogo} /></div><h2>Heimkunnskap</h2></div>
            </div>
            </div>
        </>
    )
}

export default Home