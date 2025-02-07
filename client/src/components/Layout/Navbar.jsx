import React from "react";
import styles from "../../styles/style";
import { navItems } from "../../static/data";
import { Link } from "react-router-dom";

const Navbar = ({ active }) => {
  return (
    <div className={`${styles.noramlFlex}`}>
      {navItems.map((i, index) => (
        <div className="flex" key={index}>
          <Link
            to={i.url}
            className={`${
              active === index + 1 ? "text-[#17dd1f]" : "text-[white]"
            } font-[500] cursor-pointer px-6 `}
          >
            {i.title}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Navbar;
