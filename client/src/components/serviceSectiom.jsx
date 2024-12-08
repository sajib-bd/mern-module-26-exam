import { useEffect, useState } from "react";
import axios from "axios";

const ServicePage = () => {
  const [services, setServices] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const url = `${import.meta.env.VITE_BACKEND}/blog/service/read`;
        const response = await axios.get(url);
        setServices(response.data.service);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <section className="container mx-auto py-16 px-4">
      <h2 className="text-3xl font-bold text-center mb-8">Our Services</h2>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {services == null
          ? Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="bg-gray-100 shadow-lg rounded-lg p-6 animate-pulse"
              >
                <div className="w-full h-48 bg-gray-300 rounded-t-lg mb-4"></div>
                <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
              </div>
            ))
          : services.map((item) => (
              <div
                key={item._id}
                className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-all"
              >
                <img
                  src={
                    item.imageUrl ||
                    "https://via.placeholder.com/300x200.png?text=Service"
                  }
                  alt={item.name}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="mt-4 text-center">
                  <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
      </div>
    </section>
  );
};

export default ServicePage;
