import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';

const CATEGORIES = ['sports', 'health', 'science', 'business', 'technology'];
const API_URL = 'https://newzback-2.onrender.com/api/headlines';

function Home() {
  const [headlinesByCategory, setHeadlinesByCategory] = useState({});
  const token = localStorage.getItem('jwt');

  useEffect(() => {
    const fetchCategoryHeadlines = async () => {
      const result = {};
      for (const category of CATEGORIES) {
        try {
          const res = await fetch(`${API_URL}?category=${category}&country=in`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const data = await res.json();
          result[category] = data.articles.slice(0, 8);
        } catch (err) {
          console.error(`Error fetching ${category} news`, err);
        }
      }
      setHeadlinesByCategory(result);
    };

    fetchCategoryHeadlines();
  }, []);

  return (
    <div className="bg-[#0e1b2b] min-h-screen text-white w-screen overflow-x-hidden">
      <Navbar />
      <div className="mt-16 px-6 py-10 space-y-16">
        {CATEGORIES.map((category) => (
          <div key={category}>
            <h2 className="text-2xl font-bold capitalize mb-4 pl-2 text-cyan-400 tracking-wide">
              {category}
            </h2>

            <div className="relative overflow-hidden w-full">
              {headlinesByCategory[category] && (
                <div className="flex animate-marquee gap-6 w-max">
                  {Array(2)
                    .fill(headlinesByCategory[category])
                    .flat()
                    .map((article, index) => (
                      <div
                        key={index}
                        className="w-80 h-52 bg-gradient-to-br from-[#1f3b4d] via-[#204050] to-[#2b3f5f] rounded-2xl p-4 shadow-lg flex-shrink-0 border border-cyan-500/10 hover:scale-105 transition-transform duration-300"
                      >
                        <h3 className="font-semibold text-lg text-cyan-200 line-clamp-2">{article.title}</h3>
                        <p className="text-sm mt-2 text-blue-100 line-clamp-2">{article.description}</p>
                      </div>
                    ))}
                </div>
              )}

              {/* Fading edges */}
              <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#0e1b2b] via-[#0e1b2b]/90 to-transparent pointer-events-none" />
              <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#0e1b2b] via-[#0e1b2b]/90 to-transparent pointer-events-none" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
