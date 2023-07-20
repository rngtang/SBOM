import React from 'react';
import './Home.css';
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
      <div id="force">
        <Carousel showStatus={false} showThumbs={false} showIndicators={false} >
          {images.map((imageSrc, index) => (
            <div key={index}>
              <img src={imageSrc} alt={`Image ${index + 1}`} />
            </div>
          ))}
        </Carousel>
      </div>
    );
};
  