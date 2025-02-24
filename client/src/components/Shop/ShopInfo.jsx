import React from "react";
import { backend_url } from "../../server";
import { useSelector } from "react-redux";
import styles from "../../styles/style";
import { Link } from "react-router-dom";
const ShopInfo = ({ isOwner }) => {
  const { isLoading, seller } = useSelector((state) => state.seller);
  const logOutHandler = () => {
    console.log("Hello!");
  };
  return (
    <div>
      <div className="w-full py-5 ">
        <div className="flex items-center justify-center ">
          <img
            className="w-[150px] h-[150px] object-cover rounded-full "
            src={`${backend_url}/${seller.avatar}`}
            alt=""
          />
        </div>
        <h3 className="text-center py-2 text-[20px] ">{seller.name}</h3>
        <p className="text-[16px] text-[#000000a6] p-[10px] flex items-center">
          {seller.discription}
        </p>
      </div>
      <div className="p-3 ">
        <h5 className="font-[600]">Address:-</h5>
        <h4 className="text-[#000000a6]"> {seller.address}</h4>
      </div>
      <div className="p-3 ">
        <h5 className="font-[600]">Contact:-</h5>
        <h4 className="text-[#000000a6]"> +{seller.phoneNumber}</h4>
      </div>
      <div className="p-3 ">
        <h5 className="font-[600]">Total Products:-</h5>
        <h4 className="text-[#000000a6]"> 10</h4>
      </div>
      <div className="p-3 ">
        <h5 className="font-[600]">Shop Ratings:-</h5>
        <h4 className="text-[#000000a6]"> 10/10</h4>
      </div>
      <div className="p-3 ">
        <h5 className="font-[600]">Joined ON :-</h5>
        <h4 className="text-[#000000a6]">{seller.createdAt.slice(0, 10)}</h4>
      </div>
      {isOwner && (
        <div className="py-3 px-4">
          <Link to="/settings">
            <div
              className={`${styles.button} !w-full !h-[42px] !rounded-[5px]`}
            >
              <span className="text-white">Edit Shop</span>
            </div>
          </Link>
          <div className={`${styles.button} !w-full !h-[42px] !rounded-[5px]`}>
            <span className="text-white" onClick={logOutHandler}>
              Log Out
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
export default ShopInfo;
