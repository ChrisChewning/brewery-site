import React, { Component } from "react";
import { Link } from "react-router-dom";

class NavBar extends Component {
  constructor(props) {
     super(props);
     this.state = {
       user: this.props.user,
       loggedIn: false
     }
   }


handleLogout() {
  localStorage.clear();
  this.setState({user: null})
}

render() {
  console.log(this.props.user, 'user in navbar') //props are being sent to navbar.
  let buttons;
  if (this.props.user){
    buttons = (
  <li className="nav-pages" id="account">
    <Link to="/MyAccount">Account</Link>
  </li>
)
} else {
  buttons = (
  <li className="nav-pages" id="account">
    <Link to="/Login">Login</Link>
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
