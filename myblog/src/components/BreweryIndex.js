import React, { Component } from 'react';
import BreweryList from '../components/BreweryList';
import { Card } from '@material-ui/core';
import ScheduleIcon from '@material-ui/icons/Schedule';
import LocalDrinkIcon from '@material-ui/icons/LocalDrink';
import axios from 'axios';


class BreweryIndex extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: props.match.params.name,
      beers: "",
      location: "",
      image_map: "",
      address: "",
      website: "",
      from_website: "",
      hours: "",
      content: "",
      image: ""
    };
  }

  componentDidMount() {
    axios.get(`http://localhost:8000/api/brewery/breweries/${this.state.name}`).then((res) => {
      const brewery = res.data;
 this.setState({ beers: brewery.beers, location: brewery.location, image_map: brewery.image_map, address: brewery.address, website: brewery.website, from_website: brewery.from_website, hours: brewery.hours, content: brewery.content, image: brewery.image });
      })
    };


render() {
console.log(this.state.image)
  return (
      <>
      <div className="brewery-index-parent">
      <Card className="brewery-index-content-parent">
      <div className="brewery-image">
        <img className="brewery-profile-img" src={this.state.image} alt="brewery" />
      </div>
      <h1>{this.state.name}</h1>
      <div className="brewery-index-beers-served">
        <LocalDrinkIcon className="brewery-index-beer-icon" />
        <p className="brewery-index-beer-beers-list">{this.state.beers}</p>
      </div>
      <div className="brewery-index-hours">
        <ScheduleIcon className="brewery-index-hours-icon" />
        <p brewery-index-beer-hours-list>{this.state.hours}</p>
      </div>
      <div className="brewery-index-content">
        <div className="brewery-index-content-subcontainer">
      <p className="brewery-index-from-website-title"><a href={this.state.website}>From Their Website</a>:</p>
      <p className="brewery-index-from-website-content">{this.state.from_website}</p>
      </div>
      </div>
      </Card>

      <Card className="brewery-index-map-parent">
        <img className="brewery-index-map-img" src={this.state.image_map} alt="brewery map"/>
        <p className="brewery-index-address">{this.state.address}</p>
      <p className="closest-breweries-header">Make a day of it</p>
      <p className="closest-breweries-subheader">Three closest breweries:</p>
      </Card>
      </div>
      </>
)
}
}


export default BreweryIndex;
