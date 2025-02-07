import React from "react";
import EventCard from "./EventCard";
import styles from "../../styles/style";
const PopularEvents = () => {
  return (
    <div>
      <div className={`${styles.section}`}>
        <div className={`${styles.heading}`}>
          <h1>Popular Events</h1>
        </div>
        <div className="w-full grid">
          <EventCard />
        </div>
      </div>
    </div>
  );
};

export default PopularEvents;
