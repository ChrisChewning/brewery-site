import React, { Component } from 'react';
import BreweryList from '../components/BreweryList';
//import breweriesContent from './brewery-content'; //now has access to whatever name we put in the URL.
import NotFound from '../pages/NotFound';
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
    };
  }

  componentDidMount() {
    axios.get(`http://localhost:8000/api/brewery/breweries/${this.state.name}`).then((res) => {
      const brewery = res.data;
 this.setState({ beers: brewery.beers, location: brewery.location, website: brewery.website, hours: brewery.hours, content: brewery.content });
      })

    axios.get('http://localhost:8000/api/brewery/breweries/')

    };





//let breweriesData.find(brewery => brewery.name === name);
//const otherBreweries = Object.values(breweriesData).filter(brewery => brewery.name !== name); //w.o Object.values error is "filter is not a fn b.c filter is for arrays"

//console.log(breweriesData, '2')
  //breweriesContent.find(brewery => brewery.name === name)
  //=== name is saying equal to the match.params.name from the url parameter.

//const breweries = props.breweries
//.find(brewery => brewery.name === name)

//find the brewery name from the array of objects.
//  if (!breweries) return <NotFound />

//array of breweries besides the page you're on.
  //const otherBreweries = Object.values(breweries).filter(brewery => brewery.name !== name); //w.o Object.values error is "filter is not a fn b.c filter is for arrays"
//console.log(otherBreweries, 'other breweries')
render() {

  return (
      <>
      <h1>{this.state.name}</h1>
      <p>Beers offered: {this.state.beers}</p>
      <p>Hours: {this.state.hours}</p>
      <p>Website: {this.state.website}</p>
      <p>{this.state.content}</p>


      <p>Closest Breweries:</p>

      </>
)
}


}

//under h3   //  <BreweryList oBreweries = {otherBreweries} />

export default BreweryIndex;

//react fragments allow you to not put a div over everything. you can use React.Fragment instead.
//this way react fragments don't get put on the DOM.
//shorthand is <> </>
