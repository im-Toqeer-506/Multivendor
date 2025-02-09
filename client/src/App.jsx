import React, { useEffect } from "react";
import "./App.css";
import { ToastContainer, Bounce, toast } from "react-toastify";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import {
  LoginPage,
  SignupPage,
  ActivationPage,
  HomePage,
  ProductsPage,
  BestSelling,
  Events,
  FaqPage,
} from "./routes/Routes.jsx";
import Store from "./redux/store.js";
import { getUser } from "./redux/actions/user.js";
import { useSelector } from "react-redux";
const App = () => {
  // const { loading } = useSelector((state) => state.user);
  useEffect(() => {
    Store.dispatch(getUser());
  }, []);
  return (
    <>
      {/* {loading ? null : ( */}
        <>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/activation/:token" element={<ActivationPage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/best-selling" element={<BestSelling />} />
              <Route path="/events" element={<Events />} />
              <Route path="/faq" element={<FaqPage />} />
            </Routes>
          </BrowserRouter>
          <ToastContainer
            transition={Bounce}
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </>
      {/* )} */}
    </>
  );
};

export default App;
