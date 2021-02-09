import React, { Component } from "react";
import Index from "./pages/Index";
import About from "./pages/About";
import CommunityPage from "./pages/CommunityPage";
import CommunityPost from "./pages/CommunityPost";
import BreweryIndex from "./components/BreweryIndex";
//import BreweryListPage from "./pages/BreweryListPage";
import {withRouter} from 'react-router';

import BreweryList from "./components/BreweryList";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  //Redirect,
} from "react-router-dom";
import NavBar from "./NavBar";
import NotFound from "./pages/NotFound";
//import AddComments from "./components/AddComments";
import "./App.css";
import CreateUser from "./components/CreateUser";
import ForgotPassword from "./components/ForgotPassword";
import Login from "./components/Login";
import MyAccount from "./components/MyAccount";
//import AddBeerModal from "./components/AddBeer";
//import AddPosts from "./components/AddPosts";
import axios from "axios";
//import { withRouter } from "react-router";

class App extends Component {
  constructor() {
    super();

    this.state = {
      loggedIn: false,
      user: {},
    };

    this.user = window.localStorage.getItem("user"); //this.user allows it to be accessible instead of const user
  }

  //get user, including token
  componentDidMount = () => {
    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    //get user
    axios.get(`http://localhost:8000/users/${this.user}`, config).then(
      (res) => {
        this.setUser(res.data);
      },
      (err) => {
        console.log(err);
      }
    );
  };

  setUser = (user) => {
    this.setState({
      user: user,
    });
  };

  render() {
    return (
      <Router>
        <div className="App">
          <NavBar user={this.state.user} setUser={this.setUser}/>

          <div id="page-body">
            <Switch>
              <Route path="/" component={Index} exact />
                <Route path="/brewery/:name" exact component={BreweryIndex}  />

              <Route path="/breweries" component={BreweryList} />

              <Route path="/community" component= {() => <CommunityPage user={this.state.user} setUser={this.setUser} />}  exact />
              <Route path="/community/posts/:id" render={(matchProps) => (
                  <CommunityPost
                    {...matchProps}
                    {...this.props}
                    user={this.state.user}
                  />
                )}
              />
              <Route path="/about" component={About} />
              <Route path="/login" component={() => <Login setUser={this.setUser} user={this.state.user}/>} />
              <Route path="/register" component={CreateUser} />
              <Route path="/forgot-password" component={ForgotPassword} />

              <Route path="/MyAccount" component={() => (<MyAccount user={this.state.user} setUser={this.setUser} />)} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;

//Router makes sure the app stays up to date with the browser's current URL
//Route takes two main props. 1. a path prop, which specifies the URL. 2. a component prop, which says which component to render.
//  the slash route would meet each route. This is why you say exact.
