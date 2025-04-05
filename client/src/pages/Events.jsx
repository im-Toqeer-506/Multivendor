import React from "react";
import Header from "../components/Layout/Header";
import EventCard from "../components/PopularEvents/EventCard";
import { useSelector } from "react-redux";
import Loader from "../components/Layout/Loader";
const Events = () => {
  const { allEvents, isLoading } = useSelector((state) => state.events);
  window.scrollTo(0, 0);
  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Header activeHeading={4} />
          {allEvents && allEvents.length > 0 && (
            <EventCard active={true} data={allEvents[0]} />
          )}
        </>
      )}
    </div>
  );
};

export default Events;
