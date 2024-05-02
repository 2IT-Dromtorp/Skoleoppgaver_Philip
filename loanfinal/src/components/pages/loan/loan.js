import React, { useState } from 'react'
import './loan.css'
import Camera from '../../../assets/Camera.png';
import Laptop from '../../../assets/Laptop.jpg';
import Podcast from '../../../assets/PodcastMic.jpg';
import Ethernet from '../../../assets/EthCable.jpg';
import Router from '../../../assets/WRouter.jpg';
import FancyInput from '../../modules/fancyinput/fancyinput';
import FancyButton from '../../modules/fancybutton/fancybutton';

function Loan() {

  const [equipmentName, setEquipmentName] = useState('');
  const [category, setCategory] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');
  const [availability, setAvailability] = useState('');

  const handleEquipmentName = (event) => {
    setEquipmentName(event);
  };
  const handleCategory = (event) => {
    setCategory(event);
  };
  const handleImageUrl = (event) => {
    setImageUrl(event);
  };
  const handleDescription = (event) => {
    setDescription(event);
  };
  const handleAvailability = (event) => {
    setAvailability(event);
  };

  const addEquipment = () => {

  }

  return (
    <main className='main'>
      <section className='loan-section-module'>
        <div className='loan-module-data-content'>
          <FancyInput type='text'  placeholder='Equipment Name' value={equipmentName} onChange={handleEquipmentName}/>
          <FancyInput type='text' placeholder='Category' value={category} onChange={handleCategory} />
          <FancyInput type='text' placeholder='Image Url' value={imageUrl} onChange={handleImageUrl} />
          <FancyInput type='text' placeholder='Description' value={description} onChange={handleDescription} />
          <FancyInput type='text' placeholder='Availability' value={availability} onChange={handleAvailability} />
          <FancyButton text='Submit' />
          <div className='loan-module-data'>
            {/* render equipment list in a 3 column grid */}
          </div>
        </div>
      </section>
    </main>
  )
}

export default Loan