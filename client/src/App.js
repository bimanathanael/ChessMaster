import React from "react";

import "./App.css";
// import { LoginPages, MainMenu, RegisterPage } from "./pages";
import Board from "./components/board";
// import {Game} from "./pages/Game";

// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import {
//   ProtectedRouteAfterLogin,
//   ProtectedRouteBeforeLogin,
// } from "./protectedRoute";

import { Provider } from "react-redux";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        {/* <Router>
          <Switch>
            <ProtectedRouteBeforeLogin
              exact
              path="/login"
              component={LoginPages}
            />

            <ProtectedRouteBeforeLogin
              exact
              path="/register"
              component={RegisterPage}
            />
    
            <ProtectedRouteBeforeLogin
              exact
              path="/game"
              component={Game}
            />

            <ProtectedRouteAfterLogin exact path="/" component={MainMenu} />
          </Switch>
        </Router>
        <RegisterPage /> */}

        <Board />
      </div>
    </Provider>
  );
}

export default App;
