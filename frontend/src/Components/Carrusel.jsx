import Img from "../assets/img/img_main.webp";
import Img2 from "../assets/img/img_2.jpg";
import Img3 from "../assets/img/img_3.jpg";
import Img4 from "../assets/img/img_4.jpg";
import Img5 from "../assets/img/img_5.jpg";
import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

export const Carrusel = () => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 1
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  // Container and images fill full viewport, with object-cover for perfect cropping
  // Removed unnecessary div wrappers inside carousel for clean semantic layout

  return (
    <div style={{ width: '98.5vw', height: '100vh', backgroundColor: '#fff' }}>
      <Carousel
        responsive={responsive}
        infinite={true}
        showDots={true}
        containerClass="carousel-container"
        dotListClass="custom-dot-list"
        itemClass="carousel-item"
        arrows={true}
      >
        {[Img, Img2, Img3, Img4, Img5].map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Imagen ${index + 1}`}
            className="w-screen h-screen object-cover rounded-none"
          />
        ))}
      </Carousel>


       <style>
        {`
          /* Tailwind CSS styling applied using @apply */
          .custom-dot-list {
            @apply bottom-6 flex justify-center space-x-6 !important;
          }
          .custom-dot-list .react-multi-carousel-dot {
            @apply bg-gray-400 w-3 h-3 rounded-full transition-colors duration-300 ease-in-out border-0 cursor-pointer;
          }
          .custom-dot-list .react-multi-carousel-dot--active {
            @apply bg-black w-4 h-4;
          }
          .custom-dot-list .react-multi-carousel-dot:hover {
            @apply bg-gray-700;
          }
        `}
      </style>
    </div>
  );
};

