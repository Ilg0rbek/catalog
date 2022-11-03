import * as React from "react";
import { appRoute } from "../../common/enum";
import { useLocation } from "react-router-dom";
import { NotFoundPage } from "../not-found";
import { isMatch } from "../../helpers";
import { ResetPasswordComponent, VerifyComponent } from "./components";


export const ResetPasswordPage = React.memo(() => {
  const { pathname } = useLocation();


  const getScreen = (route) => {
    if (isMatch({ route, path: appRoute.RESET_PASSWORD_REDIRECT })) {
      return <ResetPasswordComponent />;
    }
    if (isMatch({ route, path: appRoute.RESET_PASSWORD })) {
      return <VerifyComponent />;
    }
    return <NotFoundPage />;
  };
  return <div className="centered">{getScreen(pathname)}</div>;
});
