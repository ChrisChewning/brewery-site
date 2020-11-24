import React, { Component } from "react";
import Index from "./pages/Index";
import About from "./pages/About";
import Community from "./pages/CommunityPage";
import CommunityPost from "./pages/CommunityPost";
import BreweryIndex from "./pages/BreweryIndex";
import BreweryListPage from "./pages/BreweryListPage";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavBar from "./NavBar";
import NotFound from "./pages/NotFound";
import AddComments from "./components/AddComments";
import "./App.css";
import CreateUser from "./components/CreateUser";
import Login from "./components/Login";


class App extends Component {
  render() {

    return (
      <Router>
        <div className="App">
          <NavBar />
          <div id="page-body">
            <Switch>
              <Route path="/" component={Index} exact />
              <Route path="/breweries" component={BreweryListPage} />
              <Route path="/brewery/:name" component={BreweryIndex} />
              <Route path="/community" component={Community} exact />
              <Route path="/community/posts/:id" component={CommunityPost} />
              <Route path="/about" component={About} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={CreateUser} />
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
