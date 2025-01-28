import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LoginPage, SignupPage,ActivationPage } from "./routes/Routes.jsx";
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/activation/:activation_token" element={<ActivationPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
