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


sendEmail = async (e) => {
    e.preventDefault();
    const email = {  //has to be an obj, not just const email = this.state.email
      email: this.state.email,
    };



    //email won't let you send if null. no need for null check.
      axios.post(
          'http://localhost:3000/api/login/forgot-password', email)
          .then((res) => {
            console.log(res)
            console.log(email)

            if (res.data === 'recovery email sent') {
              this.setState({
                message: 'recovery email sent'
              });

          }
        })
       .catch((err) => {
        console.error(err);
        if (err === 'email not in db') {
          this.setState({
            message: 'Email address is not found. Please try again or register for an account.'
          });
          console.log("NOT IN DB")
        }
      })
    }




onSubmit = (e) => {
  e.preventDefault();
}

  render() {
    return (
      <>
      <Card className="forgot-pw-card">
        <h3 className="forgot-pw-header">Forgot Password</h3>

        <form onSubmit={this.sendEmail} className="forgot-pw-form">
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
