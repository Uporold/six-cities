import React, { memo } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { PagePath } from "../../utilites/const";
import {
  useAuthorizationStatus,
  useUser,
} from "../../redux/user/hooks/selectors";

const Header = memo(function Header({ isMain, isLogin }) {
  const authorizationStatus = useAuthorizationStatus();
  const user = useUser();
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link
              to={PagePath.MAIN}
              className="header__logo-link header__logo-link--active"
              onClick={isMain ? (event) => event.preventDefault() : () => {}}
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
              {!isLogin && (
                <li className="header__nav-item user">
                  <Link
                    className="header__nav-link header__nav-link--profile"
                    to={
                      !authorizationStatus ? PagePath.LOGIN : PagePath.FAVORITES
                    }
                  >
                    <div className="header__avatar-wrapper user__avatar-wrapper" />
                    {authorizationStatus ? (
                      <span className="header__user-name user__name">
                        {user.email}
                      </span>
                    ) : (
                      <span className="header__login">Sign in</span>
                    )}
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
});

Header.propTypes = {
  isMain: PropTypes.bool,
  isLogin: PropTypes.bool,
  user: PropTypes.shape({
    id: PropTypes.number,
    email: PropTypes.string,
    name: PropTypes.string,
    avatar: PropTypes.string,
    isPro: PropTypes.bool,
  }),
};

Header.defaultProps = {
  isMain: false,
  isLogin: false,
  user: null,
};

export default Header;
