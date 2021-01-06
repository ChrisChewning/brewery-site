import React from "react";
import EventsCalendar from "../components/Calendar-Events";
import NewsEvents from "../components/NewsEvents"; //
import Weather from "../components/Weather";
import newsEventsContent from "./news-events-content"; //data
import TwitterIframe from "../components/TwitterIframe";

const Index = () => (
  <>
    <h1>Welcome!</h1>
    <p>Thank you for coming.</p>
    <EventsCalendar />
    <div className="sidenav">
      <Weather />
      <NewsEvents dates={newsEventsContent} />
      <TwitterIframe />
    </div>
  </>
);

export default Index;

//taking the data from the variable newsEventsContent from news-event-content.js
//2. set it to the prop items for NewsEvents.
