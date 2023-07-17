import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
// Import the image files
import itoLogo from './images/ito.png';
import ciscoLogo from './images/cisco.png';


const images = [
    itoLogo,
    ciscoLogo
];

export default function LogoSlider () {
    return (
      <Carousel showStatus={false} showThumbs={false}>
        {images.map((imageUrl, index) => (
          <div key={index}>
            <img src={imageUrl} alt={`Image ${index}`} />
          </div>
        ))}
      </Carousel>
    );
};
  