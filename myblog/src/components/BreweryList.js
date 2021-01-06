import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import BreweryIndex from '../components/BreweryIndex';

function BreweryList() {
       const [breweries, setBreweries] = useState([])

       useEffect(() => {
         const fetchBreweries = async () => {
           await axios.get("http://localhost:8000/api/brewery/breweries")
      .then(res => {
        setBreweries(res.data)
   });
}
fetchBreweries();
}, []) //without [] here it calls it indefinitely.
console.log(breweries)

       return (
           <>
           {breweries.map((brewery, i) => (
             <>
             <img className="image-brewery" src={brewery.image} alt="brewery image" />
             <Link
         className="brewery-list-item"
         key={i}
         to={`/brewery/${brewery.name}`}
       >
             <p>{brewery.name}</p>
            </Link>
            </>
         )
        )}
           </>
       )
   }

export default BreweryList;
