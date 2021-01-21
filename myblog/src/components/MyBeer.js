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
import Card from "@material-ui/core/Card";
import AddCircleSharpIcon from '@material-ui/icons/AddCircleSharp';
import CreateIcon from '@material-ui/icons/Create';
import CloseIcon from '@material-ui/icons/Close';


class MyBeer extends Component {
  constructor(props) {
    super();
    this.state = {
      mybeers: [],
      myfuturebeers: [],
      openPast: false,
      openFuture: false,
      beer_id: "",
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
    this.setState({ open: false, openPast: false });
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

  //MODAL ADD PAST BEERS
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

//MODAL EDIT PAST BEERS

//EDIT BEERS
  handleSubmitEditPastBeers = (e, beer) => {
    e.preventDefault();
    const editBeer = {
      brewery: this.state.brewery,
      beer: this.state.beer,
      rating: this.state.rating,
      notes: this.state.notes,
    };
    console.log(editBeer, ' EDIT BEER')
    axios.put(
      `http://localhost:8000/api/mybeers/${this.props.user._id}/my-beers/edit/${this.state.beer_id}`, editBeer) //can put in beer id directly. but not working w ${beer}
    .then((response)=> this.handler())
    .catch((error) => {
      console.log(error.response)
    })
  }


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




  editMyFutureBeers = (beer) => {
    axios.put(
      `http://localhost:8000/api/mybeers/${this.user}/my-future-beers/update/${beer}`
    )
    .then((response)=>{
      this.setState({ mybeers: response.data });
    })
    .catch((error) => {
      console.log(error.response)
    })
  }

//EDIT BEERS
  editMyPastBeers = (beer) => {
    this.setState({ brewery: beer.brewery, beer: beer.beer, rating: beer.rating, notes: beer.notes, beer_id: beer._id, openPast: true })
    console.log(beer, 'beer')
}

//DELETE BEERS
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
    console.log(this.state.brewery)
    const listBeers = this.state.mybeers.map((beer) => (
      <>
        <TableRow key={beer._id}>
          <TableCell align="center">{beer.brewery}</TableCell>
          <TableCell align="center">{beer.beer}</TableCell>
          <TableCell align="center">{beer.rating}</TableCell>
          <TableCell align="center">{beer.notes}</TableCell>
          <TableCell align="right">
        <div className="my-beers-edit-del">
          <CreateIcon onClick={() => this.editMyPastBeers(beer)} />
          <CloseIcon onClick={() => this.deleteMyBeers(beer._id)} />
          </div>
          </TableCell>
        </TableRow>
      </>
    ));

    const listFutureBeers = this.state.myfuturebeers.map((beer) => (
      <>
        <TableRow key={beer._id}>
          <TableCell align="center">{beer.brewery}</TableCell>
          <TableCell align="center">{beer.beer}</TableCell>
          <TableCell align="center">{beer.notes}</TableCell>
          <TableCell align="right">
          <CreateIcon></CreateIcon>
          <CloseIcon
            onClick={() => this.deleteMyFutureBeers(beer._id)}
          >
        </CloseIcon>
      </TableCell>
        </TableRow>
      </>
    ));


    return (
      <div className="card-parent">
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.openPast}
          onClose={this.handleClosePast}
        >
          <div className="modalStyle">
            <h2 className="modalTitle">My Beers</h2>
              <form onSubmit={this.handleSubmitEditPastBeers} className="modalContent">
                  <div>
                  <label>
                    Brewery:
                    <input
                      type="text"
                      value={this.state.brewery}
                      onChange={this.onChangeBrewery}
                    />
                  </label>
                <label>
                  Beer:
                  <input
                    type="text"
                    value={this.state.beer}
                    onChange={this.onChangeBeer}
                  />
                </label>
                <label className="modalRating">
                  Rating:
                  <input
                    type="text"
                    value={this.state.rating}
                    onChange={this.onChangeRating}
                  />
                </label>
                <label className="modalNotes">
                  Notes:
                  <input
                    type="text"
                    value={this.state.notes}
                    onChange={this.onChangeNotes}
                  />
                </label>
              </div>
                <button type="submit" value="Submit" className="modalButton">
                  Submit
                </button>
              </form>
          </div>
        </Modal>

        <Card className="my-beers-parent">
          <div className="my-beers-title-parent">
            <div className="my-beers-title-btn">
          <p className="account-page-titles">My Beers </p>
          <div className="form-group">
            <AddCircleSharpIcon variant="contained" color="primary" onClick={this.handleOpenPast} className="modal-plus-btn" />
            </div>
          </div>
          </div>
          <TableContainer component={Paper} className="table-parent">
            <Table aria-label="simple-table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Brewery</TableCell>
                  <TableCell align="center">Beer</TableCell>
                  <TableCell align="center">Rating</TableCell>
                  <TableCell align="center">Notes</TableCell>
                  <TableCell align="center"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>{listBeers}</TableBody>
            </Table>
          </TableContainer>
  </Card>

  <Card className= "my-beers-parent">
        <div className="my-beers-title-parent">
          <div className="my-beers-title-btn">
        <p className="account-page-titles">My Future Beers </p>
          <div className="form-group">
          <AddCircleSharpIcon variant="contained" color="primary" onClick={this.handleOpenFuture} className="modal-plus-btn" />
        </div>
      </div>
        </div>

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
                <div className="modalBreweryBeerRating">
                  <label>
                    Brewery:
                    <input
                      type="text"
                      value={this.state.brewery}
                      onChange={this.onChangeBrewery}
                    />
                  </label>
                <label>
                  Beer:
                  <input
                    type="text"
                    value={this.state.beer}
                    onChange={this.onChangeBeer}
                  />
                </label>
              </div>
              <div className="">
                <label className="modalNotes">
                  Notes:
                  <input
                    type="text"
                    value={this.state.notes}
                    onChange={this.onChangeNotes}
                    className="modalNotes"
                  />
                </label>
              </div>
              <div className="">
                <button type="submit" value="Submit" className="modalButton">
                  Submit
                </button>
                </div>
              </form>
            </>
          </div>
        </Modal>

        <div>
          <TableContainer component={Paper} className="table-parent">
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Brewery</TableCell>
                  <TableCell align="center">Beer</TableCell>
                  <TableCell align="center">Notes</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>{listFutureBeers}</TableBody>
            </Table>
          </TableContainer>
        </div>
      </Card>
      </div>
    );
  }
}
export default MyBeer;
