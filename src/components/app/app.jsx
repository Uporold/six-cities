import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import Main from "../main/main";
import Property from "../property/property";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Main} />
        <Route path="/offers/:id" component={Property} />
      </Switch>
    </Router>
  );
};

export default App;
