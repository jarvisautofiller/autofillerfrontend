import React, { Suspense, lazy, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Switch, Navigate } from "react-router-dom";
import Header from "./headers/Header";
import Links from "./headers/Links";
import Home from "./pages/Home";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; // Import default CSS for toastify
import UserHomeScreen from "./pages/UserHomeScreen";
import Inventory from "./pages/Inventory";
import Purchaser from "./pages/Purchaser";
import CreatePurchaser from "./pages/CreatePurchaser";
import Cart from "./pages/Cart/Cart";
import Order from "./pages/Order";
import EachOrder from "./pages/EachOrder";
import HomePage from "./pages/Cart/home/HomePage";
import BarcodeScanner from "./pages/Scanner";
import BarcodeScannerLike from "./pages/BarcodeScannerLike";

const Login = lazy(() => import("./pages/Login/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const NotFound = lazy(() => import("./pages/NotFound"));
const App = () => {
  // useEffect(() => {
  //   const handleError = (event) => {
  //     event.preventDefault();
  //     sessionStorage.removeItem('userData');

  //     window.location.href = "/login";
  //   };

  //   window.addEventListener("error", handleError);

  //   return () => {
  //     window.removeEventListener("error", handleError);
  //   };
  // }, []);

  //it is navigating to login page, but still showing errors, i don't want to show any errors in frontend

  return (
    <div className="background">
      <Router>
        <Header />

        <Suspense fallback={<div>Loading...</div>}>
          <Routes>

            <Route path="/" element={<Login />} />
            <Route path="/homepage" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/homeScreen" element={<UserHomeScreen />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/Purchaser" element={<Purchaser />} />
            <Route path="/createPurchaser" element={<CreatePurchaser />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/Order" element={<Order />} />
            <Route path="/EachOrder" element={<EachOrder />} />
            <Route path="/test" element={<BarcodeScanner />} />
            <Route path='/scanner' element={<BarcodeScannerLike />} />
            {/* <Route path="/" element={<Navigate to="/login" />} /> */}
          </Routes>
        </Suspense>
        {/* <ToastContainer 
        position="top-center" 
        autoClose={1000} 
        hideProgressBar={true} 
        closeOnClick 
        // pauseOnHover  
        theme="colored" 
      /> */}
      </Router>
      <ToastContainer />
    </div>
  );
};

export default App;
