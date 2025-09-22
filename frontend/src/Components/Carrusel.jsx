import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import img1 from "../assets/img/img_main.webp"
import img2 from "../assets/img/img_2.jpg";
import img3 from "../assets/img/img_3.jpg";
import img4 from "../assets/img/img_4.jpg";
import img5 from "../assets/img/img_5.jpg"
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
        autoPlay={true}
        autoPlaySpeed={3000}        
        keyBoardControl={true}     
        transitionDuration={1000}  
      >
        {[img1, img2,img3,img4,img5].map((image, index) => (
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
  .custom-dot-list {
    position: absolute;
    bottom: 1.5rem;
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 1.5rem;
  }

  .custom-dot-list .react-multi-carousel-dot button {
  background-color: transparent;
  width: 12px;
  height: 12px;
  border-radius: 9999px;
  border: 2px solid #b91c1c; /* rojo-700 */
  cursor: pointer;
  transition: all 0.3s ease;
}


  .custom-dot-list .react-multi-carousel-dot--active button {
    background-color: #b91c1c !important;
    width: 16px;
    height: 16px;
  }

  .custom-dot-list .react-multi-carousel-dot:hover button {
    background-color: #555;
  }
`}
</style>

    </div>
  );
};

