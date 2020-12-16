import React from 'react';
import BreweryList from '../components/BreweryList';
//import breweriesContent from './brewery-content'; //now has access to whatever name we put in the URL.
import NotFound from '../pages/NotFound';

const BreweryIndex = ({ match }) => {
  const name = match.params.name;
//  const breweries = breweriesContent.find(brewery => brewery.name === name)
  //=== name is saying equal to the match.params.name from the url parameter.

const breweries = this.props.breweries
//.find(brewery => brewery.name === name)
console.log(breweries)
//find the brewery name from the array of objects.
  if (!breweries) return <NotFound />

//array of breweries besides the page you're on.
  const otherBreweries = Object.values(breweries).filter(brewery => brewery.name !== name); //w.o Object.values error is "filter is not a fn b.c filter is for arrays"
console.log(otherBreweries, 'other breweries')

  return (
      <>
      <p>{name}</p>
      <h3>Other Breweries</h3>
      <p>{otherBreweries}</p>
      </>
)
}

//under h3   //  <BreweryList oBreweries = {otherBreweries} />

export default BreweryIndex;

//react fragments allow you to not put a div over everything. you can use React.Fragment instead.
//this way react fragments don't get put on the DOM.
//shorthand is <> </>
