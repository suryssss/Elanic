import React from 'react'
import { Link } from 'react-router'
import heroimg from '../../assets/omid-pasha-BpGX8ajwr18-unsplash.jpg'

const Hero = () => {
  return (
    <section className="w-full mb-15">
  <div
    className="w-full bg-[#f4a3a7] flex items-center justify-between 
               min-h-[340px] px-6"
  >
    {/* LEFT CONTENT */}
    <div className="space-y-4 max-w-md ml-20">
      <p className="text-[20px] md:text-[40px] font-bold tracking-tight">
        Discover Timeless <br /> Elegance in Every Collection
      </p>

      <Link
        to="/collections/all"
        className="inline-block bg-black text-white text-xs md:text-sm px-4 py-2 tracking-wide uppercase"
      >
        Shop Now
      </Link>
    </div>

    {/* RIGHT IMAGE */}
    <img
      src={heroimg}
      alt="Hero"
      className="w-[40%] md:w-[30%] h-[450px] object-cover mr-20 mt-10 translate-y-10"  // <-- right margin 20px ≈ mr-5
    />
  </div>
</section>

  )
}

export default Hero
