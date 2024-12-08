const HeroSection = () => {
  return (
    <section className="relative bg-gray-900 text-white h-screen flex items-center">
      <div className="absolute inset-0">
        <img
          src="https://via.placeholder.com/1600x900.png?text=Lie+Blog"
          alt="Hero Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>{" "}
      </div>

      <div className="relative z-10 container mx-auto px-6 sm:px-12 lg:px-20 text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
          Discover Inspiring Stories
        </h1>
        <p className="mt-4 text-lg sm:text-xl lg:text-2xl text-gray-300">
          Dive into the latest trends, news, and insights on our blog platform.
        </p>
        <div className="mt-6 flex justify-center space-x-4">
          <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-lg font-bold shadow-md transition transform hover:-translate-y-1">
            Explore Now
          </button>
          <button className="px-8 py-3 border-2 border-gray-300 text-white hover:bg-gray-700 rounded-full text-lg font-bold transition">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
