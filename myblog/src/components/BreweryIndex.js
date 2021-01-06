import React, { Component } from 'react';
import BreweryList from '../components/BreweryList';
import axios from 'axios';


class BreweryIndex extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: props.match.params.name,
      beers: "",
      location: "",
      website: "",
      hours: "",
      content: "",
      image: ""
    };
  }

  componentDidMount() {
    axios.get(`http://localhost:8000/api/brewery/breweries/${this.state.name}`).then((res) => {
      const brewery = res.data;
 this.setState({ beers: brewery.beers, location: brewery.location, website: brewery.website, hours: brewery.hours, content: brewery.content, image: brewery.image });
      })
    };


render() {
console.log(this.state.image)
  return (
      <>
      <div className="brewery-image">

        <img className="brewery-profile-img" src= {this.state.image} alt="brewery" />
      </div>
      <h1>{this.state.name}</h1>
      <p>Beers offered: {this.state.beers}</p>
      <p>Hours: {this.state.hours}</p>
      <p>Website: {this.state.website}</p>
      <p>{this.state.content}</p>

      //google map with pin here

      <p>Closest Breweries:</p>
      //fn that finds closest brewereies based on longitude and latitude

      </>
)
}
}


export default BreweryIndex;
