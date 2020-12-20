import React, { Component } from "react";
import Index from "./pages/Index";
import About from "./pages/About";
import Community from "./pages/CommunityPage";
import CommunityPost from "./pages/CommunityPost";
import BreweryIndex from "./components/BreweryIndex";
//import BreweryListPage from "./pages/BreweryListPage";
import BreweryList from "./components/BreweryList";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import NavBar from "./NavBar";
import NotFound from "./pages/NotFound";
import AddComments from "./components/AddComments";
import "./App.css";
import CreateUser from "./components/CreateUser";
import Login from "./components/Login";
import MyAccount from "./components/MyAccount";
import AddBeerModal from "./components/AddBeer";
import axios from "axios";
import { withRouter } from 'react-router'




class App extends Component {
  constructor(){
    super();

    this.state = {
      loggedIn: false,
      user: {}
    }

    this.user = window.localStorage.getItem('user'); //this.user allows it to be accessible instead of const user
  //  this.handleLogout = this.handleLogout.bind(this);
  }

//get user, including token
  componentDidMount = () => {
    const config = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    }
    //get user
    axios.get(`http://localhost:8000/users/${this.user}`, config)
        .then(
          res => {
            this.setUser(res.data)
      },
      err => {
        console.log(err)
      }
    )
  }

 setUser = user => {
  this.setState({
    user: user
   })
 }


  render() {

    // if (this.state.user){
    //   return <Redirect to="/" />
    // }

    console.log(this.state.user, ' app js user')
    return (
      <Router>
        <div className="App">
          <NavBar user= {this.state.user} setUser={this.setUser} />
          <AddBeerModal user={this.state.user} setUser={this.setUser} />
          <div id="page-body">
            <Switch>
              <Route path="/" component={Index} exact />
              <Route path="/breweries" component={BreweryList} />
              <Route path="/brewery/:name" component={BreweryIndex} />
              <Route path="/community" component={Community} exact />
              <Route path="/community/posts/:id" component={CommunityPost} />
              <Route path="/about" component={About} />
              <Route path="/login" component={() => <Login setUser={this.setUser} />} />
              <Route path="/register" component={CreateUser} />
              <Route path="/MyAccount" component={() => <MyAccount user={this.state.user} setUser={this.setUser} />} />
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
