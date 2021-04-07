import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Main from "./components/Main"
import Login from "./components/Login"
import Header from "./components/Header"
import Signup from "./components/Signup"
function App() {
  return (
    <div>
      <Router>
        <div>
          <Header />
        </div>
        <Switch>
          <Route exact path="/">
            <Main />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
              <Signup />
            </Route>
            {/* <Route path="*">
              <NoMatch />
            </Route> */}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
