import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { without } from 'lodash';


class MyBeer extends Component {

constructor(){
  super()
    this.state = {
      mybeers: []
    }
    this.user = window.localStorage.getItem('user'); //this.user allows it to be accessible instead of const user
    this.deleteMyBeers = this.deleteMyBeers.bind(this);
  }


//http://localhost:8000/api/mybeers/5fd1b2af334a5f1231c7967e/my-future-beers
componentDidMount(){

  fetch(`http://localhost:8000/api/mybeers/${this.user}/mybeers`)
  .then((response) => response.json())
  .then((result) => {
    const savedBeers = result.map((beer) => {
      return beer
    })
    this.setState({mybeers: savedBeers })
  })
}



onSubmit(){

}

deleteMyBeers(beer){
  let tempBeer = this.state.mybeers;
  tempBeer = without(tempBeer, beer)

  this.setState({ myBeers: tempBeer })
}

render(){
  console.log(this.state.mybeers, ' state my beers')
  const listBeers = this.state.mybeers.map(beer => (
    <>
    <TableRow key={beer._id}>
     <TableCell>{beer.brewery}</TableCell>
     <TableCell align="right">{beer.beer}</TableCell>
     <TableCell align="right">{beer.rating}</TableCell>
     <TableCell align="right">{beer.notes}</TableCell>
     <button className="my-beers-delete" onClick={() => this.deleteMyBeers(beer)}>X</button>
   </TableRow>
    </>
))
  console.log(this.user, ' < user')
console.log(this.state.mybeers)
console.log(this.beer_id, ' beer id')
  return(

    <div>
        <p>My Beers</p>
      <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Brewery</TableCell>
                <TableCell align="right">Beer</TableCell>
                <TableCell align="right">Rating</TableCell>
                <TableCell align="right">Notes</TableCell>
              </TableRow>
            </TableHead>
                <TableBody>  {listBeers} </TableBody>
          </Table>
        </TableContainer>


    </div>
  )
}

}
export default MyBeer;
