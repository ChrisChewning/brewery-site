import React from "react";
import axios from 'axios';

//const NewsEvents = () => {

class NewsEvents2 extends React.Component {

  render() {
    let dates = this.props.dates;
    var now = new Date();

    //loop through dates to add a key value pair for distance of time.
    for (var date in dates) {
      dates[date].distance =
        now - new Date(dates[date].year, dates[date].month, dates[date].day);
    }
    console.log(dates)
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
                {upcomingEvent.event} at {upcomingEvent.location}
              </p>
              </li>
            </div>
          </>
        ))}
      </>
    );
  }
}

export default NewsEvents2;
