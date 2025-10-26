import React from "react";
import Navbar from "./Navbar";       // 👈 one level up
import Footer from "./Footer";
import HeroCarousel from "./HeroCarousel";
import Littleabout from "./Littleabout";
import Product from "./Product";
import Stats from "./Stats";        // watch the case!
import Director from "./Director";

function Home() {
  return (
    <>
      <Navbar />
      <HeroCarousel />
      <Littleabout />
      <Product />
      <Stats />
      <Director />
      <Footer />
    </>
  );
}

export default Home;
