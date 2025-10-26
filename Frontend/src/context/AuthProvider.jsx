import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4001/api/admin/profile",
          {
            withCredentials: true,
          }
        );
        setAdmin(data);
        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
      }
    };
    fetchAdmin();
  }, []);

  return (
    <AuthContext.Provider
      value={{ admin, setAdmin, isAuthenticated, setIsAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);




// import React from "react";
// import Navbar from "../Components/Navbar"; // 👈 one level up
// import Footer from "../Components/Footer";
// import HeroCarousel from "../Components/HeroCarousel";
// import Littleabout from "../Components/Littleabout";
// import Product from "../Components/Product";
// import Stats from "../Components/Stats"; // watch the case!
// import Director from "../Components/Director";

// function Home() {
//   return (
//     <>
//       <Navbar />
//       <HeroCarousel />
//       <Littleabout />
//       <Product />
//       <Stats />
//       <Director />
//       <Footer />
//     </>
//   );
// }

// export default Home;

