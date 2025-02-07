import React from "react";
import Header from "../components/Layout/Header";
import Hero from "../components/Route/Hero/Hero";
import Categories from "../components/Route/Categories/Categories";
import BestDeals from "../components/Route/BestDeals/BestDeals";
import FeaturedProduct from "../components/Route/FeaturedProduct/FeaturedProduct";
import PopularEvents from "../components/PopularEvents/PopularEvents";
import Sponsered from "../components/Route/Sponsered";
import Footer from "../components/Layout/Footer";
const HomePage = () => {
  return (
    <div>
      <Header activeHeading={1} />
      <Hero />
      <Categories />
      <BestDeals />
      <PopularEvents />
      <FeaturedProduct />
      <Sponsered />
      <Footer />
    </div>
  );
};

export default HomePage;
