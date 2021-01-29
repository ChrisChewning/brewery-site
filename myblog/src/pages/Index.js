import React from "react";
import EventsCalendar from "../components/Calendar-Events";
import Events from "../components/Events";
import Weather from "../components/Weather";
import newsEventsContent from "./news-events-content"; //data
import TwitterIframe from "../components/TwitterIframe";
import News from "../components/News";

const Index = () => (
  <>
  <div className="index-parent">
    <div className="main-index-parent">
    <div className="main-index">
      <Events />
      <News />
      </div>
    </div>
    <div className="sidenav-index-parent">
      <Weather />
      <TwitterIframe />
    </div>
</div>
  </>
);

export default Index;

//taking the data from the variable newsEventsContent from news-event-content.js
//2. set it to the prop items for NewsEvents.
