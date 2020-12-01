import React, { Component } from 'react';
import axios from 'axios';
import { Switch, Route, Redirect } from 'react-router-dom';
//import Alert from 'react-bootstrap/Alert';


class Login extends Component {
  constructor(props){
    super(props);

    this.state = {
      username: '',
      password: '',
      redirect: '',
      error: false
    }

  }


onChangeUsername = e => {
  this.setState({username: e.target.value})
}

onChangePassword = (e) => {
  this.setState({password: e.target.value})
}


onSubmit = e => {
  e.preventDefault();
  const auth = {
    username: this.state.username,
    password: this.state.password
  }

axios.post('http://localhost:8000/api/login', auth)
.then(res => {
  console.log(res, ' RES')
  if (res.status === 200){
    this.setState({redirect: "/myaccount"})
    console.log(this.state.redirect)
  }
})
.catch(err => {
  console.log(err, ' ERR')
  if (err){
    this.setState({redirect: "/login", username: '', password: '', error: 'Invalid Credentials'})
      }
})
}


renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }

  }

render(){

  return(
    <>
    {this.renderRedirect()}
    <p className= 'alert'>{this.state.error}</p>

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


        <div className="form-group">
          <label>Password: </label>
          <input
            type="password"
            required
            className="form-control"
            value={this.state.password}
            onChange={this.onChangePassword}
          />
        </div>

        <div className="form-group">
          <input
            type="submit"
            value="Login"
            className="btn btn-primary"
          />
        </div>
      </form>
      </>
  )
}

}

export default Login;
