import React from "react";
import {
  FaTwitter,
  FaFacebook,
  FaInstagram,
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";
import {
  footerCompanyLinks,
  footerProductLinks,
  footerSupportLinks,
} from "../../static/data";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div className="text-white    bg-black ">
      <div className="md:flex md:justify-between md:items-center sm:px-12 px-4 bg-[#342ac8] py-7">
        <h1 className="lg:text-4xl font-semibold text-3xl md:mb-0 mb-6 lg:leading-normal md:w-2/5">
          <span className="text-[#56d879] ">Subscribe Us</span> for Get Latest
          News
          <br />
          events and offers
        </h1>
        <div>
          <input
            type="text"
            className="text-gray-800
                sm:w-72 w-full sm:mr-5 mr-1 lg:mb-0 mb-4 py-2.5 rounded px-2 focus:outline-none"
            required
            placeholder="Enter Your Email...."
          />
          <button className="bg-[#56d879] hover:bg-teal-500 duration-300 px-5 py-2.5 rounded-md text-white md:w-auto w-full">
            Submit
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:px-8 px-5 py-16 sm:text-center ">
        <ul className="px-5 text-center sm:text-start flex sm:block flex-col items-center">
          <img
            src="https://shopo.quomodothemes.website/assets/images/logo.svg"
            alt="logo-png"
            className="filter brightness-0 invert"
          />
          <br />
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          <div className="flex items-center gap-2 p-1 mt-[15px] ">
            <FaTwitter size={20} className="ml-4 cursor-pointer" />
            <FaGithub size={20} className="ml-4 cursor-pointer" />
            <FaInstagram size={20} className="ml-4 cursor-pointer" />
            <FaLinkedin size={20} className="ml-4 cursor-pointer" />
            <FaFacebook size={20} className="ml-4 cursor-pointer" />
          </div>
        </ul>
        <ul className="text-center sm:text-start ">
          <h1 className="mb-1 font-semibold  text-lg">Company</h1>
          {footerProductLinks &&
            footerProductLinks.map((i, index) => {
              return (
                <li key={index} className="flex flex-col">
                  <Link
                    className="text-gray-400 hover:text-teal-400 duration-300
                   text-sm cursor-pointer leading-6"
                    to={i.link}
                  >
                    {i.name}
                  </Link>
                </li>
              );
            })}
        </ul>
        <ul className="text-center sm:text-start ">
          <h1 className="mb-1 font-semibold  text-lg">Shop</h1>
          {footerCompanyLinks &&
            footerCompanyLinks.map((i, index) => {
              return (
                <li key={index} className="flex flex-col">
                  <Link
                    className="text-gray-400 hover:text-teal-400 duration-300
                   text-sm cursor-pointer leading-6"
                    to={i.link}
                  >
                    {i.name}
                  </Link>
                </li>
              );
            })}
        </ul>
        <ul className="text-center sm:text-start ">
          <h1 className="mb-1 font-semibold  text-lg">Support</h1>
          {footerSupportLinks &&
            footerSupportLinks.map((i, index) => {
              return (
                <li key={index} className="flex flex-col">
                  <Link
                    className="text-gray-400 hover:text-teal-400 duration-300
                   text-sm cursor-pointer leading-6"
                    to={i.link}
                  >
                    {i.name}
                  </Link>
                </li>
              );
            })}
        </ul>
      </div>
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10
         text-center pt-2 text-gray-400 text-sm pb-8"
      >
        <span>© Multivendor 2025. All rights reserved.</span>
        <span>Term Privacy. and Policy</span>
        <div className="sm:block flex items-center justify-center w-full">
          <img
            src="https://hamart-shop.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffooter-payment.a37c49ac.png&w=640&q=75"
            alt="payment-card"
          />
        </div>
      </div>
    </div>
  );
};

export default Footer;
