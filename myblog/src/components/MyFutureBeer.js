import React, { Component } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import axios from "axios";

class MyFutureBeer extends Component {
  constructor() {
    super();
    this.state = {
      future_beers: [],
      brewery: "",
      beer: "",
      notes: "",
    };
    this.user = window.localStorage.getItem("user"); //this.user allows it to be accessible instead of const user
  }

  componentDidMount() {
    fetch(`http://localhost:8000/api/mybeers/${this.user}/my-future-beers`)
      .then((response) => response.json())
      .then((result) => {
        const futurebeers = result.map((beer) => {
          return beer;
        });
        this.setState({ future_beers: futurebeers });
      });
  }

  deleteMyBeers(future_beer) {
    axios
      .delete(
        `http://localhost:8000/api/mybeers/${this.user}/my-future-beers/delete/${future_beer}`
      )
      .then((response) => {
        this.setState({ future_beers: response.data });
      })
      .catch((response, error) => {
        response.status(500).json({ message: "Error", error });
      });
  }


  //MODAL
  handleSubmit = (e) => {
    e.preventDefault();
    const addBeer = {
      brewery: this.state.brewery,
      beer: this.state.beer,
      notes: this.state.notes,
    };
}



  render() {
    const listBeers = this.state.future_beers.map((future_beer) => (
      <>
        <TableRow key={future_beer._id}>
          <TableCell>{future_beer.brewery}</TableCell>
          <TableCell align="right">{future_beer.beer}</TableCell>
          <TableCell align="right">{future_beer.notes}</TableCell>
          <button
            className="my-beers-delete"
            onClick={() => this.deleteMyBeers(future_beer._id)}
          >
            X
          </button>
        </TableRow>
      </>
    ));

    return (

      <div>
        <p>My Future Beers</p>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Brewery</TableCell>
                <TableCell align="right">Beer</TableCell>
                <TableCell align="right">Notes</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{listBeers}</TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }
}
export default MyFutureBeer;
