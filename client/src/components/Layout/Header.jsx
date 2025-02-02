import React, { useState } from "react";
import styles from "../../styles/style";
import { Link } from "react-router-dom";
import { productData, categoriesData } from "../../static/data.jsx";
import {
  AiOutlineHeart,
  AiOutlineSearch,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { BiMenuAltLeft } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import DropDown from "./DropDown";
import Navbar from "./Navbar";
const Header = ({ activeHeading }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [active, setActive] = useState(false);
  const [dropDown, setDropDown] = useState(false);

  const handleSearchChange = (e) => {
    e.preventDefault();
    const term = e.target.value;
    setSearchTerm(term);
    const filterProductData =
      productData &&
      productData.filter((product) =>
        product.name.toLowerCase().includes(term.toLowerCase())
      );
    setSearchData(filterProductData);
  };
  window.addEventListener("scroll", () => {
    if (window.scrollY > 70) {
      setActive(true);
    } else {
      setActive(false);
    }
  });

  return (
    <>
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
            {searchData && searchData.length !== 0 ? (
              <div className="absolute min-h-[30vh] bg-slate-50 shadow-sm-2 z[9] p-4">
                {searchData &&
                  searchData.map((i, index) => {
                    const d = i.name;
                    const productname = d.replace(/\s+/g, "-");
                    return (
                      <Link to={`/products/${productname}`}>
                        <div className="w-full flex py-3 items-start ">
                          <img src={i.imageUrl[0].url} className="w-[40px] " />
                          <h1>{i.name}</h1>
                        </div>
                      </Link>
                    );
                  })}
              </div>
            ) : null}
            {/* ending searchBox styling */}
          </div>
          {/* Styling for seller button */}
          <div className={`${styles.button}`}>
            <Link to="/saller">
              <h1 className="text-white flex items-center">
                Become a Seller <IoIosArrowForward className="ml-1" />
              </h1>
            </Link>
          </div>
          {/* ending styling for selling button */}
        </div>
      </div>
      {/* styling for fixed navbar */}
      <div
        className={`${
          active === true ? "shadow-sm fixed top-0 left-0 z-10" : null
        } transition hidden 800px:flex items-center justify-between w-full bg-[#3321c8] h-[70px]`}
      >
        <div
          className={`${styles.section} ${styles.noramlFlex} relative justify-between`}
        >
          {/* Categeories Dropdown */}
          <div
            onClick={() => {
              setDropDown(!dropDown);
            }}
          >
            <div className="relative mt-[10px] h-[50px] w-[270px] hidden 1000px:block">
              <BiMenuAltLeft className="absolute top-3 left-2" size={30} />
              <button className="h-[100%] w-full flex justify-between items-center pl-10 bg-white text-lg font-sans font-[500] select-none rounded-t-md">
                All Categories
              </button>
              {/* dropdown Arrow |Type| */}
              <IoIosArrowDown
                size={20}
                className="absolute right-2 top-4 cursor-pointer"
                onClick={() => setDropDown(!dropDown)}
              />
              {dropDown ? (
                <DropDown
                  categoriesData={categoriesData}
                  setDropDown={setDropDown}
                />
              ) : null}
              {/* Complete Categories DropDown  */}
            </div>
          </div>
          {/* Staring navItems styling */}
          <div className={`${styles.noramlFlex}`}>
            <Navbar active={activeHeading} />
          </div>
          {/* Speacial Icons */}
          <div className={`${styles.noramlFlex}`}>
            <div className={`${styles.noramlFlex}`}>
              <div className="relative mr-[15px] cursor-pointer">
                <AiOutlineHeart size={30} color="rgb(255 255 255/83%)" />
                <span className="absolute  right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4  p-0 m-0 text-white font-monospace text-center  font-[12px] leading-tight ">
                  0
                </span>
              </div>
            </div>
            <div className={`${styles.noramlFlex}`}>
              <div className="relative mr-[15px] cursor-pointer">
                <AiOutlineShoppingCart size={30} color="rgb(255 255 255/83%)" />
                <span className="absolute  right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4  p-0 m-0 text-white font-monospace text-center  font-[12px] leading-tight ">
                  1
                </span>
              </div>
            </div>
            <div className={`${styles.noramlFlex}`}>
              <div className="relative mr-[15px] cursor-pointer">
                <Link to="/">
                  <CgProfile size={30} color="rgb(255 255 255/83%)" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
