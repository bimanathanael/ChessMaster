import React from "react";

import "./App.css";
import { LoginPages, MainMenu, RegisterPage } from "./pages";
import Board from "./components/board";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/login">
              <LoginPages />
            </Route>
            <Route exact path="/register">
              <RegisterPage />
            </Route>
            <Route exact path="/">
              <MainMenu />
            </Route>
          </Switch>
        </Router>
        {/* <Board /> */}
        {/* <RegisterPage /> */}
      </div>
    </Provider>
  );
}

export default App;
