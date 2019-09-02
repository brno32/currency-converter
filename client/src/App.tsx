import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Main from "./components/pages/Main";
import About from "./components/pages/About";

import StatsProvider from "./context/stats/StatsProvider";
import ConversionProvider from "./context/conversion/ConversionProvider";

import "./App.css";

const App: React.FC = () => {
  return (
    <StatsProvider>
      <ConversionProvider>
        <Router>
          <Navbar />
          <div>
            <Switch>
              <Route exact path="/" component={Main} />
              <Route exact path="/about" component={About} />
            </Switch>
          </div>
        </Router>
      </ConversionProvider>
    </StatsProvider>
  );
};

export default App;
