import React, { Component } from 'react';
import axios from "axios";
import CreateUser from "../components/CreateUser";

class MyAccount extends Component {
  constructor(props) {
    super(props);

    this.handleSuccessAuth = this.handleSuccessAuth.bind(this);

    this.state = {
      user: {},

    };
  }


  componentDidMount(){
    const config = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    }
    const user = window.localStorage.getItem('user');
    console.log(user)
    axios.get('http://localhost:8000/users', config)
        .then(
          res => {
            this.setState({ user: res.data})
        console.log(this.state.user)
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
//    console.log(this.state.customError, ' custom error')


    return (
      <>
      <p>My Account Page</p>
        <h2>hi {this.props.username}</h2>


      </>
    )
}
}
export default MyAccount;
