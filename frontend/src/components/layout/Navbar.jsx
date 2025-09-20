import React, { useState } from "react";
import { Link } from "react-router";
import { HiOutlineUser, HiOutlineShoppingBag, HiBars3, HiXMark } from "react-icons/hi2";
import SearchBar from "../common/SearchBar";
import CartScroller from "../common/CartScroller";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const [cartOpen, setCartOpen] = useState(false);

  const toggleCart = () => {
    setCartOpen(!cartOpen);
  };

  return (
    <>
      <nav className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo */}
        <div>
          <Link to="/" className="text-2xl font-medium">
            Elanic
          </Link>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6">
          <Link
            to="collections/all"
            className="text-gray-700 hover:text-black text-sm font-medium uppercase transition-colors"
          >
            Men
          </Link>
          <Link
            to="#"
            className="text-gray-700 hover:text-black text-sm font-medium uppercase transition-colors"
          >
            Women
          </Link>
          <Link
            to="#"
            className="text-gray-700 hover:text-black text-sm font-medium uppercase transition-colors"
          >
            Blogs
          </Link>
          <Link
            to="#"
            className="text-gray-700 hover:text-black text-sm font-medium uppercase transition-colors"
          >
            Contact
          </Link>
        </div>

        {/* Icons */}
        <div className="flex items-center space-x-4">
          {/* Search Bar - hidden on small */}
          <div className="hidden md:block">
            <SearchBar />
          </div>

          <button className="hover:text-black relative" onClick={toggleCart}>
            <HiOutlineShoppingBag className="h-5 w-5" />
            <span className="absolute -top-1 -right-2 bg-[#ea2e0e] text-white text-xs rounded-full px-1.5 py-0.2">
              2
            </span>
          </button>

          <Link to="/profile" className="hover:text-black">
            <HiOutlineUser className="h-5 w-5" />
          </Link>

          {/* Hamburger Menu */}
          <button
            className="md:hidden hover:text-black"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <HiXMark className="h-6 w-6" /> : <HiBars3 className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-lg px-6 py-4 space-y-4">
          <SearchBar />
          <Link to="#" className="block text-gray-700 hover:text-black uppercase">
            Men
          </Link>
          <Link to="#" className="block text-gray-700 hover:text-black uppercase">
            Women
          </Link>
          <Link to="#" className="block text-gray-700 hover:text-black uppercase">
            Blogs
          </Link>
          <Link to="#" className="block text-gray-700 hover:text-black uppercase">
            Contact
          </Link>
        </div>
      )}
      <CartScroller isOpen={cartOpen} toggleCart={toggleCart}/>
    </>
  );
};

export default Navbar;
