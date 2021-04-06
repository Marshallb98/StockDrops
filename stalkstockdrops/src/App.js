import React from "react";
import Home from "./pages/Home";
import Login from "./pages/login";
import NewUser from "./pages/newUser";
import Demo from "./pages/index";


function App() {
  return (
    <Router>
      <div>
        <Switch>
          {/* protect routes if user not authenticated redirect to index */}
          <Route exact path={["/"]}>
            <Demo />
          </Route>
          <Login />
          <NewUser/>
          <Home />
        </Switch>
      </div>
    </Router>
  )  
}

export default App;
