import React, { PureComponent, createRef } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Header from "../header/header";
import { Operation } from "../../redux/user/user";
import NameSpace from "../../redux/name-space";
import { ActionCreator as ActionCreatorData } from "../../redux/data/data";

class Login extends PureComponent {
  constructor(props) {
    super(props);

    this.emailRef = createRef();
    this.passwordRef = createRef();
  }

  componentWillUnmount() {
    const { errorHotelIds, clearErrorHotelIds } = this.props;
    if (errorHotelIds.length > 0) {
      clearErrorHotelIds();
    }
  }

  handleSubmit = (evt) => {
    const { onSubmit } = this.props;

    evt.preventDefault();

    onSubmit({
      email: this.emailRef.current.value,
      password: this.passwordRef.current.value,
    });
  };

  render() {
    const { currentCity } = this.props;
    return (
      <div className="page page--gray page--login">
        <Header isLogin />

        <main className="page__main page__main--login">
          <div className="page__login-container container">
            <section className="login">
              <h1 className="login__title">Sign in</h1>
              <form
                className="login__form form"
                action="#"
                method="post"
                onSubmit={this.handleSubmit}
              >
                <div className="login__input-wrapper form__input-wrapper">
                  <label className="visually-hidden">E-mail</label>
                  <input
                    className="login__input form__input"
                    type="email"
                    name="email"
                    placeholder="Email"
                    required=""
                    ref={this.emailRef}
                  />
                </div>
                <div className="login__input-wrapper form__input-wrapper">
                  <label className="visually-hidden">Password</label>
                  <input
                    className="login__input form__input"
                    type="password"
                    name="password"
                    placeholder="Password"
                    required=""
                    ref={this.passwordRef}
                  />
                </div>
                <button
                  className="login__submit form__submit button"
                  type="submit"
                >
                  Sign in
                </button>
              </form>
            </section>
            <section className="locations locations--login locations--current">
              <div className="locations__item">
                <a className="locations__item-link" href="#">
                  <span>{currentCity}</span>
                </a>
              </div>
            </section>
          </div>
        </main>
      </div>
    );
  }
}

Login.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  currentCity: PropTypes.string.isRequired,
  errorHotelIds: PropTypes.arrayOf(PropTypes.number).isRequired,
  clearErrorHotelIds: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  currentCity: state[NameSpace.APP].currentCity,
  errorHotelIds: state[NameSpace.DATA].errorHotelIds,
});

const mapDispatchToProps = (dispatch) => ({
  onSubmit(authData) {
    dispatch(Operation.login(authData));
  },
  clearErrorHotelIds() {
    dispatch(ActionCreatorData.clearErrorHotelIds());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
