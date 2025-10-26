import React from "react";

export default function Director() {
  return (
    <section className="py-20 bg-sky-50">
      <div className="max-w-6xl mx-auto px-4 md:px-8 text-center">
        <h2 className="text-4xl font-bold text-sky-800 mb-12">
          Our Managing Director
        </h2>

        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          {/* Image */}
          <div className="md:w-1/3">
            <img
              src="/public/hero.jpg"
              alt="Managing Director"
              className="rounded-lg shadow-lg w-full object-cover"
            />
          </div>

          {/* Text */}
          <div className="md:w-2/3 text-left">
            <h3 className="text-3xl font-semibold text-sky-800 mb-4">
              Dr. John Smith
            </h3>
            <p className="text-gray-700 mb-4">
              Dr. John Smith has been leading our pharmaceutical company for over 20 years, driving innovation, research, and a commitment to quality. His vision ensures that we deliver safe and effective medicines to patients worldwide.
            </p>
            <p className="text-gray-700">
              Under his leadership, the company has expanded its global reach, established partnerships with healthcare institutions, and maintained the highest standards of manufacturing and research.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
