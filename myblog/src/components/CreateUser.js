import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import Card from "@material-ui/core/Card";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import {Button} from '@material-ui/core';


class CreateUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
      username: "",
      email: "",
      password: "",
      passwordConfirm: "",
      errorMessage: "",
      customError: "",
      loggedIn: false,
    };
  }

  onChangeUsername = (e) => {
    this.setState({
      username: e.target.value,
    });
  };

  onChangeEmail = (e) => {
    this.setState({
      email: e.target.value,
    });
  };

  onChangePassword = (e) => {
    this.setState({
      password: e.target.value,
    });
  };

  onChangePasswordConfirm = (e) => {
    this.setState({
      passwordConfirm: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const register = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      passwordConfirm: this.state.password,
    };

    axios
      .post("http://localhost:8000/users/adduser", register)
      .then((res) => {
        console.log(res.data.user, "RES DATA USER")
          //this.props.handleSuccessAuth(res.data);
          localStorage.setItem("user", res.data.user._id);
          this.props.setUser(res.data.user)




          this.setState({
            username: res.config.data,
            user: res.config,
            loggedIn: true,
          });
        //}
      })
      .catch((error) => {
        if (error.res){
        this.setState({ errorMessage: error.res.data.msg });
        this.setState({ customError: error.res.data.toString() });
      }
      });

    // this.setState({
    //   username: "",
    //   email: "",
    //   password: "",
    //   passwordConfirm: "",
    // //  errorMessage: "",
    //  customError: "",
    // });
  };

  render() {
    console.log(localStorage, "LOCAL STORAGE")
    console.log(this.props, "PROPS")

    if(localStorage.user){
      return <Redirect to={"/myaccount"} />
    }
    console.log(localStorage.user, ' local storage user')
    console.log(this.state.user, "USER")
    console.log(this.state.username, "USERNAME")

    return (
      <>
      <Card className="register-card">
        <p>{this.state.errorMessage}</p>
        <p
          className={`${
            this.state.customError === "[object Object]"
              ? "hideCustomError"
              : "showCustomError"
          }`}
        >
          {this.state.customError}
        </p>
        <h3 className="register-header">Create New User</h3>
        <form className="register-form" onSubmit={this.onSubmit}>
          <div className="register-username">
            <label className="register-username-label">Username: </label>
            <input
              className="register-username-input"
              type="text"
              required
              value={this.state.username}
              onChange={this.onChangeUsername}
            />
          </div>
          <div className="register-email">
          <label className="register-email-label">Email: </label>
          <input
            className="register-email-input"
            type="text"
            required
            value={this.state.email}
            onChange={this.onChangeEmail}
          />
      </div>

        <div className="register-password">
            <label className="register-pw-label">Password: </label>
            <input
              className="register-pw-input"
              type="password"
              required
              value={this.state.password}
              onChange={this.onChangePassword}
            />
          </div>
          <div className="register-confirm-pw">
          <label className="register-confirm-pw-label">Confirm Password: </label>
          <input
            className="register-confirm-pw-input"
            type="password"
            required
            value={this.state.passwordConfirm}
            onChange={this.onChangePasswordConfirm}
          />
      </div>
        <Button variant="contained" color="primary" className="register-btn"
            input type="submit" value="Register">Register</Button>
        </form>

        <div className="register-instructions">
        <p className="register-paragraph">
          Passwords need to be at least 8 characters, have one capitalized
          letter, and one special character
        </p>
      </div>
      </Card>
      </>
    );
  }
}

export default CreateUser;
