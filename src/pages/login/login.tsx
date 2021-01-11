import React, { useEffect, useRef } from "react";
import Header from "../../components/header/header";
import { useLogin } from "../../redux/user/hooks/useLogin";
import { useClearErrorIds } from "../../redux/data/hooks/useClearErrorIds";
import { useCurrentCity } from "../../redux/app/hooks/selectors";
import { useErrorHotelIds } from "../../redux/data/hooks/selectors";

const Login: React.FC = (): JSX.Element => {
  const onSubmit = useLogin();
  const clearErrorIds = useClearErrorIds();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const currentCity = useCurrentCity();
  const errorHotelIds = useErrorHotelIds();

  const handleSubmit = (evt: React.FormEvent) => {
    evt.preventDefault();

    onSubmit({
      email: (emailRef.current as HTMLInputElement).value,
      password: (passwordRef.current as HTMLInputElement).value,
    });
  };

  useEffect(() => {
    if (errorHotelIds.length > 0) {
      clearErrorIds();
    }
  }, [clearErrorIds, errorHotelIds.length]);

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
              onSubmit={handleSubmit}
            >
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  ref={emailRef}
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                  ref={passwordRef}
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
};

export default Login;
