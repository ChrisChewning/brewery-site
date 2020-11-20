import React, { Component } from "react";
import axios from "axios";


class CreateUser extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      username: "",
      email: "",
      password: "",
      passwordConfirm: ""
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
    const login = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      passwordConfirm: this.state.passwordConfirm
    };


    console.log(login);
    axios.post('http://localhost:8000/users/adduser', login)
    .then(res => console.log(res.data))

    this.setState({ username: "", email: "", password: "", passwordConfirm: "" }); //user can submit multiple users at once.
  };

  render() {
    return (
      <>
        <h3>Create New User</h3>
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
          <label>Email: </label>
          <input
            type="text"
            required
            className="form-control"
            value={this.state.email}
            onChange={this.onChangeEmail}
          />

          <div className="form-group">
            <label>Password: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.password}
              onChange={this.onChangePassword}
            />
          </div>
          <label>Confirm Password: </label>
          <input
            type="text"
            required
            className="form-control"
            value={this.state.passwordConfirm}
            onChange={this.onChangePasswordConfirm}
          />
          <div className="form-group">
            <input
              type="submit"
              value="Create User"
              className="btn btn-primary"
            />
          </div>
        </form>
      </>
    );
  }
}

export default CreateUser;
