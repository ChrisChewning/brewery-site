import React, { Component } from 'react';
import { isEmail } from "validator";
import axios from "axios";


class CreateUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      email: '',
      password: '',
      passwordConfirm: '',
      errorMessage: '',
      customError: '',
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
      passwordConfirm: this.state.passwordConfirm
    };

    console.log(register, ' this is register');


  axios.post('http://localhost:8000/users/adduser', register)
.then(response => {
  console.log(response)
})
.catch(error => {
  console.log(error.response)
  this.setState({errorMessage: error.response.data.msg})
  this.setState({customError: error.response.data.toString()})
  console.log(this.state.errorMessage)
})

    // axios.post('http://localhost:8000/users/adduser', register)
    // .then(res => console.log(res.data))
    // .catch(err => {console.log(err, ' this is error')})

    //set states back to null
    this.setState({ username:'', email: '', password: '', passwordConfirm: '', errorMessage: '', customError: ''  });
  };


  render() {
    console.log(this.state.customError, ' custom error')

    return (
      <>
      <p>{this.state.errorMessage}</p>
      <p className={`${this.state.customError == '[object Object]' ? "hideCustomError": "showCustomError" }`}>{this.state.customError}</p>
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
