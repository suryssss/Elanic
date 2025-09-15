
import React, { useEffect, useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Link } from "react-router";

const NewArrivals = () => {
  const sliderRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // drag state
  const [isDragging, setIsDragging] = useState(false);
  const isDraggingRef = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const products = [
    { _id: "1", name: "StylisH Jacket", price: 2000, image: [{ url: "https://picsum.photos/500/500?random=1" }] },
    { _id: "2", name: "StylisH Jacket", price: 2000, image: [{ url: "https://picsum.photos/500/800?random=2" }] },
    { _id: "3", name: "StylisH Jacket", price: 2000, image: [{ url: "https://picsum.photos/500/500?random=3" }] },
    { _id: "4", name: "StylisH Jacket", price: 2000, image: [{ url: "https://picsum.photos/500/500?random=4" }] },
    { _id: "5", name: "StylisH Jacket", price: 2000, image: [{ url: "https://picsum.photos/500/500?random=5" }] },
    { _id: "6", name: "StylisH Jacket", price: 2000, image: [{ url: "https://picsum.photos/500/500?random=6" }] },
    { _id: "7", name: "StylisH Jacket", price: 2000, image: [{ url: "https://picsum.photos/500/500?random=7" }] },
  ];

  // --- DRAG HANDLERS ---
  const handleMouseDown = (e) => {
    if (!sliderRef.current) return;
    e.preventDefault();
    setIsDragging(true);
    isDraggingRef.current = true;
    sliderRef.current.classList.add("grabbing");

    startX.current = e.pageX - sliderRef.current.offsetLeft;
    scrollLeft.current = sliderRef.current.scrollLeft;

    // add listeners on window so drag continues outside
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e) => {
    if (!isDraggingRef.current || !sliderRef.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5; // drag speed
    sliderRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const handleMouseUp = () => {
    if (!isDraggingRef.current) return;
    setIsDragging(false);
    isDraggingRef.current = false;
    if (sliderRef.current) {
      sliderRef.current.classList.remove("grabbing");
    }

    // cleanup listeners
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", handleMouseUp);
  };

  // --- SCROLL BUTTONS ---
  const scroll = (direction) => {
    const scrollAmount = direction === "left" ? -300 : 300;
    sliderRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  const updateScrollButtons = () => {
    const container = sliderRef.current;
    if (container) {
      const leftScroll = container.scrollLeft;
      const rightScrollable = container.scrollWidth > leftScroll + container.clientWidth;
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
    <section>
      <div className="container mx-auto text-center mb-10 relative">
        <h2 className="text-3xl font-bold mb-4">Explore New Arrivals</h2>
        <p className="text-lg text-gray-500 mb-8">
          Discover our latest arrivals with fast shipping
        </p>
        <div className="absolute right-0 bottom-[-30px] flex space-x-2">
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className={`p-2 rounded border bg-white text-black ${
              !canScrollLeft && "opacity-50 cursor-not-allowed"
            }`}
          >
            <FiChevronLeft className="text-2xl" />
          </button>
          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className={`p-2 rounded border bg-white text-black ${
              !canScrollRight && "opacity-50 cursor-not-allowed"
            }`}
          >
            <FiChevronRight className="text-2xl" />
          </button>
        </div>
      </div>

      <div
        ref={sliderRef}
        className="container mx-auto overflow-x-scroll flex space-x-6 relative scrollbar-hidden cursor-grab select-none"
        onMouseDown={handleMouseDown}
      >
        {products.map((product) => (
          <div
            key={product._id}
            className="min-w-[100%] sm:min-w-[50%] lg:min-w-[33.3333%] relative"
          >
            <img
              src={product.image[0].url}
              alt={product.name}
              className="w-full h-[500px] object-cover rounded-lg select-none pointer-events-none"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-opacity-50 backdrop-blur-md text-white p-4 rounded-b-lg">
              <Link to={`/products/${product._id}`} className="block">
                <h3 className="font-medium">{product.name}</h3>
                <p className="mt-1">₹{product.price}</p>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NewArrivals;
