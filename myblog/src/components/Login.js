import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
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
        {this.renderRedirect()}
        <p className="alert">{this.state.error}</p>

        <h3>Login</h3>

        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Username: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}
            />
          </div>

          <div>
            <div style={{ position: "relative" }}>
              <div>
                <label>Password: </label>
                <input
                  type={this.state.revealPw ? "text" : "password"}
                  id="input"
                  required
                  value={this.state.password}
                  onChange={this.onChangePassword}
                ></input>
                <span onClick={this.togglePw}>
                  <span>
                    {this.state.revealPw ? <VisibilityOff /> : <Visibility />}
                  </span>
                </span>
              </div>
            </div>
          </div>

          <div className="form-group">
            <input type="submit" value="Login" className="btn btn-primary" />
          </div>
        </form>

        <p className="forgot-password">
        <Link to={'/forgot-password'}>Forgot password?</Link>
        <Link to={'/register'}> Register</Link>
      </p>
      </>
    );
  }
}

export default Login;
