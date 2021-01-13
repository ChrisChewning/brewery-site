import React, { useState, useEffect } from "react";
import axios from "axios";

const Events = () => {
  let [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get("/api/events")
      .then((response) => {
        console.log(response.data)
        setEvents(response.data)
      })
      .catch((error) => {
        console.log(error);
      });
  }, [])

  var now = new Date();
  console.log(now, ' now')
console.log(events)
  //loop through dates to add a key value pair for distance of time.
  for (var event in events) {
    events[event].distance = now - new Date(events[event].year, events[event].month, events[event].day)
  }
  console.log(events)
  //get the three closest future events to today.
  const upcomingEvents = events
    .filter((event) => event.distance < -2600000000)
    .sort(function (a, b) {
      return b.distance - a.distance;
    })
    .slice(0, 3);
  console.log(upcomingEvents);




  return (
    <>
      <h2>Upcoming Events</h2>

      {upcomingEvents.map((upcomingEvent, i) => (
        <>
          <div className={"events-list"} key={i}>
            <li key={i}>
            <h3>{upcomingEvent.title}</h3>
            <p className="event-paragraph">
            {upcomingEvent.month}.{upcomingEvent.day}.{upcomingEvent.year}
            </p>
            <p className="event-paragraph">
              {upcomingEvent.event} at {upcomingEvent.location} <br/>
            <a href = {upcomingEvent.url}>{upcomingEvent.location}</a>
            </p>
            </li>
          </div>
        </>
  ))
}
</>
);


}
export default Events;
