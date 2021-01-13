import React, { useState, useEffect } from "react";
import axios from "axios";

const Events = () => {
  let [events, setEvents] = useState("");


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

  return (
    <div>

      <h2> hi</h2>
    </div>
  );
};

export default Events;
