import React, { Component } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import axios from "axios";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";

class MyBeer extends Component {
  constructor(props) {
    super();
    this.state = {
      mybeers: [],
      myfuturebeers: [],
      openPast: false,
      openFuture: false,
      brewery: "",
      beer: "",
      rating: "",
      notes: "",
    };
    this.user = window.localStorage.getItem("user"); //this.user allows it to be accessible instead of const user
    this.deleteMyBeers = this.deleteMyBeers.bind(this);
  }

  //GET PAST BEERS
  handler = () => {
    fetch(`http://localhost:8000/api/mybeers/${this.user}/mybeers`)
      .then((response) => response.json())
      .then((result) => {
        const savedBeers = result.map((beer) => {
          return beer;
        });
        this.setState({ mybeers: savedBeers });
      });
    this.setState({ open: false });
  };


  getFutureBeers = () => {
    fetch(`http://localhost:8000/api/mybeers/${this.user}/my-future-beers`)
      .then((response) => response.json())
      .then((result) => {
        const futurebeers = result.map((beer) => {
          return beer;
        });
        this.setState({ myfuturebeers: futurebeers });
      });
  }



  componentDidMount() {
    this.handler();
    this.getFutureBeers();
  }

  //MODAL FUTURE BEERS
  handleSubmitMyBeers = (e) => {
    e.preventDefault();
    const addBeer = {
      brewery: this.state.brewery,
      beer: this.state.beer,
      rating: this.state.rating,
      notes: this.state.notes,
    };

    //ADD BEER
    axios
      .post(`/api/mybeers/${this.props.user._id}/add-beer`, addBeer)
      .then((response) => this.handler())
      .catch((error) => {
        console.log(error.response);
      });
    this.setState({ openPast: false });
  };


//MODAL FUTURE BEERS
  handleSubmitFutureBeers = (e) => {
    e.preventDefault();
    const addBeer = {
      brewery: this.state.brewery,
      beer: this.state.beer,
      rating: this.state.rating,
      notes: this.state.notes,
    };

    axios
      .post(`/api/mybeers/${this.props.user._id}/add-future-beer`, addBeer)
      .then((response) => this.getFutureBeers())
      .catch((error) => {
        console.log(error.response);
      });
    this.setState({ openFuture: false });
    };



//DELETE BEER
  deleteMyBeers = (beer) => {
    axios
      .delete(
        `http://localhost:8000/api/mybeers/${this.user}/my-beers/delete/${beer}`
      )
      .then((response) => {
        this.setState({ mybeers: response.data });
      })
      .catch((error) => {
        console.log(error.response);
      });
  }


deleteMyFutureBeers = (beer) => {
  axios
    .delete(
      `http://localhost:8000/api/mybeers/${this.user}/my-future-beers/delete/${beer}`
    )
    .then((response) => {
      this.setState({ myfuturebeers: response.data });
    })
    .catch((error) => {
      console.log(error.response);
    });
}


//ONCHANGES, OPEN, CLOSE
handleOpenPast = () => {
  this.setState({ openPast: true });
};

handleOpenFuture = () => {
  this.setState({ openFuture: true });
};

handleClosePast = () => {
  this.setState({ openPast: false });
};

handleCloseFuture = () => {
  this.setState({ openFuture: false });
};

onChangeBrewery = (e) => {
  this.setState({ brewery: e.target.value });
};

onChangeBeer = (e) => {
  this.setState({ beer: e.target.value });
};

onChangeRating = (e) => {
  this.setState({ rating: e.target.value });
};

onChangeNotes = (e) => {
  this.setState({ notes: e.target.value });
};




  render() {
    console.log(this.props, " PROPS MY BEERS");
    console.log(this.state.mybeers, ' my beers')

    const listBeers = this.state.mybeers.map((beer) => (
      <>
        <TableRow key={beer._id}>
          <TableCell>{beer.brewery}</TableCell>
          <TableCell align="right">{beer.beer}</TableCell>
          <TableCell align="right">{beer.rating}</TableCell>
          <TableCell align="right">{beer.notes}</TableCell>
          <button
            className="my-beers-delete"
            onClick={() => this.deleteMyBeers(beer._id)}
          >
            X
          </button>
        </TableRow>
      </>
    ));

    const listFutureBeers = this.state.myfuturebeers.map((beer) => (
      <>
        <TableRow key={beer._id}>
          <TableCell>{beer.brewery}</TableCell>
          <TableCell align="right">{beer.beer}</TableCell>
          <TableCell align="right">{beer.rating}</TableCell>
          <TableCell align="right">{beer.notes}</TableCell>
          <button
            className="my-beers-delete"
            onClick={() => this.deleteMyFutureBeers(beer._id)}
          >
            X
          </button>
        </TableRow>
      </>
    ));


    return (
      <div>
        <Button variant="contained" color="primary" onClick={this.handleOpenPast}>
          Add Past Beers
        </Button>

        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.openPast}
          onClose={this.handleClosePast}
        >
          <div className="modalStyle">
            <h2 className="modalTitle">My Beers</h2>
            <>
              <form onSubmit={this.handleSubmitMyBeers} className="modalContent">
                <div className="modalInputs">
                  <label>
                    Brewery:
                    <input
                      type="text"
                      value={this.state.brewery}
                      value={this.state.password}
                      onChange={this.onChangeBrewery}
                    />
                  </label>
                </div>

                <label>
                  Beer:
                  <input
                    type="text"
                    value={this.state.beer}
                    onChange={this.onChangeBeer}
                  />
                </label>
                <label>
                  Rating:
                  <input
                    type="text"
                    value={this.state.rating}
                    onChange={this.onChangeRating}
                  />
                </label>
                <label>
                  Notes:
                  <input
                    type="text"
                    value={this.state.notes}
                    onChange={this.onChangeNotes}
                  />
                </label>
                <button type="submit" value="Submit" className="modalButton">
                  Submit
                </button>
              </form>
            </>
          </div>
        </Modal>

        <div>
          <p>My Beers</p>
          <TableContainer component={Paper}>
            <Table aria-label="simple-table">
              <TableHead>
                <TableRow>
                  <TableCell>Brewery</TableCell>
                  <TableCell align="right">Beer</TableCell>
                  <TableCell align="right">Rating</TableCell>
                  <TableCell align="right">Notes</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>{listBeers}</TableBody>
            </Table>
          </TableContainer>
        </div>

        <Button variant="contained" color="primary" onClick={this.handleOpenFuture} className="round-button">
          +
        </Button>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.openFuture}
          onClose={this.handleCloseFuture}
        >
          <div className="modalStyle">
            <h2 className="modalTitle">My Future Beers</h2>
            <>
              <form onSubmit={this.handleSubmitFutureBeers} className="modalContent">
                <div className="modalInputs">
                  <label>
                    Brewery:
                    <input
                      type="text"
                      value={this.state.brewery}
                      value={this.state.password}
                      onChange={this.onChangeBrewery}
                    />
                  </label>
                </div>

                <label>
                  Beer:
                  <input
                    type="text"
                    value={this.state.beer}
                    onChange={this.onChangeBeer}
                  />
                </label>
                <label>
                  Notes:
                  <input
                    type="text"
                    value={this.state.notes}
                    onChange={this.onChangeNotes}
                  />
                </label>
                <button type="submit" value="Submit" className="modalButton">
                  Submit
                </button>
              </form>
            </>
          </div>
        </Modal>

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
              <TableBody>{listFutureBeers}</TableBody>
            </Table>
          </TableContainer>
        </div>



      </div>




    );
  }
}
export default MyBeer;
