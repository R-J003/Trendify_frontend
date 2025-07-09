// frontend/src/components/home/HeroBanner.tsx

import Link from "next/link";

// Hero banner component - main landing page banner with CTA
const HeroBanner = () => {
  return (
    <section className="relative w-full h-[560px] rounded-lg overflow-hidden mb-12">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/hero-banner.jpg')" }}
      />

      {/* Overlay for text readability */}
      <div className="absolute inset-0 bg-black bg-opacity-20" />

      {/* Main content with centered text and CTA */}
      <div className="relative h-full flex flex-col items-center justify-center text-center text-white px-4">
        {/* Main heading */}
        <h1 className="text-4xl md:text-6xl font-extrabold drop-shadow-md">
          Elevate Your Style
        </h1>
        
        {/* Subtitle description */}
        <p className="mt-4 max-w-xl text-lg drop-shadow-sm">
          Discover the latest trends and timeless classics in fashion.
        </p>
        
        {/* Call-to-action button */}
        <Link
          href="/products"
          className="mt-8 px-8 py-3 rounded-md font-semibold text-white bg-indigo-500 hover:bg-indigo-600 transition-colors duration-300 transform hover:scale-105"
        >
          Shop Now
        </Link>
      </div>
    </section>
  );
};

export default HeroBanner;
