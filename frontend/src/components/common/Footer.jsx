// WaveFooter.jsx
import React from "react";
// Import icons from lucide-react, renamed X to XIcon for clarity
import { Facebook, Instagram, X as XIcon } from "lucide-react";

const WaveFooter = () => {
  return (
    <footer className="relative bg-black text-white">
      {/* Wave SVG: This creates the curve effect between the page content (above, assumed white) 
        and the black footer content (below).
      */}
      <div className="w-full overflow-hidden leading-[0] bg-white">
  <svg
    viewBox="0 0 1440 180"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-[180px] block"
    preserveAspectRatio="none"
  >
    <path
      d="
        M0,60 
        C200,40 380,30 540,55 
        C720,85 960,95 1200,70 
        C1320,58 1440,60 1440,60 
        L1440,180 
        L0,180 
        Z
      "
      fill="#000"
    />
  </svg>
</div>

      <div className="relative z-10 container mx-auto px-6 lg:px-16 pt-0 pb-14"> 
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 items-start">
          <div className="lg:col-span-2">
            <h3 className="text-3xl font-serif mb-4">NewsLetter</h3>
            <p className="text-gray-300 text-sm mb-4 leading-relaxed max-w-sm">
              Be the first to hear about new arrivals, exclusive offers,<br/> and special events.<br/>
              Sign up and get 10% off your first order!
            </p>

            <form className="flex max-w-xs h-10"> 
              <label htmlFor="email" className="sr-only">Email</label>
              <input
                id="email"
                type="email"
                placeholder="Enter email"
                className="flex-1 px-3 bg-white text-black placeholder-gray-500 outline-none focus:ring-1 focus:ring-gray-300"
              />
              <button
                type="submit"
                className="bg-black text-white px-4 py-2 font-medium border border-white hover:bg-gray-800 transition"
                aria-label="Subscribe"
              >
                subscribe
              </button>
            </form>
          </div>
          
          {/* Shop Links (1 column) */}
          <div className="text-sm text-gray-100 mt-2">
            <h4 className="font-medium mb-3 uppercase tracking-wider">Shop</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition">Men's clothing</a></li>
              <li><a href="#" className="hover:text-white transition">Women's clothing</a></li>
              <li><a href="#" className="hover:text-white transition">Kids clothing</a></li>
              <li><a href="#" className="hover:text-white transition">Accessories</a></li>
            </ul>
          </div>

          {/* Info Links */}
          <div className="text-sm text-gray-100 mt-2">
            <h4 className="font-medium mb-3 uppercase tracking-wider">Support</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition">Support Center</a></li>
              <li><a href="#" className="hover:text-white transition">About Us</a></li>
              <li><a href="#" className="hover:text-white transition">Blog</a></li>
              <li><a href="#" className="hover:text-white transition">Contact Us</a></li>
            </ul>
          </div>

          {/* Contact + Social  */}
          <div className="text-sm text-gray-100 mt-2">
            <h4 className="font-medium mb-3 uppercase tracking-wider">Follow Us</h4>

            {/* Social Icons */}
            <div className="flex items-center space-x-4 mb-6">
              <a href="#" aria-label="Facebook" className="hover:text-gray-300 transition">
                <Facebook size={20} />
              </a>
              <a href="#" aria-label="Instagram" className="hover:text-gray-300 transition">
                <Instagram size={20} />
              </a>
              <a href="#" aria-label="X (Twitter)" className="hover:text-gray-300 transition">
                <XIcon size={20} />
              </a>
            </div>

            {/* Contact Details */}
            <div className="space-y-1">
              <h4 className="font-medium mb-2 uppercase tracking-wider">Contact Us</h4>
              <div>Phone: (+91) 987-456-7890</div>
              <a href="mailto:info@elanix.com" className="hover:underline transition">Email: info@elanic.com</a>
            </div>
          </div>
        </div>

        <div className="mt-14 text-center">
          <h1 className="text-[7rem] sm:text-[9rem] md:text-[11rem] leading-none font-sans italic  tracking-widest font-extrabold select-none">
            ELANIC
          </h1>
        </div>
      </div>
    </footer>
  );
};

export default WaveFooter;