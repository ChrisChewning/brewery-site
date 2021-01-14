import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import MyBeer from "../components/MyBeer";
import MyFutureBeer from "../components/MyFutureBeer";
import Modal from "@material-ui/core/Modal";
import AddBeerModal from "../components/AddBeer";

class MyAccount extends Component {
  constructor(props) {
    super(props);

    this.state = {
      image: this.props.user.image,
      imageError: "",
      file: null,
      loggedOut: false,
      user: {},
      updateBeers: false
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.user = window.localStorage.getItem("user"); //this.user allows it to be accessible instead of const user
    this.handleLogout = this.handleLogout.bind(this);
  }


handler = () => {
  this.setState({ user: this.props.user, image: this.props.user.image });
}

componentDidMount() {
  this.handler();
}

updateBeers = () => {
  this.setState({updateBeers: true})
}



  onSubmit = (e) => {
    const formData = new FormData();
    formData.append("image", this.state.file);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    axios
      .post(
        `http://localhost:8000/users/update-image/${this.user}`,
        formData,
        config
      )
      .then((res) => {
        this.setState({ image: URL.createObjectURL(e.target.files[0]) });
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  onChange(e) {
    this.setState({ file: e.target.files[0] });
    file: URL.createObjectURL(e.target.files[0]);
  }

  handleLogout() {
    this.setState({ loggedOut: true });
    window.localStorage.clear();
    //this.props.setUser(null);
  }

  render() {
    console.log(this.props.user.image)
    console.log(this.state.user, ' user state')
    if (!this.user) {
      this.setState({ loggedOut: true });
    }
    if (this.state.loggedOut) {
      return <Redirect to={"/"} />;
    }

    return (
      <>
        <h2>hi {this.props.user.username}</h2>
        <h3>email address: {this.props.user.email}</h3>
        <h3>Member since: {this.props.user.register_date}</h3>
        <button onClick={this.handleLogout}>Logout</button>

        <form
          encType="multipart/form-data"
          name="image"
          onSubmit={this.onSubmit}
        >
          <div className="form-group">
            <label htmlFor="image">Upload image</label>
            <input
              type="file"
              name="image"
              id="image"
              className="form-control-file"
              onChange={this.onChange}
            ></input>
          </div>
          <div className="form-group">
            <button type="submit" name="image" className="btn btn-primary">
              Save
            </button>
          </div>
        </form>

        <img className="profile-img" src={this.state.image} alt="profile image" />

        <>
          <div className="beerList">
            <MyBeer user={this.props.user} addBeer={this.handler} />
          </div>
        </>
      </>
    );
  }
}
export default MyAccount;
