import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
// Import the image files
import itoLogo from './images/ito.png';
import ciscoLogo from './images/cisco.png';


const images = [
  ciscoLogo,  
  itoLogo,
];

export default function LogoSlider () {
    return (
      <Carousel showStatus={false} showThumbs={false} showIndicators={false}>
        <div>
          <img src={ciscoLogo} alt="cicso logo"/>
        </div>
        <div>
          <img src={itoLogo} alt="ito logo"/>
        </div>

      </Carousel>
    );
};
  