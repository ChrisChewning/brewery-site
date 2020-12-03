import React, { Component } from 'react';
import axios from "axios";
import CreateUser from "../components/CreateUser";

class MyAccount extends Component {
  constructor(props) {
    super(props);

    this.handleSuccessAuth = this.handleSuccessAuth.bind(this);

    this.state = {
      username: '',
      email: '',
      register_date: '',
      image: ''
    };
  }


  componentDidMount(){
    const config = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    }
    //get user
    const user = window.localStorage.getItem('user');
    axios.get(`http://localhost:8000/users/${user}`, config)
        .then(
          res => {
            this.setState({ username: res.data.username, email: res.data.email, register_date: res.data.register_date, image: res.data.image})
        console.log(this.state.image)
      },
      err => {
        console.log(err)
      }
    )
  }

handleSuccessAuth(data){
  //update parent component

  //redirect user
  this.props.history.push("/myaccount"); //access to history

}

  render() {

    return (
      <>
      <p>My Account Page</p>
        <h2>hi {this.state.username}</h2>
        <h3>email address: {this.state.email}</h3>
        <h3>Member since: {this.state.register_date}</h3>
        <img src={this.state.image} />
      </>
    )
}
}
export default MyAccount;
