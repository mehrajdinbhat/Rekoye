import React from "react";

const OurCompany = () => {
  return (
    <section className="bg-sky-50">
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-6 lg:px-24 py-20 flex flex-col md:flex-row items-center gap-10">
        <div className="md:w-1/2">
          <h1 className="text-4xl md:text-5xl font-extrabold text-sky-800 mb-4">
            About Rekoye Pharma
          </h1>
          <p className="text-gray-700 text-lg md:text-xl mb-6">
            At Rekoye, we are committed to improving lives through innovative and high-quality pharmaceutical products. Our mission is to deliver health solutions you can trust.
          </p>
          <button className="btn bg-sky-600 hover:bg-sky-700 text-white px-8 py-3 rounded-full shadow-lg transition-all duration-300">
            Learn More
          </button>
        </div>
        <div className="md:w-1/2">
          <img
            src="/company-hero.jpg"
            alt="Rekoye Pharma"
            className="rounded-2xl shadow-xl"
          />
        </div>
      </div>

      {/* Mission & Values */}
      <div className="max-w-6xl mx-auto px-6 lg:px-24 py-16 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="bg-white shadow-lg rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-sky-700 mb-3">Our Mission</h3>
          <p className="text-gray-600">
            To provide safe, effective, and accessible pharmaceutical products that enhance the quality of life for people worldwide.
          </p>
        </div>
        <div className="bg-white shadow-lg rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-sky-700 mb-3">Our Vision</h3>
          <p className="text-gray-600">
            To be a global leader in pharmaceutical innovation, known for integrity, excellence, and care.
          </p>
        </div>
        <div className="bg-white shadow-lg rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-sky-700 mb-3">Our Values</h3>
          <p className="text-gray-600">
            Integrity, innovation, patient-centricity, sustainability, and collaboration guide everything we do.
          </p>
        </div>
      </div>

      {/* Stats / Achievements */}
      <div className="bg-gradient-to-r from-green-50 to-sky-50 py-16">
        <div className="max-w-6xl mx-auto px-6 lg:px-24 grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          <div>
            <h2 className="text-4xl font-extrabold text-sky-800 mb-2">10+</h2>
            <p className="text-gray-700">Years of Excellence</p>
          </div>
          <div>
            <h2 className="text-4xl font-extrabold text-sky-800 mb-2">200+</h2>
            <p className="text-gray-700">Products Delivered</p>
          </div>
          <div>
            <h2 className="text-4xl font-extrabold text-sky-800 mb-2">50+</h2>
            <p className="text-gray-700">Team Members</p>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="max-w-6xl mx-auto px-6 lg:px-24 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-sky-800 mb-12">
          Meet Our Team
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          {[
            { name: "Dr. Mehraj Din", role: "Founder & CEO", img: "/team1.jpg" },
            { name: "Dr. Ayesha Bhat", role: "Chief Pharmacist", img: "/team2.jpg" },
            { name: "Mr. Rafiq Khan", role: "Head of Operations", img: "/team3.jpg" },
            { name: "Ms. Sana Ali", role: "Marketing Lead", img: "/team4.jpg" },
          ].map((member, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden text-center p-6">
              <img src={member.img} alt={member.name} className="w-32 h-32 mx-auto rounded-full mb-4 object-cover" />
              <h3 className="text-xl font-semibold text-sky-700">{member.name}</h3>
              <p className="text-gray-600">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurCompany;
