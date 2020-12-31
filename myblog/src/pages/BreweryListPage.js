import React from "react";
import BreweryList from "../components/BreweryList";
import BreweryIndex from "../components/BreweryIndex";

const BreweryListPage = () => (
  <>
    <h1>Breweries List!</h1>
    <BreweryIndex breweries={breweries} /> //send BreweryList component the
    breweries prop. //the prop takes in breweriesContent
  </>
);

export default BreweryListPage;

//  breweries is the prop you're sending.
//breweriesList is the brewery content array you tie the prop to. you are passing this array.
