import React from 'react'
import { IoLogoInstagram } from "react-icons/io";
import { RiTwitterXLine } from "react-icons/ri";
import { FaFacebookF } from "react-icons/fa";

const socials = [
  { href: "#", icon: <FaFacebookF className="h-5 w-5" />, label: "Facebook" },
  { href: "#", icon: <IoLogoInstagram className="h-5 w-5" />, label: "Instagram" },
  { href: "#", icon: <RiTwitterXLine className="h-5 w-5" />, label: "Twitter" },
];

const Topbar = () => {
  return (
    <div className="bg-[#ea2e0e] text-white py-3 px-4 relative ">
      <div className="container mx-auto flex items-center space-x-6">
        <div className="hidden md:flex items-center gap-2 pl-6">
          {socials.map((social, index) => (
            <a 
              key={index} 
              href={social.href} 
              aria-label={social.label}
              className="hover:text-gray-300 transition-colors"
            >
              {social.icon}
            </a>
          ))}
        </div>
        <div className="absolute left-1/2 transform -translate-x-1/2 text-xs sm:text-sm md:text-base text-center whitespace-nowrap">
          <span>Free shipping on all orders over ₹1199</span>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
