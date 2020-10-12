import React from 'react';
import { Link } from 'react-router-dom';


const BreweryList = ({ breweries }) => (
<>
{breweries.map((brewery, key) => (
  <>
  <Link className="brewery-list-item" key={key} to={`/brewery/${brewery.name}`}>
  <h3>{brewery.name}</h3>
  </Link>
  <p>{brewery.content[0].substring(0, 10)}...</p>
  </>
))}
</>
)

export default BreweryList;

//
