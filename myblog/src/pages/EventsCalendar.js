import React, { Component } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';


class EventsCalendar extends Component {
  constructor(props) {
      super(props)
      this.state = {
        date: new Date(),
      }
      this.onChange = this.onChange.bind(this)
  }

  onChange = date => this.setState({ date })



  render() {
    const month = this.state.date.getMonth(); //gives you current month you're on so you're only looping over that. however, if you change
    console.log(month, 'this is the month')
    console.log(this.state.date.getDate(), 'clicked on date') //changes with whatever you click on

    return (
      <>
      <div className={this.state.date.toString().includes('Oct 10') ? console.log('tile active') : console.log('not active')} />
      <div className={this.state.date.toString().includes('Oct 10') ? '.react-calendar__tile2' : 'react-calendar__tile'  } />
      <div>
        <Calendar
          onChange={this.onChange}
          value={this.state.date}
          className="react-calendar"
        />
        <div> {this.state.date.toString().includes('Oct 10') ? <p>'yes'</p> : <p>'no'</p>} </div>

      </div>
      </>
    );
  }
}

export default EventsCalendar;
