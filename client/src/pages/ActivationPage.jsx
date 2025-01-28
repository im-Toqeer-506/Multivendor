import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { server } from "../server";
import axios from "axios";

const ActivationPage = () => {
  const { activation_token } = useParams();
  const [error, setError] = useState(false);
  useEffect(() => {
    if (activation_token) {
      const activation_Email = async () => {
        try {
          const res = await axios.post(`${server}/user/activation`, {
            activation_token,
          });
          console.log(res.data.message); 
        } catch (error) {
          console.log(error.response?.data?.message || "An error occurred");
          setError(true); 
        }
      };
  
      activation_Email();
    }
  }, [activation_token]);
  
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent:"center",
      }}
    >
      {error ? (
        <p>Your Token is Expired!</p>
      ) : (
        <p>Your account has been created successfully!</p>
      )}
    </div>
  );
};

export default ActivationPage;