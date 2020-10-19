import React, { Component } from 'react';
import EventsCalendar from '../components/Calendar-Events';
import NewsEvents from "../components/NewsEvents"; //component
import newsEventsContent from "./news-events-content"; //data

const Index = () => (
      <>
      <h1>Welcome!</h1>
      <p>
      Thank you for coming.
      </p>
      <EventsCalendar />
      <h1>News and Events</h1>
      <NewsEvents dates= { newsEventsContent } />
      </>
)

export default Index;

//react fragments allow you to not put a div over everything. you can use React.Fragment instead.
//this way react fragments don't get put on the DOM.
//shorthand is <> </>

//taking the data from the variable newsEventsContent from news-event-content.js
//2. set it to the prop items for NewsEvents.
