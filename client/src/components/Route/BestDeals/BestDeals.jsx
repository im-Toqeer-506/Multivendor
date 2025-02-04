import React, { useEffect, useState } from "react";
import { productData } from "../../../static/data";
import styles from "../../../styles/style";
import ProductCard from "../ProductCard/ProductCard.jsx";

const BestDeals = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const data =
      productData && productData.sort((a, b) => b.totalSell - a.totalSell);
    const FirstFive = data.slice(0, 5);
    setData(FirstFive);
  }, []);
  return (
    <div>
      <div className={`${styles.section}`}>
        <div className={`${styles.heading}`}>
          <h1>Best Deals</h1>
        </div>
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12 borderr-0">
          {data &&
            data.map((i, index) => (
              <div>
                <ProductCard key={index} data={i} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default BestDeals;
