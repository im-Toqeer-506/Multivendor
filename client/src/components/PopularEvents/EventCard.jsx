import React, { useEffect, useState } from "react";
import styles from "../../styles/style";
import CountDown from "./CountDown";

const EventCard = ({ active }) => {
  return (
    <div
      className={`w-full block bg-white ${active? "unset" :"mb-12" } rounded-lg
     lg:flex p-2 `}
    >
      <div className="w-full lg:w-[50%] m-auto ">
        <img
          src="https://m.media-amazon.com/images/I/513FAMDqgXL.__AC_SX300_SY300_QL70_FMwebp_.jpg"
          alt="Event Image"
        />
      </div>
      <div className="w-full lg:w-[50%] flex flex-col justify-center">
        <h2 className={`${styles.productTitle} `}>
          Iphone 14 Pro Max (8/256)GB SSD
        </h2>
        <p>
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout. The point of
          using Lorem Ipsum is that it has a more-or-less normal distribution of
          letters, as opposed to using 'Content here, content here', making it
          look like readable English. Many desktop publishing packages and web
          page editors now use Lorem Ipsum as their default model text, and a
          search for 'lorem ipsum' will uncover many web sites still in their
          infancy.
        </p>
        <div className="flex py-2 justify-between">
          <div className="flex">
            <h5 className="font-[500] text-[18px] text-[#d55b45] pr-3 line-through">
              1099$
            </h5>
            <h5 className="font-bold text-[20px] text-[#333] font-Roboto ">
              999$
            </h5>
          </div>
          <span className="pr-3 font-[400] text-[17px] text-[#44a55e] ">
            120 Sold
          </span>
        </div>
        <CountDown />
      </div>
    </div>
  );
};

export default EventCard;
