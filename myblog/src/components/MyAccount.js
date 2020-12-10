import React, { Component } from 'react';
import axios from "axios";
import CreateUser from "../components/CreateUser";
import Login from "../components/Login";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import NavBar from "../../src/NavBar";
import AddBeer from "../components/AddBeer";
import MyBeerList from "../components/MyBeer";



class MyAccount extends Component {
  constructor(props) {
    super(props);

    this.state = {
      image: this.props.user.image,
      imageError: '',
      file: null,
      loggedOut: false,
      user: {}
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.user = window.localStorage.getItem('user'); //this.user allows it to be accessible instead of const user
    this.handleLogout = this.handleLogout.bind(this);
  }

componentDidMount(){
  console.log(this.user)
  this.setState({user: this.props.user, image: this.props.user.image})
  if (!this.user) {
    console.log(' no')
  } else {
    console.log( 'yes')
  }
  console.log(this.state.image, 'image on mount')
console.log(this.state.user, 'user')
}



  onSubmit = e => {
    const formData = new FormData();
        formData.append('image', this.state.file);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
    axios.post(`http://localhost:8000/users/update-image/${this.user}`, formData, config)
  .then(res => {
    console.log(this.state.image, ' image state before ')
  console.log(this.state.image, ' image state')
  this.setState({image: URL.createObjectURL(e.target.files[0])})

  })
  .catch(error => {
console.log(error.response)
})
}

onChange(e) {
        this.setState({file:e.target.files[0]});
        file: URL.createObjectURL(e.target.files[0])
    }

handleLogout() {
    this.setState({loggedOut: true});
    window.localStorage.clear();
    //this.props.setUser(null);


}


  render() {

    console.log(this.props.user)
    if(!this.user){
      this.setState({loggedOut: true})
    }
    if (this.state.loggedOut){
      return <Redirect to ={'/'} />
    }
    console.log(this.props.user, 'user')
    console.log(localStorage, 'local storage')
    console.log(this.state.loggedIn)

    return (
      <>
      <h2>hi {this.props.user.username}</h2>
      <h3>email address: {this.props.user.email}</h3>
      <h3>Member since: {this.props.user.register_date}</h3>
      <button onClick={this.handleLogout}>Logout</button>

        <form enctype="multipart/form-data" name="image" onSubmit={this.onSubmit}>
          <div class="form-group">
            <label for="image">Upload image</label>
      <input type="file" name="image" id="image" class="form-control-file" onChange= {this.onChange}></input>

      </div>
      <div className="form-group">
        <button
          type="submit"
          name="image"
          className="btn btn-primary">Save</button>
    </div>
    </form>

    <p> image here: </p>
    <img className="profile-img" src = {this.state.image}  />

    <>
    <div className="beerList">
      <MyBeerList />
      <AddBeer />
    </div>
    </>

    </>

  )

}
}
export default MyAccount;
