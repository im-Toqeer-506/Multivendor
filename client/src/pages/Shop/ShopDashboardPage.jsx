import React from "react";
import DashboardHeader from "../../components/Shop/Layout/DashboardHeader";
import DashboardSidebar from "../../components/shop/Layout/ShopDashboardSidebar";
import DashBoardHero from "../../components/Shop/DashBoardHero";
const ShopDashboardPage = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex items-start justify-between w-full">
        <div className="800px:w-[330px] w-[80px]">
          <DashboardSidebar active={1} />
        </div>
        <DashBoardHero />
      </div>
    </div>
  );
};

export default ShopDashboardPage;
