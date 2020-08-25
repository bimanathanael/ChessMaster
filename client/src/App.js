import React from "react";

import "./App.css";
import { LoginPages, MainMenu, RegisterPage, LeaderBoard } from "./pages";
import { Game } from "./pages/Game";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {
  ProtectedRouteAfterLogin,
  ProtectedRouteBeforeLogin,
} from "./protectedRoute";

import { Provider } from "react-redux";
import store from "./store";
import { ApolloProvider } from "@apollo/client";
import client from "./config/client";

function App() {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <div className="App">
          <Router>
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

              <ProtectedRouteAfterLogin exact path="/game" component={Game} />

              <ProtectedRouteAfterLogin exact path="/" component={MainMenu} />
              <ProtectedRouteAfterLogin
                exact
                path="/leaderboard"
                component={LeaderBoard}
              />
            </Switch>
          </Router>

        </div>
      </Provider>
    </ApolloProvider>
  );
}

export default App;
