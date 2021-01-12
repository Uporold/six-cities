import React from "react";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const style = {
  display: `flex`,
  justifyContent: `center`,
  alignItems: `center`,
  minHeight: `100vh`,
};

const LoaderSpinner: React.FC = (): JSX.Element => {
  return (
    <div className="page" style={style}>
      <Loader type="Watch" color="#4481C3" height={100} width={100} />
    </div>
  );
};

export default LoaderSpinner;
