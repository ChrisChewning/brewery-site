import React, {Component} from 'react';
import Card from "@material-ui/core/Card";
import {Button} from '@material-ui/core';
import axios from "axios";


class ForgotPassword extends Component {

  constructor(){
    super();

    this.state = {
      email: '',
      response: '',
    }
  }

onChange = (e) => {

}

sendEmail = async (e) => {
    e.preventDefault();
    const { email } = this.state.email;

    if (email === '') {
      this.setState({
        response: 'Email address cannot be empty'
      });
    }
    else
      try {
        const response = await axios.post(
          'http://localhost:3000/forgot-password',
          {
            email, //send email
          },
        );
        console.log(response.data);
        if (response.data === 'recovery email sent') {
          this.setState({
            message: 'recovery email sent'
          });
        }
      } catch (error) {
        console.error(error.response.data);
        if (error.response.data === 'email not in db') {
          this.setState({
            message: 'Email address is not found. Please try again or register for an account.'
          });
        }
      }
    } //end of fn




onSubmit = (e) => {
  e.preventDefault();
}

  render() {
    console.log(this.state.email, "EMAIL STATE")
    console.log(this.state.response, "RESPONSE")
    return (
      <>
      <Card className="forgot-pw-card">
        <h3 className="forgot-pw-header">Forgot Password</h3>

        <form onSubmit={this.onSubmit} className="forgot-pw-form">
          <div className="forgot-pw">
            <label className="forgot-pw-label">Email: </label>
            <input
              className="forgot-pw-input"
              type="email"
              required
              onChange ={e => this.setState({email: e.target.value})}
            />
          </div>

          <Button variant="contained" color="primary" className="send-email-btn"
              input type="submit" value="Register">Send Email</Button>
        </form>
      </Card>
      </>
    );


    }

  }

export default ForgotPassword;
