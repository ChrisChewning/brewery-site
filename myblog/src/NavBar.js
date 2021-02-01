import React, { Component } from "react";
import { Link } from "react-router-dom";

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      loggedOut: true,
    };
    this.handleLogout = this.handleLogout.bind(this);
  }





  handleLogout = () => {
    localStorage.clear();
    this.props.setUser(null);
    this.setState({loggedOut: true})
  }

  render() {
    let buttons;


    if ((!this.props.user) || (this.props.user.username === undefined)){
      buttons = (
        <li className="nav-pages" id="account">
          <Link to="/login">Login</Link>
        </li>
      );
    } else {
      buttons = (
        <>
        <li className="nav-pages" id="logout">
          <Link to={"/"} onClick={this.handleLogout}>Logout</Link>
        </li>

        <li className="nav-pages" id="account">
          <Link to="/myaccount">Account</Link>
        </li>
        </>
      );
    }




    return (
      <>
        <header>
          <nav className="navbar">
            <ul className="navbar-ul">
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
