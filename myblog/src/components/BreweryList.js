import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import BreweryIndex from '../components/BreweryIndex';
import { Card } from '@material-ui/core';
import { CardMedia } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';


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
           <div className="brewery-list-parent">
           {breweries.map((brewery, i) => (
             <>
             <Card className="brewery-list-card">
             <CardMedia image={brewery.image} className="brewery-list-img"
 />
             <Link
         className="brewery-list-item"
         key={i}
         to={`/brewery/${brewery.name}`}
       >
             <p>{brewery.name}</p>
            </Link>
            <Divider variant="middle" className="brewery-list-divider" />
            <Typography className="brewery-list-description">{brewery.description}</Typography>
          </Card>
            </>

         )
        )}
      </div>
           </>
       )
   }

export default BreweryList;
