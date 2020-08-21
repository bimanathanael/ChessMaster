import React from "react";
// import logo from "./logo.svg";
import "./App.css";
// import LoginPage from "./pages/LoginPages";
import Board from "./components/board";
import {Game} from "./pages/Game";
// import RegisterPage from "./pages/RegisterPage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      {/* <RegisterPage /> */}
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={Game}/>
            {/* <Route path="/" component={Board} /> */}
            <Route path="/" />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
