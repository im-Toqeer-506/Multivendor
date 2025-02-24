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
  ProductDetailsPage,
  BestSelling,
  Events,
  FaqPage,
  ProfilePage,
  ShopCreatePage,
  SellerActivationPage,
  ShopLoginPage,
} from "./routes/Routes.jsx";
import ProtectedRoute from "./routes/ProtectedRoutes.jsx";
import { ShopDashboardPage } from "./routes/ShopRoutes.js";
import { ShopHomePage } from "./routes/ShopRoutes.jsx";
import Store from "./redux/store.js";
import { getSeller, getUser } from "./redux/actions/user";
import SellerProtectedRoute from "./routes/SellerProtectedRoute.jsx";
const App = () => {
  useEffect(() => {
    Store.dispatch(getUser());
    Store.dispatch(getSeller());
  }, []);

  return (
    <>
      <>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route
              path="/activation/:activation_token"
              element={<ActivationPage />}
            />
            <Route
              path="seller/activation/:activation_token"
              element={<SellerActivationPage />}
            />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/product/:name" element={<ProductDetailsPage />} />
            <Route path="/best-selling" element={<BestSelling />} />
            <Route path="/events" element={<Events />} />
            <Route path="/faq" element={<FaqPage />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
            {/* Shop Routes are Here  */}
            <Route path="/shop-create" element={<ShopCreatePage />} />
            <Route path="/shop-login" element={<ShopLoginPage />} />
            <Route
              path="/shop/:id"
              element={
                <SellerProtectedRoute>
                  <ShopHomePage />
                </SellerProtectedRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <SellerProtectedRoute>
                  <ShopDashboardPage />
                </SellerProtectedRoute>
              }
            />
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
    </>
  );
};

export default App;
