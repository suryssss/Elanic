import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import { HiOutlineUser, HiOutlineShoppingBag, HiBars3, HiXMark } from "react-icons/hi2";
import SearchBar from "./SearchBar";
import CartScroller from "../layout/CartScroller";
import { useCart } from "../../context/CartContext";
import logo from "../../assets/Elanic.png";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const location = useLocation();
  const { totalItems } = useCart();

  const toggleCart = () => {
    setCartOpen(!cartOpen);
  };

  useEffect(() => {
    if (location.pathname === "/checkout" || location.pathname === "/order-confirmation") {
      setCartOpen(false);
    }
  }, [location.pathname]);

  return (
    <>
      <nav className="w-full border-b border-gray-200">
        <div className="container mx-auto flex items-center justify-between py-4 px-4 md:px-6">
          {/* Left: Search */}
          <div className="hidden md:flex flex-1 max-w-md">
            <SearchBar variant="navbar" />
          </div>

          {/* Logo */}
          <div className="flex-shrink-0 flex items-center justify-center px-4">
            <Link to="/" className="block">
              <img src={logo}
               alt="Elanic logo"
               height={40} 
               width={200}
               className="h-10 mr-60 w-auto object-contain" />
            </Link>
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-3">
            <Link to="/admin" className="hidden md:block text-white text-xs bg-black px-3 py-1 rounded-full">
              Admin
            </Link>
            <button
              className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition relative"
              onClick={toggleCart}
              aria-label="Open cart"
            >
              <HiOutlineShoppingBag className="h-5 w-5 text-gray-700" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#ea2e0e] text-white text-xs rounded-full px-1.5 py-0.5">
                  {totalItems}
                </span>
              )}
            </button>

            <Link
              to="/profile"
              className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition"
              aria-label="Profile"
            >
              <HiOutlineUser className="h-5 w-5 text-gray-700" />
            </Link>

            {/* Hamburger Menu */}
            <button
              className="md:hidden h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <HiXMark className="h-5 w-5" /> : <HiBars3 className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Secondary links */}
        <div className="hidden md:flex justify-center space-x-36 pb-4 text-xs md:text-sm uppercase tracking-wide">
          <Link to="/collections/all?sort=new" className="font-semibold hover:text-black">
            What's New
          </Link>
          <Link to="/collections/all?gender=Men" className="font-semibold hover:text-black">
            Men
          </Link>
          <Link to="/collections/all?gender=Women" className="font-semibold hover:text-black">
            Women
          </Link>
          <Link to="/collections/all?sale=true" className="font-semibold text-[#ea2e0e] hover:text-[#c02108]">
            Sale
          </Link>
          <Link to="/blogs" className="font-semibold hover:text-black">
            Blogs
          </Link>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-lg px-4 py-4 space-y-4 border-b border-gray-200">
          <SearchBar variant="navbar" />
          <Link to="/collections/all?sort=new" className="block text-gray-700 hover:text-black uppercase">
            What's New
          </Link>
          <Link to="/collections/all?gender=Men" className="block text-gray-700 hover:text-black uppercase">
            Men
          </Link>
          <Link to="/collections/all?gender=Women" className="block text-gray-700 hover:text-black uppercase">
            Women
          </Link>
          <Link to="/collections/all?sale=true" className="block text-[#ea2e0e] hover:text-[#c02108] uppercase">
            Sale
          </Link>
          <Link to="/blogs" className="block text-gray-700 hover:text-black uppercase">
            Blogs
          </Link>
        </div>
      )}
      <CartScroller isOpen={cartOpen} toggleCart={toggleCart} />
    </>
  );
};

export default Navbar;
