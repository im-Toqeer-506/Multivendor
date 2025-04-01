import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../../styles/style";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from "react-icons/ai";

const ProductDetails = ({ data }) => {
  const [count, setCout] = useState(1);
  const [click, setClick] = useState(false);
  const [select, setSelect] = useState(0);
  const navigate = useNavigate();
  const incrementCount = () => {
    setCout(count + 1);
  };
  console.log(data);
  const decrementCount = () => {
    if (count > 1) {
      setCout(count - 1);
    }
  };
  const handleMessageSubmit = () => {
    navigate("/inbox/conversation=50nisnr44laaus");
  };
  return (
    <div className="bg-[#fff] ">
      {data ? (
        <div className={` ${styles.section} w-[90%] 800px:w-[80%] `}>
          <div className="w-[100%] py-5">
            <div className="block w-full 800px:flex  ">
              {/* left Part  */}
              <div className="w-full 800px:w-[50%]">
                <img
                  src={data.imageUrl[select].url}
                  className="w-[80%] "
                  alt=""
                />
                <div className="w-full 800px:w-[50%]">
                  <div className="w-full flex">
                    <div
                      className={`${
                        select === 0 ? "border" : "null"
                      } cursor-pointer p-6 mt-6`}
                    >
                      <img
                        src={data?.imageUrl[0].url}
                        alt=""
                        className="h-[200px] "
                        onClick={() => setSelect(0)}
                      />
                    </div>
                    <div
                      className={`${
                        select === 1 ? "border" : "null"
                      } cursor-pointer p-6 mt-6`}
                    >
                      <img
                        src={data?.imageUrl[1].url}
                        alt=""
                        className="h-[200px] "
                        onClick={() => setSelect(1)}
                      />
                    </div>
                  </div>
                </div>
              </div>
              {/* right Part */}
              <div className="w-full 800px:w-[50%] pt-5">
                <h1 className={`${styles.productTitle}`}>{data.name}</h1>
                <p>{`${data.description}`}</p>
                <div className="flex pt-3">
                  <h4 className={`${styles.productDiscountPrice}`}>
                    {data.discountPrice}$
                  </h4>
                  <h3 className={`${styles.price}`}>
                    {data.price ? data.price + "$" : null}
                  </h3>
                </div>
                {/* Quantity Handler */}
                <div className="flex items-center mt-12 justify-between pr-3 ">
                  <div>
                    <button
                      className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-md px-4 py-2 shadow-lg hover:opacity-95 transition duration-300 ease-in-out"
                      onClick={decrementCount}
                    >
                      -
                    </button>
                    <span className="bg-gray-200 text-gray-800 px-4 font-medium py-[11px] rounded-md ">
                      {count}
                    </span>
                    <button
                      className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-md px-4 py-2 shadow-lg hover:opacity-95 transition duration-300 ease-in-out"
                      onClick={incrementCount}
                    >
                      +
                    </button>
                  </div>
                  <div>
                    {click ? (
                      <AiFillHeart
                        size={20}
                        className="cursor-pointer "
                        onClick={() => setClick(!click)}
                        color={click ? "red" : "#333"}
                        title="Remove from wishlist"
                      />
                    ) : (
                      <AiOutlineHeart
                        size={20}
                        className="cursor-pointer "
                        onClick={() => setClick(!click)}
                        title="Add to wishlist"
                      />
                    )}
                  </div>
                </div>
                {/* Add to cart Button */}
                <div
                  className={`${styles.button} !rounded !mt-6 capitalize text-[#fff] font-semibold !h-11 flex items-center`}
                >
                  <span className="text-white flex items-center gap-2">
                    add to cart
                    <AiOutlineShoppingCart />
                  </span>
                </div>
                {/* Selller part */}
                <div className="flex items-center pt-8 space-x-4">
                  <Link to={`/shop/preview/${data.shop?._id}`}>
                    <img
                      className="w-[50px] h-[50px] rounded-full  mr-2"
                      src={`${data.shop.shopAvatar.url}`}
                      alt=""
                    />
                    {/* rating icons */}
                    <div className="pr-8">
                      <h3 className={`${styles.shop_name} pb-1 pt-1`}>
                        {data?.shop?.name}
                      </h3>
                      <h5 className="pb-3 text-[15px]">
                        ({data?.shop?.ratings}) Ratings
                      </h5>
                    </div>
                  </Link>

                  <div
                    className={`${styles.button} bg-[#6443d1] mt-4 !rounded !h-11 capitalize`}
                    onClick={handleMessageSubmit}
                  >
                    <span className="text-[#fff] flex items-center gap-2 ">
                      send message <AiOutlineMessage className="ml-1" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <br />
          <br />
          {/* Product Details and more Information */}
          <ProductsDetailsInfo data={data} />
        </div>
      ) : null}
    </div>
  );
};
const ProductsDetailsInfo = ({ data }) => {
  const [active, setActive] = useState(1);
  return (
    <div className="bg-[#f5f6fb] px-3 800px:px-10 py-2 rounded ">
      <div className="w-full flex justify-between border-b pt-10 pb-2">
        <div className="relative">
          <h5
            className={
              "text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
            }
            onClick={() => setActive(1)}
          >
            Product Details
          </h5>
          {active === 1 ? (
            <div className={`${styles.active_indicator}`}></div>
          ) : null}
        </div>
        <div className="relative">
          <h5
            className={
              "text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
            }
            onClick={() => setActive(2)}
          >
            Product Reviews
          </h5>
          {active === 2 ? (
            <div className={`${styles.active_indicator}`}></div>
          ) : null}
        </div>
        <div className="relative">
          <h5
            className={
              "text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
            }
            onClick={() => setActive(3)}
          >
            Seller Information
          </h5>
          {active === 3 ? (
            <div className={`${styles.active_indicator}`}></div>
          ) : null}
        </div>
      </div>
      {active === 1 ? (
        <>
          <p className="py-2 text-[10px] leading-8 pb-10 whitespace-pre-line">
            These premium wireless noise-canceling headphones deliver
            crystal-clear sound and deep bass, perfect for audiophiles and
            frequent travelers. The advanced noise-canceling technology blocks
            out background noise, allowing you to fully immerse yourself in your
            music or podcasts. With a long-lasting battery that offers up to 30
            hours of playback on a single charge, you can enjoy uninterrupted
            listening throughout the day. The sleek, ergonomic design ensures
            comfort, even during long listening sessions. Bluetooth connectivity
            makes pairing simple, while the foldable design offers easy
            portability for your on-the-go lifestyle.
          </p>
          <p className="py-2 text-[10px] leading-8 pb-10 whitespace-pre-line">
            Keep track of your fitness goals and overall health with the
            FitTrack Z5, a sleek and stylish fitness tracker that monitors your
            heart rate, steps, calories burned, sleep patterns, and more. The
            tracker syncs seamlessly with your smartphone via Bluetooth,
            allowing you to track your daily activities, set goals, and monitor
            your progress in real-time. It also offers detailed insights into
            your sleep quality, helping you optimize rest for better recovery.
            With a long-lasting battery and water resistance, the FitTrack Z5 is
            perfect for both casual users and fitness enthusiasts alike.
          </p>
          <p className="py-2 text-[10px] leading-8 pb-10 whitespace-pre-line">
            Keep track of your fitness goals and overall health with the
            FitTrack Z5, a sleek and stylish fitness tracker that monitors your
            heart rate, steps, calories burned, sleep patterns, and more. The
            tracker syncs seamlessly with your smartphone via Bluetooth,
            allowing you to track your daily activities, set goals, and monitor
            your progress in real-time. It also offers detailed insights into
            your sleep quality, helping you optimize rest for better recovery.
            With a long-lasting battery and water resistance, the FitTrack Z5 is
            perfect for both casual users and fitness enthusiasts alike.
          </p>
        </>
      ) : null}
      {active === 2 ? (
        <div className="w-full min-h-40 flex items-center justify-center">
          <h1>No Reviews Yet</h1>
        </div>
      ) : null}
      {active === 3 ? (
        <div className="w-full block 800px:flex  justify-between m p-5">
          {/* left section */}
          <div className="w-full 800px:w-[50%]">
            <div className="flex items-center">
              <img
                src={data?.shop.shopAvatar.url}
                alt=""
                className="w-[50px] h-[50px] rounded-full mr-2"
              />
              <div className="pl-3">
                <h3 className={`${styles.shop_name}`}>{data.shop.name}</h3>
                <h5 className="pb-2 text-[15px] ">
                  ({data.shop.ratings})Ratings
                </h5>
              </div>
            </div>
            <p className="pt-2">
              Here’s a 50-word Lorem Ipsum sample: Lorem ipsum dolor sit amet,
              consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
              labore et dolore magna aliqua. Ut enim ad minim veniam, quis
              nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
              consequat. Duis aute irure dolor in reprehenderit.
            </p>
          </div>
          {/* right section */}
          <div className="w-full 800px:w-[50%] mt-5 800px:mt-0 800px:flex flex-col items-end">
            <div className="text-left">
              <h5 className="font-[600]">
                Joined On:
                <span className="font-[500] text-left">12-02-2025</span>
              </h5>
              <h5 className="font-[600] pt-3">
                Total Products:
                <span className="font-[500] text-left">1,223</span>
              </h5>
              <h5 className="font-[600] pt-3">
                Total Reviews:
                <span className="font-[500] text-left">1,223</span>
              </h5>
              <Link to={`/shop/preview/${data?.shop._id}`}>
                <div
                  className={`${styles.button} !rounded-[4px] !h-[39.5px] mt-3`}
                >
                  <h4 className="text-white">Visit Shop</h4>
                </div>
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ProductDetails;
