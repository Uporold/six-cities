import React from "react";
import PropTypes from "prop-types";
import Main from "../main/main";

function App({ adTitles }) {
  return <Main adTitles={adTitles} />;
}

App.propTypes = {
  adTitles: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};

export default App;
