import React, { useEffect, useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Link } from "react-router";
import axios from "axios";

const NewArrivals = () => {
  const sliderRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const [isDragging, setIsDragging] = useState(false);
  const isDraggingRef = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const [newArrivals, setNewArrivals] = useState([]);

  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/products/new-arrivals`
        );
        setNewArrivals(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchNewArrivals();
  }, []);

  const handleMouseDown = (e) => {
    if (!sliderRef.current) return;
    e.preventDefault();
    setIsDragging(true);
    isDraggingRef.current = true;
    sliderRef.current.classList.add("grabbing");

    startX.current = e.pageX - sliderRef.current.offsetLeft;
    scrollLeft.current = sliderRef.current.scrollLeft;

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e) => {
    if (!isDraggingRef.current || !sliderRef.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    sliderRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const handleMouseUp = () => {
    if (!isDraggingRef.current) return;
    setIsDragging(false);
    isDraggingRef.current = false;

    if (sliderRef.current) {
      sliderRef.current.classList.remove("grabbing");
    }

    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", handleMouseUp);
  };
  
  const scroll = (direction) => {
    const scrollAmount = direction === "left" ? -300 : 300;
    sliderRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  const updateScrollButtons = () => {
    const container = sliderRef.current;
    if (container) {
      const leftScroll = container.scrollLeft;
      const rightScrollable =
        container.scrollWidth > leftScroll + container.clientWidth;

      setCanScrollLeft(leftScroll > 0);
      setCanScrollRight(rightScrollable);
    }
  };

  useEffect(() => {
    const container = sliderRef.current;
    if (container) {
      container.addEventListener("scroll", updateScrollButtons);
      updateScrollButtons();
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", updateScrollButtons);
      }
    };
  }, []);

  return (
    <section className="py-16 px-4 lg:px-0">
  <div className="container mx-auto text-center mb-10">
    <h2 className="text-3xl font-bold mb-4">Explore New Arrivals</h2>
    <p className="text-lg text-gray-500 mb-8">
      Discover our latest arrivals with fast shipping
    </p>
  </div>

  {/* WRAPPER (relative to place arrows left/right) */}
  <div className="relative container mx-auto">

    {/* LEFT ARROW */}
    <button
      onClick={() => scroll("left")}
      disabled={!canScrollLeft}
      className={`absolute left-2 top-1/2 -translate-y-1/2 p-3 bg-white shadow-lg rounded-full z-20 ${
        !canScrollLeft && "opacity-50 cursor-not-allowed"
      }`}
    >
      <FiChevronLeft className="text-2xl" />
    </button>

    {/* RIGHT ARROW */}
    <button
      onClick={() => scroll("right")}
      disabled={!canScrollRight}
      className={`absolute right-2 top-1/2 -translate-y-1/2 p-3 bg-white shadow-lg rounded-full z-20 ${
        !canScrollRight && "opacity-50 cursor-not-allowed"
      }`}
    >
      <FiChevronRight className="text-2xl" />
    </button>

    {/* CAROUSEL */}
    <div
      ref={sliderRef}
      className={`overflow-x-scroll flex space-x-6 scrollbar-hidden ${
        isDragging ? "cursor-grabbing" : "cursor-grab"
      } select-none`}
      onMouseDown={handleMouseDown}
    >
      {newArrivals.map((product) => (
        <div
        key={product._id}
        className="min-w-[260px] md:min-w-[300px] lg:min-w-[350px] flex flex-col"
      >
        <img
          src={product?.images?.[0]?.url || "/placeholder.jpg"}
          alt={product.name}
          className="w-full h-[420px] object-cover rounded-lg pointer-events-none"
        />
      
        {/* TEXT BELOW IMAGE */}
        <Link to={`/products/${product._id}`} className="mt-3 block text-left">
          <h3 className="text-[16px] font-medium text-black">
            {product.name}
          </h3>
          <p className="text-[15px] text-black mt-1">
            ${product.price}
          </p>
        </Link>
      </div>
      
      ))}
    </div>
  </div>
</section>

  );
};

export default NewArrivals;
