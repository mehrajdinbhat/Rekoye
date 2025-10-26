import React from "react";

export default function HeroCarousel() {
  return (
    <div className="w-full  pt-10 ">
      <div className="carousel w-full h-[80vh]">
        {/* Slide 1 */}
        <div id="slide1" className="carousel-item relative w-full">
          <img
            src="/public/hero.jpg"
            className="w-full object-cover"
            alt="Healthcare innovation"
          />
          <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center text-white px-6">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Welcome to Our Pharma World
            </h1>
            <p className="text-lg md:text-xl max-w-2xl mb-6">
              Delivering quality medicines with trust, innovation, and care.
            </p>
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Enquire Now
            </button>
          </div>
          <a
            href="#slide3"
            className="btn btn-circle absolute left-5 top-1/2 -translate-y-1/2"
          >
            ❮
          </a>
          <a
            href="#slide2"
            className="btn btn-circle absolute right-5 top-1/2 -translate-y-1/2"
          >
            ❯
          </a>
        </div>

        {/* Slide 2 */}
        <div id="slide2" className="carousel-item relative w-full">
          <img
            src="/public/hero1.jpg"
            className="w-full object-cover"
            alt="Global presence"
          />
          <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center text-white px-6">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Expanding Globally
            </h1>
            <p className="text-lg md:text-xl max-w-2xl mb-6">
              Bringing advanced healthcare solutions to international markets.
            </p>
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Learn More
            </button>
          </div>
          <a
            href="#slide1"
            className="btn btn-circle absolute left-5 top-1/2 -translate-y-1/2"
          >
            ❮
          </a>
          <a
            href="#slide3"
            className="btn btn-circle absolute right-5 top-1/2 -translate-y-1/2"
          >
            ❯
          </a>
        </div>

        {/* Slide 3 */}
        <div id="slide3" className="carousel-item relative w-full">
          <img
            src="/public/hero2.jpg"
            className="w-full object-cover"
            alt="Innovation in medicines"
          />
          <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center text-white px-6">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Innovation & Research
            </h1>
            <p className="text-lg md:text-xl max-w-2xl mb-6">
              Focused on improving lives through continuous R&D.
            </p>
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Explore Products
            </button>
          </div>
          <a
            href="#slide2"
            className="btn btn-circle absolute left-5 top-1/2 -translate-y-1/2"
          >
            ❮
          </a>
          <a
            href="#slide1"
            className="btn btn-circle absolute right-5 top-1/2 -translate-y-1/2"
          >
            ❯
          </a>
        </div>
      </div>
      <div className=" h-30">

      </div>
    </div>
  );
}
