import React, { Component } from "react";
import { Link } from "react-router-dom";

class NavBar extends Component {
  constructor(props) {
     super(props);
     this.state = {
       //user: this.props.user,
       loggedOut: true
     }
   }

componentDidMount(){
  if (this.props.user.username){
    this.setState({loggedOut: false})
  }
}

render() {

  console.log(this.props.user, 'this.props.user')
  let buttons;
  if (this.props.user.username){
    buttons = (
  <li className="nav-pages" id="account">
    <Link to="/myaccount">Account</Link>
  </li>
)
} else {
  buttons = (
  <li className="nav-pages" id="account">
    <Link to="/login">Login</Link>
  </li>
)
}

return (
  <>
  <header>
  <nav className="navbar">
    <ul>
      <li className="nav-pages">
        <Link to="/">Home</Link>
      </li>
      <li className="nav-pages">
        <Link to="/Breweries">Breweries</Link>
      </li>
      <li className="nav-pages">
        <Link to="/Community">Community</Link>
      </li>
      <li className="nav-pages" id="about">
        <Link to="/About">About</Link>
      </li>
      {buttons}
    </ul>
  </nav>
  </header>
</>
);
}
}

export default NavBar;
