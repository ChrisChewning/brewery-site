import React, {Component} from 'react';
import Card from "@material-ui/core/Card";
import {Button} from '@material-ui/core';


class ForgotPassword extends Component {

onChange = (e) => {

}


onSubmit = (e) => {
  e.preventDefault();
}

  render() {

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
              onChange={this.onChange}
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
