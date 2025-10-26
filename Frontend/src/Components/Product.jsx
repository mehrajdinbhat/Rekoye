// import React from "react";

// const products = [
//   {
//     id: 1,
//     name: "Alexit-M",
//     description: "Pain relief and anti-inflammatory medicine.",
//     img: "/hero1.jpg",
//   },
//   {
//     id: 2,
//     name: "Cefaxin",
//     description: "Antibiotic for various bacterial infections.",
//     img: "/hero.jpg",
//   },
//   {
//     id: 3,
//     name: "NeuroCalm",
//     description: "CNS medication for neurological support.",
//     img: "/hero2.jpg",
//   },
//   {
//     id: 4,
//     name: "CardioSafe",
//     description: "Heart health and blood pressure support.",
//     img: "/hero3.jpg",
//   },
//     {
//     id: 5,
//     name: "Alexit-M",
//     description: "Pain relief and anti-inflammatory medicine.",
//     img: "/hero1.jpg",
//   },
//   {
//     id: 6,
//     name: "Cefaxin",
//     description: "Antibiotic for various bacterial infections.",
//     img: "/hero.jpg",
//   },
//   {
//     id: 7,
//     name: "NeuroCalm",
//     description: "CNS medication for neurological support.",
//     img: "/hero2.jpg",
//   },
//   {
//     id: 8,
//     name: "CardioSafe",
//     description: "Heart health and blood pressure support.",
//     img: "/hero3.jpg",
//   },
//     {
//     id: 9,
//     name: "Alexit-M",
//     description: "Pain relief and anti-inflammatory medicine.",
//     img: "/hero1.jpg",
//   },
//   {
//     id: 10,
//     name: "Cefaxin",
//     description: "Antibiotic for various bacterial infections.",
//     img: "/hero.jpg",
//   },
//   {
//     id: 11,
//     name: "NeuroCalm",
//     description: "CNS medication for neurological support.",
//     img: "/hero2.jpg",
//   },
//   {
//     id: 12,
//     name: "CardioSafe",
//     description: "Heart health and blood pressure support.",
//     img: "/hero3.jpg",
//   },
  
// ];

// export default function Product() {
//   return (
//     <section className="py-20 bg-sky-50">
//       <div className="max-w-6xl mx-auto px-4 md:px-8">
//         <h2 className="text-4xl font-bold text-sky-800 mb-12 text-center">
//           Our Products
//         </h2>

//         <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
//           {products.map((product) => (
//             <div
//               key={product.id}
//               className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
//             >
//               <img
//                 src={product.img}
//                 alt={product.name}
//                 className="w-full h-48 object-cover"
//               />
//               <div className="p-4">
//                 <h3 className="text-xl font-semibold text-sky-800 mb-2">
//                   {product.name}
//                 </h3>
//                 <p className="text-gray-700">{product.description}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }


import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch all products from backend
  const fetchProducts = async () => {
    try {
      const { data } = await axios.get("http://localhost:4001/api/products");
      setProducts(data);
    } catch (error) {
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-6">
      <h1 className="text-4xl font-extrabold text-center text-blue-700 mb-10">
        💊 Our Medicines
      </h1>

      {loading ? (
        <p className="text-center text-gray-600 text-lg">Loading products...</p>
      ) : products.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">
          No products available.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100 group"
            >
              {/* Product Image */}
              <div className="h-56 w-full overflow-hidden relative">
                <img
                  src={
                    product.images?.[0]?.url ||
                    "https://via.placeholder.com/300x200?text=Medicine"
                  }
                  alt={product.name}
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Product Info */}
              <div className="p-5">
                <h2 className="text-xl font-semibold text-gray-800 mb-1 truncate">
                  {product.name}
                </h2>
                <p className="text-gray-500 text-sm mb-2">
                  {product.category || "General Medicine"}
                </p>
                <p className="text-gray-700 text-sm mb-3 line-clamp-2">
                  {product.description || "No description available."}
                </p>

                {/* Price and Stock */}
                <div className="flex justify-between items-center mb-3">
                  <span className="text-blue-600 font-bold text-lg">
                    ₹{product.price}
                  </span>
                  <span
                    className={`text-sm font-medium ${
                      product.stock > 0 ? "text-green-600" : "text-red-500"
                    }`}
                  >
                    {product.stock > 0
                      ? `In Stock (${product.stock})`
                      : "Out of Stock"}
                  </span>
                </div>

                {/* Action Button */}
                <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-medium">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Products;
