import React, { Component } from 'react';
import axios from "axios";

class MyAccount extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }



  render() {
    console.log('my account page')
//    console.log(this.state.customError, ' custom error')

    return (
      <>
      <p>My Account Page</p>
      </>
    )
}
}
export default MyAccount;
