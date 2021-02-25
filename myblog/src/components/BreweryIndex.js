import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {withRouter} from 'react-router';
import { Card } from '@material-ui/core';
import ScheduleIcon from '@material-ui/icons/Schedule';
import LocalDrinkIcon from '@material-ui/icons/LocalDrink';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
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
      update: false,
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
    const closestThree = res.data.breweries.slice(1,4)
    console.log(closestThree)
    this.setState({closestThree: closestThree});
  })
}




render() {
console.log(this.state.name)
console.log(this.state.update)
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
      <p className="brewery-index-from-website-title"><a href={this.state.website} target="_blank">From Their Website</a>:</p>
      <p className="brewery-index-from-website-content">{this.state.from_website}</p>
      </div>
      </div>
      </Card>

      <Card className="brewery-index-map-parent">

        <a href={`https://www.google.com/maps/search/${this.state.name}`} target="_blank">
        <img className="brewery-index-map-img" src={this.state.image_map} alt="brewery map"></img></a>
        <div className="brewery-map-marker">
        <p><a href={`https://www.google.com/maps/search/${this.state.name}`} target="_blank"><LocationOnOutlinedIcon className="brewery-index-marker"/></a></p>
        <p className="brewery-index-address">{this.state.address} </p>
        </div>

      <p className="closest-breweries-header">Three closest breweries:</p>
      {this.state.closestThree.map((closest, i) => (
          <>
  <Link
className="brewery-list-item"
key={i}
to={`/brewery/${closest.name}`}
onClick={() =>
  this.setState({name: closest.name}, this.componentDidMount)}
><p>{closest.name}</p>
</Link>
 <img className="closest-breweries-imgs" src={closest.image} />
 </>
      ))}


      </Card>
      </div>
      </>
)
}
}


export default withRouter(BreweryIndex);
