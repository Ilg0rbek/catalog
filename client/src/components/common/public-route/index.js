import * as React from "react";
import { Route } from "react-router-dom";
import PropTypes from "prop-types";

const PublicRoute = ({ component: Component, ...rest }) => {
  //TODO
  return <Route {...rest} render={(props) => <Component {...props} />} />;
};

PublicRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
};

export default PublicRoute;
