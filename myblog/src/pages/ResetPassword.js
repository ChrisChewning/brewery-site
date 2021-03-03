import React, { Component } from 'react';
import axios from 'axios';
import {Button} from '@material-ui/core';
import Card from "@material-ui/core/Card";
import { Visibility, VisibilityOff } from "@material-ui/icons";


const loading = {
  margin: '1em',
  fontSize: '24px',
};



export default class ResetPassword extends Component {
  constructor() {
    super();

    this.state = {
      username: '',
      password: '',
      updated: false,
      isLoading: true,
      error: false,
      revealPw: false,
    };
  }

//http://localhost:3000/api/login?resetPasswordToken=acef63f71aa0710445410265b501eacac88e6fbe
  async componentDidMount() {
    await axios.get(`http://localhost:3000/api/login/reset-password/${this.props.match.params.token}`, {
       params: {
         token: this.props.match.token,
       },
     })
     .then(response => {
      console.log(response);
      if (response.data.message === 'password reset link is good') {
        this.setState({
          username: response.data.username,
          updated: false,
          isLoading: false,
          error: false,
        });
      } else {
        this.setState({
        update: false,
        isLoading: false,
        error: true
  })
      }
    })
     .catch(error => {
      console.log(error);
    })
  }


  togglePw = (e) => {
    this.setState({ revealPw: !this.state.revealPw });
  };

  onChange = (e) => {
    this.setState({password: e.target.value})
  }

  updatePassword = (e) => {
    e.preventDefault();
    const password = {
      password: this.state.password
    }

    try {
      const response = axios.post((
        `http://localhost:3000/api/login/update-password/${this.props.match.params.token}`),  {
        params: {
          token: this.props.match.token,
        },
        password: this.state.password
        })
          console.log(response.data)
          console.log(password, "PASSWORD") //WORKS
          if (response.data.message === 'password updated') {
                this.setState({
                  updated: true,
                  error: false,
                });
              } else {
                this.setState({
                  updated: false,
                  error: true,
                });
              }
            } catch (error) {
              console.log(error);
            }
          };

  render() {
    console.log(this.state.password)
    console.log(this.props, "PROPS")
    const {
 password, error, isLoading, updated
} = this.state;

    if (error) {
      return (
        <div>
          <div style={loading}>
            <h4>Problem resetting password. Please send another reset link.</h4>
            <Button link="/">Home</Button>
            <Button link="/forgot-password">Forgot Password</Button>
          </div>
        </div>
      );
    }
    if (isLoading) {
      return (
          <div style={loading}>Loading User Data...</div>
      );
    }
    return (
      <div>


      <Card className="reset-pw-card">
        <h3 className="reset-pw-header">Reset Password</h3>

        <form onSubmit={this.updatePassword} className="reset-pw-form">
          <div className="reset-pw">
            <label className="reset-pw-label">New Password: </label>
            <input
              className="reset-pw-input"
              type= {this.state.revealPw ? "text" : "password"}
              required
              onChange ={e => this.setState({password: e.target.value})}
            />
            <div onClick={this.togglePw} className="visibility">
                  {this.state.revealPw ? <VisibilityOff /> : <Visibility />}
                </div>
          </div>

          <Button variant="contained" color="primary" className="send-email-btn"
              input type="submit" value="Register">Submit</Button>
        </form>
      </Card>




        {updated && (
          <div>
            <p>
              Your password has been successfully reset, please try logging in
              again.
            </p>
            <Button
              link="/login">Login
            </Button>
          </div>
        )}
        <Button link="/">Home</Button>
      </div>
    );
  }
}

// ResetPassword.propTypes = {
//   // eslint-disable-next-line react/require-default-props
//   match: PropTypes.shape({
//     params: PropTypes.shape({
//       token: PropTypes.string.isRequired,
//     }),
//   }),
// };
