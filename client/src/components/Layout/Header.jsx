import React, { useState } from "react";
import styles from "../../styles/style";
import { Link } from "react-router-dom";
import { productData } from "../../static/data.js";
import { AiOutlineSearch } from "react-icons/ai";
import { IoIosArrowForward } from "react-icons/io";
const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState(null);
  const handleSearchChange = (e) => {
    e.preventDefault();
    const term = e.target.value;
    setSearchTerm(term);
    const filterProductData =
      productData &&
      productData.filter((product) => {
        product.name.toLowerCase().includes(term.toLowerCase());
      });
    setSearchData(filterProductData);
  };
  return (
    <div className={`${styles.section}`}>
      <div className="hidden 800px:h-[50px] 800px:my-[20px] 800px:flex items-center justify-between">
        <div>
          <Link to="/">
            <img
              src="https://shopo.quomodothemes.website/assets/images/logo.svg"
              alt="home-logo"
            />
          </Link>
        </div>
        {/* Search Box Working */}
        <div className="w-[50%] relative">
          <input
            type="text"
            placeholder="Search Your Accessries..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="h-[40px] w-full px-2 border-[#3957db] border-[2px] rounded-md"
          />
          <AiOutlineSearch
            size={30}
            className="absolute right-2 top-1.5 cursor-pointer"
          />
          {searchData && searchData.length != 0 ? (
            <div className="absolute min-h-[30vh] bg-slate-50 shadow-sm-2 z[9] p-4">
              {searchData &&
                searchData.map((i, index) => {
                  const d = i.name;
                  const productname = d.replace(/\s+/g, "-");
                  return (
                    <Link to={`/products/${productname}`}>
                      <div className="w-full flex py-3 items-start ">
                        <img src={i.imageURl[0].url} className="w-[40px] " />
                        <h1>{i.name}</h1>
                      </div>
                    </Link>
                  );
                })}
            </div>
          ) : null}
        </div>
        <div className={`${styles.button}`}>
          <Link t="/saller">
            <h1 className="text-white flex items-center">
              Become a Seller <IoIosArrowForward className="ml-1" />
            </h1>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
