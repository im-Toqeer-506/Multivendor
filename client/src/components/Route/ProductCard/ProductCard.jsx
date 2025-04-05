import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../../styles/style";
import { backend_url } from "../../../server";
import ProductCardDetails from "../ProductCardDetails/ProductCardDetails";
import {
  AiFillStar,
  AiOutlineStar,
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineEye,
  AiOutlineShoppingCart,
} from "react-icons/ai";
const ProductCard = ({ data }) => {
  const [click, setClick] = useState(false);
  const [opens, setOpens] = useState(false);
  const d = data.name;
  const product_name = d.replace(/\s+/g, "-");
  return (
    <>
      <div className="w-full h-[370px] bg-white rounded-lg shadow-sm p-3 relative cursor-pointer">
        <div className="flex justify-end "></div>
        <Link to={`/product/${product_name}`}>
          <img
            src={
              data && data.images && data.images.length > 0
                ? `${backend_url}/${data.images[0]}`
                : "defaultImage.jpg"
            }
            alt=""
            className="w-full h-[170px] object-contain"
          />
        </Link>
        <Link to="/">
          <h5 className={`${styles.shop_name}`}>{data?.shop.name}</h5>
        </Link>
        <Link to={`/product/${product_name}`}>
          <h4 className="pb-3 font-[500] ">
            {data?.name.length > 40
              ? data?.name.slice(0, 40) + "..."
              : data?.name}
          </h4>
          <div className="flex ">
            <AiFillStar
              className="mr-2 cursor-pointer text-yellow-500"
              size={20}
            />
            <AiFillStar
              className="mr-2 cursor-pointer text-yellow-500"
              size={20}
            />
            <AiFillStar
              className="mr-2 cursor-pointer text-yellow-500"
              size={20}
            />
            <AiFillStar
              className="mr-2 cursor-pointer text-yellow-500"
              size={20}
            />
            <AiOutlineStar
              className="mr-2 cursor-pointer text-yellow-500"
              size={20}
            />
          </div>
          <div className=" py-2 flex items-center justify-between">
            <div className="flex">
              <h5 className={`${styles.productDiscountPrice}`}>
                {data?.price === 0 ? data?.price : data?.discountPrice}$
              </h5>
              <h4 className={`${styles.price}`}>
                {data.price ? data.price + "" : null}
              </h4>
              <span className={`font-[400] text-[17px] text-[#68d284]`}>
                {data?.sold_out} solds
              </span>
            </div>
          </div>
        </Link>
        {/* adjusting the side options */}
        <div>
          {click ? (
            <AiFillHeart
              size={20}
              className="cursor-pointer absolute right-2 top-5"
              onClick={() => setClick(!click)}
              color={click ? "red" : "#333"}
              title="Remove from wishlist"
            />
          ) : (
            <AiOutlineHeart
              size={20}
              className="cursor-pointer absolute right-2 top-5"
              onClick={() => setClick(!click)}
              title="Add to wishlist"
            />
          )}

          <AiOutlineEye
            size={20}
            className="cursor-pointer absolute right-2 top-14"
            color="#333"
            onClick={() => setOpens(!opens)}
            title="Quick View"
          />
          <AiOutlineShoppingCart
            size={25}
            className="cursor-pointer absolute right-2 top-24"
            color="#444"
            title="Add to Cart"
          />
          {opens ? (
            <ProductCardDetails setOpens={setOpens} data={data} />
          ) : null}
        </div>
      </div>
    </>
  );
};

export default ProductCard;
