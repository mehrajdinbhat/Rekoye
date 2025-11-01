import React from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Home from "./Components/Home.jsx";
import Products from "./Components/Products.jsx";
import Contacts from "./contacts/Contacts.jsx";
import Queries from "./dashboard/Queries.jsx"; 
import AdminLogin from "./dashboard/AdminLogin.jsx";
import AdminDashboard from "./dashboard/AdminDashboard.jsx";
import CreateProduct from "./dashboard/CreateProduct.jsx";
import AdminProducts from "./dashboard/adminProducts.jsx";
import EditProduct from "./dashboard/editProduct.jsx";
import ProductDetail from "./Components/detail.jsx";



function App() {
  const isAdmin = true; // set false to test restriction

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ourproducts" element={<Products />} />
        <Route path="/contact" element={<Contacts />} />
        <Route path="/queries" element={<Queries />} />
        <Route path="/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/create" element={<CreateProduct />} />
        <Route path="/admin/products" element={<AdminProducts />} />
        <Route path="/product/update/:id" element={<EditProduct />} />
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>
    </>
  );
}

export default App;
