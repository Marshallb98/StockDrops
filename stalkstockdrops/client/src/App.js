import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage"
import Login from "./components/Login"
import Header from "./components/Header"
import Signup from "./components/Signup"
import Dashboard from "./components/Dashboard"

function App() {
  return (
    <div>
      <Router>
        <div>
          <Header />
        </div>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/dashboard" component={Dashboard} />
            {/* <Route path="*">
              <NoMatch />
            </Route> */}
        </Switch>
      </Router>
    </div>
  );
}

export default App;