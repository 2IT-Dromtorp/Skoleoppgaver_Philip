import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FancyAscii from '../../modules/fancyascii/fancyascii';
import Camera from '../../../assets/Camera.png';
import Laptop from '../../../assets/Laptop.jpg';
import Podcast from '../../../assets/PodcastMic.jpg';
import Ethernet from '../../../assets/EthCable.jpg';
import Router from '../../../assets/WRouter.jpg';
import Sigma from '../../../assets/andreasmogging.gif'
import './css/landing.css';

function Landing() {

  return (
    <main className='main'>
      <section className='homepage-section-module'>
        <div className='homepage-module-data-content'>
          <div className='module-ascii-container'>
            <FancyAscii src={Sigma} />
          </div>
          <h1 className='module-header'>Drømtorp Lend</h1>
          <p className='module-subhead'>Gear Up for Your Projects.</p>
          <div className='module-links'>
            <Link to='/loan' className='module-link'>Loan</Link>
          </div>
        </div>
        <div className='homepage-module-data-content'>
          <ul className='module-gallery'>
            <li className='module-item'>
              <GalleryItem alt='Camera'
                src={Camera}
                title='Cameras'
                subhead='Capture Every Moment with Precision.'
                text="Discover our range of cameras, from compact to DSLRs, ensuring you capture life's moments with precision." />
            </li>
            <li className='module-item'>
              <GalleryItem alt='Laptop'
                src={Laptop}
                title='Laptops'
                subhead='Efficiency Meets Portability.'
                text="Boost productivity with our high-performance laptops, perfect for work or study."
              />
            </li>
            <li className='module-item'>
              <GalleryItem alt='Ethernet'
                src={Ethernet}
                title='Ethernet Cables'
                subhead='Seamless Connectivity for Maximum Speed.'
                text="Upgrade your network with our reliable Ethernet cables for maximum speed and stability."
              />
            </li>
            <li className='module-item'>
              <GalleryItem alt='Podcast'
                src={Podcast}
                title='Podcast Equipment'
                subhead='Professional-grade Tools for Captivating Podcasts.'
                text="Elevate your podcasting with our professional-grade equipment for captivating audio."
              />
            </li>
            <li className='module-item'>
              <GalleryItem alt='Router'
                src={Router}
                title='Routers'
                subhead='Optimize Your Home or Office Network Performance.'
                text="Experience superior Wi-Fi performance with our advanced routers, perfect for home or office"
              />
            </li>
          </ul>

        </div>
      </section>
    </main>
  );
}

export default Landing;

function GalleryItem({ src, alt, title, subhead, text }) {
  return (
    <div className='gallery-cell'>
      <div className='cell-data-content'>
        <div className='cell-image-container'>
          <img className='cell-image' alt={alt} draggable='false' src={src} />
        </div>
        <div className='cell-text-container'>
          <div className='cell-text'>
            <span className='cell-header'>{title}</span>
            <span className='cell-subhead'>{subhead}</span>
            <p className='cell-text-body'>{text}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
