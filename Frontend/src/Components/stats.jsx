import React from "react";

const stats = [
  { id: 1, title: "Products Manufactured", value: "120+" },
  { id: 2, title: "Countries Served", value: "15+" },
  { id: 3, title: "Years in Business", value: "25+" },
  { id: 4, title: "Trusted Clients", value: "500+" },
];

export default function Stats() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 md:px-8 text-center">
        <h2 className="text-4xl font-bold text-sky-800 mb-12">
          Our Achievements
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="bg-sky-50 p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <p className="text-4xl font-bold text-sky-700 mb-2">{stat.value}</p>
              <p className="text-gray-700 text-lg">{stat.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
