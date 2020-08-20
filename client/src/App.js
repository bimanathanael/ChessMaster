import React from "react";
import logo from "./logo.svg";
import "./App.css";
import LoginPage from "./pages/LoginPages";
import Board from "./components/board";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Board />
    </div>
  );
}

export default App;
