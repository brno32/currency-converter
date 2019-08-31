import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import About from "./components/pages/About";

import "./App.css";

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <div>
        <Switch>
          <Route exact path="/about" component={About} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
