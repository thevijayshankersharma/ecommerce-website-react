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
    <div className="mt-20">
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        interval={5000}
        transitionTime={1000}
        showArrows={false}
      >
        {slides.map((slide, i) => (
          <div key={i} className="relative h-[500px] md:h-[600px] w-full">
            <img
              src={slide.img}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent flex flex-col justify-center text-left text-white px-10 md:px-20">
              <h2 className="text-5xl md:text-7xl font-bold font-heading mb-4 drop-shadow-2xl animate-fade-in-up">
                {slide.title}
              </h2>
              <p className="text-xl md:text-3xl font-light mb-8 max-w-2xl drop-shadow-lg">
                {slide.subtitle}
              </p>
              <div>
                <button className="bg-red-500 text-white px-10 py-4 rounded-full font-bold text-lg shadow-lg hover:bg-red-600 hover:shadow-red-500/40 transition-all transform hover:-translate-y-1 active:scale-95">
                  {slide.btnText}
                </button>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default CarouselComponent;