import React, { Component } from "react";

class NewsEvents extends React.Component {

  render() {
    const dates = this.props.dates;
    var now = new Date();

    //loop through dates to add a key value pair for distance of time.
    for (var date in dates) {
      dates[date].distance =
        now - new Date(dates[date].year, dates[date].month, dates[date].day);
    }
    //get the three closest future events to today.
    const upcomingEvents = dates
      .filter((date) => date.distance < -2600000000)
      .sort(function (a, b) {
        return b.distance - a.distance;
      })
      .slice(0, 3);
    console.log(upcomingEvents);

    //display the three closeset future events to today.
    return (
      <>
        {upcomingEvents.map((upcomingEvent, key) => (
          <>
            <h2>{upcomingEvent.title}</h2>
            <p className="event-paragraph">
              {upcomingEvent.month}.{upcomingEvent.day}.{upcomingEvent.year}
            </p>
            <p className="event-paragraph">
              {upcomingEvent.event} at {upcomingEvent.location}
            </p>
          </>
        ))}
      </>
    );
  }
}

export default NewsEvents;
