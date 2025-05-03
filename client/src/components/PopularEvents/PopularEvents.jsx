import React, { useEffect } from "react";
import EventCard from "./EventCard";
import styles from "../../styles/style";
import { useSelector } from "react-redux";
const PopularEvents = () => {
  const { allEvents, isLoading } = useSelector((state) => state.events);
  return (
    <div>
      {!isLoading && allEvents?.length !== 0 ? (
        <div className={`${styles.section}`}>
          <div className={`${styles.heading}`}>
            <h1>Popular Events</h1>
          </div>
          <div className="w-full grid">
            {allEvents && allEvents.length !== 0 ? (
              <EventCard data={allEvents[0]} />
            ) : (
              <h4>No Events have!</h4>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
};
export default PopularEvents;
