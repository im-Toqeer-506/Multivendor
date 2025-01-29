import React, { useEffect } from "react";
import "./App.css";
import { ToastContainer, Bounce, toast } from "react-toastify";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { LoginPage, SignupPage, ActivationPage } from "./routes/Routes.jsx";
import { server } from "./server.js";
import axios from "axios";
const App = () => {
  useEffect(() => {
    const fetchUser = async () => {
      try {
        await axios
          .get(`${server}/user/getuser`, {
            withCredentials: true,
          })
          .then((res) => {
            toast.success(res.data.message);
          });
      } catch (error) {
        toast.error(error.response?.data?.message || "An error occurred");
      }
    };
    fetchUser();
  }, []);
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route
            path="/activation/:activation_token"
            element={<ActivationPage />}
          />
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce}
        />
      </BrowserRouter>
    </div>
  );
};

export default App;
