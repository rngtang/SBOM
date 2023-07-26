import React from 'react';
import '../pages/Home.css';
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
      <div className="slider">
        <Carousel showStatus={false} showThumbs={false} showIndicators={false} width={205}>
          {images.map((imageSrc, index) => (
            <div key={index}>
              <img src={imageSrc} alt={`Image ${index + 1}`} id="force"/>
            </div>
          ))}
        </Carousel>
      </div>
    );
};
  