import React, { Component } from 'react';
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
      coordinates: [], //data was in array. need to use [] instead of ""
      image_map: "",
      address: "",
      website: "",
      from_website: "",
      hours: "",
      content: "",
      image: "",
      coords: "",
      closestThree: [],
    };
  }

  componentDidMount() {
    axios.get(`http://localhost:8000/api/brewery/breweries/${this.state.name}`)
    .then(res => res.data)
      .then(brewery => {
        this.setState({ beers: brewery.beers, coordinates: brewery.location.coordinates, image_map: brewery.image_map, address: brewery.address, website: brewery.website, from_website: brewery.from_website, hours: brewery.hours, content: brewery.content, image: brewery.image
})
  return axios.get(`http://localhost:8000/api/brewery/${this.state.name}/distance?lat=${brewery.location.coordinates[1]}&lng=${brewery.location.coordinates[0]}`)
})
  .then((res) => {
    const closestThree = res.data.breweries.slice(0,3).map((closest, key) => {
      this.setState({closestThree: closest.name})
      console.log(closest.name, 'closest name')
    })
  console.log(res.data.breweries.name)
})
}




render() {
console.log(this.state.closestThree)

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
