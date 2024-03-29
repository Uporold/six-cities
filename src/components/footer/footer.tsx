import React, { memo } from "react";
import { Link } from "react-router-dom";
import { PagePath } from "../../utilites/const";

const Footer: React.FC = memo(function Footer(): JSX.Element {
  return (
    <footer className="footer container">
      <Link className="footer__logo-link" to={PagePath.MAIN}>
        <img
          className="footer__logo"
          src="img/logo.svg"
          alt="6 cities logo"
          width="64"
          height="33"
        />
      </Link>
    </footer>
  );
});

export default Footer;
