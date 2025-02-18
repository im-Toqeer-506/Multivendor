import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { server } from "../server";

const ActivationPage = () => {
  const { activation_token } = useParams();
  const [error, setError] = useState(false);

  useEffect(() => {
    if (activation_token) {
      const sendRequest = async () => {
        await axios
          .post(`${server}/shop/activation`, {
            activation_token,
          })
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            setError(true);
          });
      };
      sendRequest();
    }
  }, []);

  return (
    <div className="flex items-center justify-center h-screen w-full bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        {error ? (
          <p className="text-red-500 font-semibold text-lg">
            Your token is expired!
          </p>
        ) : (
          <p className="text-green-600 font-semibold text-lg">
            Your account has been created successfully!
          </p>
        )}
      </div>
    </div>
  );
};

export default ActivationPage;
