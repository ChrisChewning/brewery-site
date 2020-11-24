import React, { Component } from 'react';
import axios from 'axios';


class Login extends Component {
  constructor(props){
    super(props);

    this.state = {
      username: '',
      password: ''
    }

  }


onChangeUsername = e => {
  this.setState({username: e.target.value})
}

onChangePassword = (e) => {
  this.setState({password: e.target.value})
}


handleSubmit = e => {
  e.preventDefault();

  const auth = {
    username: this.state.username,
    password: this.state.password
  }

axios.post('http://localhost:8000/login', auth)
.then(res => {
  console.log(res)
})
.catch(err => {
  console.log(err)
})
}

render(){

  return(
    <>
    <p>This is the login page</p>
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

        <div className="form-group">
          <input
            type="submit"
            value="Create User"
            className="btn btn-primary"
          />
        </div>
      </form>
      </>
  )
}

}

export default Login;
