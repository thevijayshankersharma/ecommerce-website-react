// Components/Carousel.jsx
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

const CarouselComponent = () => {
  const slides = [
    {
      img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600",
      title: "Summer Sale!",
      subtitle: "Up to 50% Off on Fashion",
      btnText: "Shop Now"
    },
    {
      img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1600",
      title: "Flash Sale Ends Soon!",
      subtitle: "Don't Miss Out – Limited Stock",
      btnText: "Grab Deals"
    }
  ];

  return (
    <div className="-mt-4 mb-12">
      <Carousel 
        autoPlay 
        infiniteLoop 
        showThumbs={false} 
        showStatus={false} 
        interval={4000} 
        transitionTime={800}
      >
        {slides.map((slide, i) => (
          <div key={i} className="relative h-64 md:h-96 overflow-hidden">
            <img 
              src={slide.img} 
              alt={slide.title} 
              className="w-full h-full object-cover brightness-75" 
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
              <h2 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-2xl">
                {slide.title}
              </h2>
              <p className="text-xl md:text-3xl mb-8 drop-shadow-lg">
                {slide.subtitle}
              </p>
              <button className="bg-white text-red-600 px-8 py-4 rounded-full font-bold text-lg hover:scale-110 transition shadow-2xl">
                {slide.btnText}
              </button>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default CarouselComponent;