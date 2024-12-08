import React from "react";

const FeaturedArticles = () => {
  return (
    <section className="bg-gray-100 py-16 px-4">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">What Our Clients Say</h2>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {/* Testimonial 1 */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <div className="flex justify-center mb-4">
              <img
                src="https://via.placeholder.com/80"
                alt="Client 1"
                className="w-20 h-20 object-cover rounded-full border-2 border-gray-300"
              />
            </div>
            <p className="text-gray-600 mb-4">
              "The service provided was exceptional! I saw immediate results and
              could not be more satisfied."
            </p>
            <h4 className="text-xl font-semibold">Imam Ali</h4>
            <p className="text-gray-500">Leader, Muslim Community</p>
          </div>

          {/* Testimonial 2 */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <div className="flex justify-center mb-4">
              <img
                src="https://via.placeholder.com/80"
                alt="Client 2"
                className="w-20 h-20 object-cover rounded-full border-2 border-gray-300"
              />
            </div>
            <p className="text-gray-600 mb-4">
              "Amazing experience! The team really listened to our needs and
              delivered top-notch results."
            </p>
            <h4 className="text-xl font-semibold">Malala Yousafzai</h4>
            <p className="text-gray-500">Activist, Nobel Laureate</p>
          </div>

          {/* Testimonial 3 */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <div className="flex justify-center mb-4">
              <img
                src="https://via.placeholder.com/80"
                alt="Client 3"
                className="w-20 h-20 object-cover rounded-full border-2 border-gray-300"
              />
            </div>
            <p className="text-gray-600 mb-4">
              "Highly recommend! The professionalism and attention to detail
              exceeded our expectations."
            </p>
            <h4 className="text-xl font-semibold">Rania Al-Abdullah</h4>
            <p className="text-gray-500">Queen, Jordan</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedArticles;
