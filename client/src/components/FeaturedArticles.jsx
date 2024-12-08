import React from "react";

const testimonials = [
  {
    id: 1,
    image:
      "https://th.bing.com/th/id/OIP.ZdgxGCsBrij5LSkfgBQD6gHaE7?rs=1&pid=ImgDetMain",
    text: "The service provided was exceptional! I saw immediate results and could not be more satisfied.",
    name: "Imam Ali",
    position: "Leader, Muslim Community",
  },
  {
    id: 2,
    image:
      "https://th.bing.com/th/id/OIP.-bKqkBgAkOXjh1mGZXjgcgHaE7?rs=1&pid=ImgDetMain",
    text: "Amazing experience! The team really listened to our needs and delivered top-notch results.",
    name: "Malala Yousafzai",
    position: "Activist, Nobel Laureate",
  },
  {
    id: 3,
    image:
      "https://th.bing.com/th/id/OIP.eQJ9sQu94CV6q77Sk-2B6wHaE7?rs=1&pid=ImgDetMain",
    text: "Highly recommend! The professionalism and attention to detail exceeded our expectations.",
    name: "Rania Al-Abdullah",
    position: "Queen, Jordan",
  },
];

const FeaturedArticles = () => {
  return (
    <section className="bg-gray-100 py-16 px-4">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">What Our Clients Say</h2>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white shadow-lg rounded-lg p-6"
            >
              <div className="flex justify-center mb-4">
                <img
                  src={testimonial.image}
                  alt={`Client ${testimonial.id}`}
                  className="w-20 h-20 object-cover rounded-full border-2 border-gray-300"
                />
              </div>
              <p className="text-gray-600 mb-4">{testimonial.text}</p>
              <h4 className="text-xl font-semibold">{testimonial.name}</h4>
              <p className="text-gray-500">{testimonial.position}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedArticles;
