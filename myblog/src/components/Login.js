import React, { Component } from 'react';
import axios from 'axios';
import { Switch, Route, Redirect } from 'react-router-dom';
//import Alert from 'react-bootstrap/Alert';
import Icon from '@material-ui/core/Icon';
import { Visibility , VisibilityOff, MailOutlineIcon, PersonIcon } from '@material-ui/icons';

class Login extends Component {
  constructor(props){
    super(props);

    this.state = {
      username: '',
      password: '',
      redirect: '',
      error: false,
      revealPw: false,
    }

  }


onChangeUsername = e => {
  this.setState({username: e.target.value})
}

onChangePassword = (e) => {
  this.setState({password: e.target.value})
}

togglePw = (e) => {
  this.setState({revealPw : !this.state.revealPw})
}

onSubmit = e => {
  e.preventDefault();
  const auth = {
    username: this.state.username,
    password: this.state.password
  }

axios.post('http://localhost:8000/api/login', auth)
.then(res => {
  console.log(res, ' RES token')
  localStorage.setItem('token', res.data.token)
  localStorage.setItem('user', res.data.user._id)
  console.log(res.data.user, ' user')
  console.log(localStorage)
  if (res.status === 200){
//    this.setState({redirect: "/myaccount"})
this.setState({username: res.data.user.username, user: res.data})
    console.log(this.state.username)
    console.log(this.state.user)

  }
})
.catch(err => {
  console.log(err, ' ERR')
  if (err){
    this.setState({redirect: "/login", username: '', password: '', error: 'Invalid Credentials', revealPw: false
})
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

<div>
        <div style={{ 'position': 'relative'}}>
          <div>
            <label>Password: </label>
          <input
            type={this.state.revealPw ? "text" : "password"}
            id="input"
            required
            value={this.state.password}
            onChange={this.onChangePassword}
          >
          </input>
          <span onClick={this.togglePw} >
            <span>
            {this.state.revealPw ? <VisibilityOff /> : <Visibility />}
            </span>
          </span>
        </div>

</div>
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
