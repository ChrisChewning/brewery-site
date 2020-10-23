import React from "react";
import BreweryList from "../components/BreweryList";
import breweriesContent from "./brewery-content";

const BreweryListPage = () => (
  <>
    <h1>Breweries List!</h1>
    <BreweryList breweries={breweriesContent} />
  </>
);

export default BreweryListPage;

//  breweries is the prop you're sending.
//breweriesList is the brewery content array you tie the prop to. you are passing this array.
