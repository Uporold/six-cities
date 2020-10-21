import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import Main from "../main/main";
import Property from "../property/property";
import history from "../../history";

const App = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={Main} />
        <Route path="/offers/:id" component={Property} />
      </Switch>
    </Router>
  );
};

export default App;
