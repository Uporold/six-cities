import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getAuthorizationStatus, getUser } from "../../redux/user/selectors";

const Header = ({ isMain, authorizationStatus, user }) => {
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link
              to={isMain ? "#" : "/"}
              className="header__logo-link header__logo-link--active"
            >
              <img
                className="header__logo"
                src="/img/logo.svg"
                alt="6 cities logo"
                width="81"
                height="41"
              />
            </Link>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              <li className="header__nav-item user">
                <Link
                  className="header__nav-link header__nav-link--profile"
                  to={!authorizationStatus ? "/login" : "#"}
                >
                  <div className="header__avatar-wrapper user__avatar-wrapper" />
                  {authorizationStatus ? (
                    <Link to="/favorites">
                      <span className="header__user-name user__name">
                        {user.email}
                      </span>
                    </Link>
                  ) : (
                    <span className="header__login">Sign in</span>
                  )}
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};
Header.propTypes = {
  isMain: PropTypes.bool,
  user: PropTypes.shape({
    id: PropTypes.number,
    email: PropTypes.string,
    name: PropTypes.string,
    avatar: PropTypes.string,
    isPro: PropTypes.bool,
  }).isRequired,
  authorizationStatus: PropTypes.bool.isRequired,
};

Header.defaultProps = {
  isMain: false,
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
  user: getUser(state),
});

export { Header };

export default connect(mapStateToProps)(Header);
