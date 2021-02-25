import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import Card from "@material-ui/core/Card";
import {Divider} from '@material-ui/core';
import {Button} from '@material-ui/core';
import { Visibility, VisibilityOff } from "@material-ui/icons";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
      username: "",
      password: "",
      redirect: "",
      error: false,
      revealPw: false,
      loggedIn: false,
    };
  }

  onChangeUsername = (e) => {
    this.setState({ username: e.target.value });
  };

  onChangePassword = (e) => {
    this.setState({ password: e.target.value });
  };

  togglePw = (e) => {
    this.setState({ revealPw: !this.state.revealPw });
  };


forgotPw = (e) =>{
  return <Redirect to={this.state.redirect} />;
}

  onSubmit = (e) => {
    e.preventDefault();
    const auth = {
      username: this.state.username,
      password: this.state.password,
    };

    axios
      .post("http://localhost:8000/api/login", auth)
      .then((res) => {
        console.log(res.data, " RES data");
        //localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", res.data.user._id);
        this.props.setUser(res.data.user);
        console.log(res.data, "RES DATA")
        this.setState({
          username: res.data.user.username,
          user: res.data,
          loggedIn: true,
        });

      })
      .catch((err) => {
        console.log(err, " ERR");
        if (err) {
          this.setState({
            redirect: "/login",
            username: "",
            password: "",
            error: "Invalid Credentials",
            revealPw: false,
          });
        }
      });
  };

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
  };

  render() {
    console.log(this.state.loggedIn, ' logged in state')
    console.log(this.props, ' login props')


    if(localStorage.user){
      return <Redirect to={"/myaccount"} />
    }

    return (
      <>
      <Card className="login-card">
        {this.renderRedirect()}
        <p className="alert">{this.state.error}</p>


        <h3 className="login-header">Sign In to Your Account:</h3>

        <form onSubmit={this.onSubmit} className="login-form">

          <div className="login-username">
            <label className="login-username-label">Username: </label>
            <input className="login-username-input"
              type="text"
              required
              value={this.state.username}
              onChange={this.onChangeUsername}
            ></input>
          </div>

          <div className="login-password">
                <label className="login-pw-label">Password: </label>
                  <div className="login-pw-visibility">
                <input className="login-pw-input"
                  type={this.state.revealPw ? "text" : "password"}
                  id="input"
                  required
                  value={this.state.password}
                  onChange={this.onChangePassword}
                ></input>
              <div onClick={this.togglePw} className="visibility">
                    {this.state.revealPw ? <VisibilityOff /> : <Visibility />}
                  </div>
              </div>
          </div>

          <Button variant="contained" color="primary" className="login-btn"
            input type="submit" value="Login">Sign In</Button>
        </form>

        <div className="forgot-password-register">

        <div className="forgot-password">
          <p><Link to={'/forgot-password'} className="forgot-password-paragraph">Forgot Password</Link></p>
        </div>
        <Divider orientation="vertical" flexItem />
        <div className="register-login">
          <p className=""><Link to={'/register'} className="register-login-paragraph">Register</Link></p>
      </div>

      </div>
    </Card>
      </>
    );
  }
}

export default Login;
