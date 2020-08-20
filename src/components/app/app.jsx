import React from "react";
import PropTypes from "prop-types";
import Main from "../main/main";

const adTitleClickHandler = (evt) => {
  evt.preventDefault();
};

function App({ adTitles }) {
  return <Main adTitles={adTitles} onAdTitleClick={adTitleClickHandler} />;
}

App.propTypes = {
  adTitles: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};

export default App;
