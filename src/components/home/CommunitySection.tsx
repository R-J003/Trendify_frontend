// frontend/src/components/home/CommunitySection.tsx

const CommunitySection = () => {
  return (
    <section className="relative my-16 rounded-2xl overflow-hidden shadow-2xl">
      {/* Enhanced SVG Gradient Background matching hero section */}
      <div className="absolute inset-0 w-full h-full z-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          <defs>
            {/* Multi-stop gradient for richer, more vibrant appearance */}
            <linearGradient
              id="communityGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#c17a5a" />
              <stop offset="25%" stopColor="#b8704f" />
              <stop offset="50%" stopColor="#a0633f" />
              <stop offset="75%" stopColor="#8b5530" />
              <stop offset="100%" stopColor="#7a4a25" />
            </linearGradient>

            {/* Add subtle overlay for depth */}
            <linearGradient
              id="overlayGradient"
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              <stop offset="0%" stopColor="rgba(0,0,0,0.1)" />
              <stop offset="100%" stopColor="rgba(0,0,0,0.3)" />
            </linearGradient>
          </defs>

          <rect width="100%" height="100%" fill="url(#communityGradient)" />
          <rect width="100%" height="100%" fill="url(#overlayGradient)" />
        </svg>
      </div>

      {/* Decorative elements for visual interest */}
      <div className="absolute inset-0 z-0 opacity-20">
        {/* Floating circles for subtle decoration */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-xl opacity-30"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 bg-white rounded-full blur-lg opacity-20"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white rounded-full blur-md opacity-25"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center py-20 px-6">
        {/* Main heading with enhanced typography */}
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
          Join Our Fashion
          <span className="block bg-gradient-to-r from-yellow-200 to-orange-200 bg-clip-text text-transparent">
            Community
          </span>
        </h2>

        {/* Subtitle with better contrast and spacing */}
        <p className="mt-4 max-w-2xl text-lg md:text-xl text-white/90 leading-relaxed font-light">
          Stay updated on the latest trends, exclusive offers, and more.
          <span className="block mt-2 text-white/80">
            Be the first to discover new collections and insider deals.
          </span>
        </p>

        {/* Call-to-action button matching hero style */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <button className="px-8 py-4 bg-white text-amber-900 font-semibold rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg">
            Join Community
          </button>
          <button className="px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-amber-900 transition-all duration-300 transform hover:scale-105">
            Learn More
          </button>
        </div>

        {/* Additional engagement elements */}
        <div className="mt-12 flex items-center justify-center space-x-8 text-white/70">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
            <span className="text-sm">Latest Trends</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
            <span className="text-sm">Exclusive Offers</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-red-400 rounded-full"></div>
            <span className="text-sm">Style Tips</span>
          </div>
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400"></div>
    </section>
  );
};

export default CommunitySection;
