import React from "react";

export default function Littleabout() {
  return (
    <section className="py-20 bg-white ">
      <div className="max-w-6xl  mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center gap-12">
        {/* Image */}
        <div className="md:w-1/2">
          <img
            src="/public/hero3.jpg"
            alt="About Us"
            className="rounded-lg shadow-lg w-full object-cover"
          />
        </div>

        {/* Text Content */}
        <div className="md:w-1/2">
          <h2 className="text-4xl font-bold text-sky-800 mb-4">
            About Our Company
          </h2>
          <p className="text-lg text-gray-700 mb-6 ">
            We are a leading pharmaceutical company dedicated to delivering high-quality medicines and healthcare solutions to patients worldwide. Our mission is to innovate, research, and provide trusted products that improve lives every day.
          </p>
          <p className="text-lg text-gray-700">
            With a focus on research, quality, and global reach, we are committed to being a reliable partner in healthcare, ensuring that our products meet the highest standards.
          </p>
        </div>
      </div>
    </section>
  );
}
