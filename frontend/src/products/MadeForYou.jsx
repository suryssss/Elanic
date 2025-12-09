import React, { useState } from "react";
import img1 from "../assets/img1.jpg"
import img2 from "../assets/img2.jpg"
import img3 from "../assets/img3.jpg"


const MadeForYou = () => {
  // Replace these with your actual images
  const mainImages = [
    img1,
    img2,
  ];

  const thumbnailImages = [
    img1,
    img2,
  ];

  const smallImage = img3; // 👈 Add your small rectangle image here

  const [activeImg, setActiveImg] = useState(0);

  return (
    <section className="w-full py-20 px-6 lg:px-20 flex flex-col lg:flex-row justify-between items-start gap-12">

      {/* LEFT CONTENT */}
      <div className="flex-1 ml-[10px]">
        <p className="text-gray-700 mb-4 tracking-wide">Just Made For You</p>

        <h1 className="text-5xl font-serif font-bold leading-[1.1] mb-6">
          Made To Move <br /> With You
        </h1>

        <p className="text-sm text-gray-700 leading-relaxed max-w-sm mb-5 ml-98">
          Discover pieces designed to <br/>
          elevate your everyday mood. Crafted with <br/>
          with comfort, clarity, and timeless style.<br/>
          Made for every body and every moment.
        </p>

        {/* SMALL IMAGE (left small rectangle) */}
        <img
          src={smallImage}
          alt="Small visual"
          className="w-[250px] h-[300px] object-cover rounded-md bg-gray-300 ml-[380px]"
        />
      </div>

      {/* RIGHT CONTENT */}
      <div className="flex-1 relative flex justify-center items-center">

        {/* MAIN IMAGE */}
        <img 
          src={mainImages[activeImg]} 
          alt="Main display"
          className="w-[450px] h-[600px] object-cover rounded-md bg-gray-300 mr-[130px]"
        />

        {/* THUMBNAILS ON RIGHT */}
        <div className="absolute right-[-60px] top-1/2 -translate-y-1/2 flex flex-col gap-6 mr-[60px]">
          {thumbnailImages.map((thumb, index) => (
            <button
              key={index}
              onClick={() => setActiveImg(index)}
              className={`w-16 h-16 rounded-full overflow-hidden border-2 transition-all ${
                activeImg === index ? "border-black" : "border-transparent"
              }`}
            >
              <img 
                src={thumb} 
                alt="thumbnail"
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>

      </div>
    </section>
  );
};

export default MadeForYou;
