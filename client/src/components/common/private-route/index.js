import * as React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { appRoute } from "../../../common/enum";
import { InfoPage } from "../../info-page";

const PrivateRoute = ({ preloadFunction, component: Component, ...rest }) => {
  const { user } = useSelector((state) => ({
    user: state.profile.user,
  }));
  
  const hasUser = Boolean(user);

  const renderComponent = (props) => {
    if (user.isBanned) {
      return <InfoPage message={"Your account banned"} />;
    }

    if (user.isActivated && props.location.pathname === '/order') {
      return (
        <InfoPage
          message={`Перейдите по ссылке, которая отправлена на вашу почту`}
        />
      );
    }

    if (!user.isActivated) {
      return (
        <InfoPage
          message={`<p>Поздравляем!</p><span>Вы успешно зарегистрированы!</span><span>Мы отправили письмо со ссылкой на ваш адрес</span><span>${user.email}.</span><span>Для завершения активации аккаунта перейдите по ссылке из письма.</span>`}
        />
      );
    }

    return <Component {...props} />;
  };

  return (
    <Route
      {...rest}
      render={(props) =>
        hasUser ? (
          renderComponent(props)
        ) : (
          <Redirect
            to={{ pathname: appRoute.LOGIN, state: { from: props.location } }}
          />
        )
      }
    />
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
};

export default PrivateRoute;
