import { useEffect, useState } from "react";
import axios from "axios";

const TeamSection = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    (async () => {
      try {
        const url = `${import.meta.env.VITE_BACKEND}/blog/team/read`;
        const response = await axios.get(url);
        setTeams(response.data.team);
        setLoading(false); 
      } catch (error) {
        setLoading(false); 
      }
    })();
  }, []);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">Our Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading
            ? Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="bg-gray-100 p-6 rounded-lg shadow-lg animate-pulse"
                >
                  <div className="w-40 h-40 bg-gray-300 rounded-full mx-auto mb-4"></div>
                  <div className="w-3/4 h-6 bg-gray-300 rounded mx-auto mb-2"></div>
                  <div className="w-1/2 h-4 bg-gray-300 rounded mx-auto"></div>
                </div>
              ))
            : teams.map((member) => (
                <div
                  key={member._id}
                  className="bg-white p-6 rounded-lg shadow-lg text-center"
                >
                  <img
                    src={member.profileImageUrl}
                    alt={member.name}
                    className="w-40 h-40 object-cover rounded-full mx-auto mb-4"
                  />
                  <h3 className="text-xl font-semibold">{member.name}</h3>
                  <p className="text-gray-600 mt-2">{member.role}</p>
                  <p className="text-gray-500 mt-2">{member.description}</p>
                </div>
              ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
