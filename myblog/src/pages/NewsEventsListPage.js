import React, { Component } from "react";
import NewsEvents from "../components/NewsEvents"; //component
import newsEventsContent from "./news-events-content"; //data

const NewsEventsListPage = (dates) => (
  <>
    <h1>News and Events</h1>
    <NewsEvents dates= { newsEventsContent } />
  </>
);

export default NewsEventsListPage;

//taking the data from the variable newsEventsContent from news-event-content.js
//2. set it to the prop items for NewsEvents.
