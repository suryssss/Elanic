import React from "react";
import featured from "./../assets/banner.png";

const FeaturedProducts = () => {
  return (
    <section className="w-full mt-30">

      {/* Top Banner Section */}
      <div className="relative w-full h-[60vh] lg:h-[70vh] overflow-hidden">
        {/* Background Image */}
        <img
          src={featured}
          alt="Featured"
          className="w-full h-full object-cover"
        />

        {/* Text Overlay */}
        <div className="absolute right-10 top-1/2 -translate-y-1/2 text-white text-center lg:text-left">
          <h2 className="text-4xl lg:text-5xl font-light tracking-wide mb-6">
            New Season<br />Offers
          </h2>

          <button className="bg-white text-black px-8 py-3 text-lg shadow-md hover:bg-gray-100 transition-all">
            Shop now
          </button>
        </div>
      </div>

      {/* Bottom Description Section */}
      <div className="py-10 px-4 lg:px-0 bg-white text-center max-w-3xl mx-auto">
        <p className="text-lg text-gray-700 leading-relaxed">
          Discover high-quality, comfortable clothing that effortlessly blends
          fashion and function. Designed to make you look and feel great every day.
        </p>
      </div>

    </section>
  );
};

export default FeaturedProducts;
