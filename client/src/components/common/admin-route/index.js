import * as React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { appRoute } from "../../../common/enum";
import { userRoles } from "../../../common/enum/user";
import { NotFoundPage } from "../../not-found";

const AdminRoute = ({ component: Component, ...rest }) => {
  const { user } = useSelector((state) => ({
    user: state.profile.user,
  }));

  const hasUser = Boolean(user);

  const renderComponent = (props) => {
    if (user.role != userRoles.ADMIN) {
      return <NotFoundPage />;
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

AdminRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
};

export default AdminRoute;
