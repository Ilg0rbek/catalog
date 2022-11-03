import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionTypes, alertTypes, appRoute } from "../common/enum";
import { Login } from "./login";
import { Switch, useHistory } from "react-router-dom";
import { AdminRoute, Loader, PrivateRoute, PublicRoute } from "./common";
import { ContentPage } from "./words-page";
import { IdiomsPage } from "./idioms-page";
import { NotFoundPage } from "./not-found";
import { MainPage } from "./main";
import { Promo } from "./promo";
import { clearRedirect, removeToast } from "../store/actions/app";
import { AdminPanelPage } from "./admin-panel";
import { WordPage } from "./word-page";
import { IdiomPage } from "./idiom-page";
import { ResetPasswordPage } from "./reset-password";
import { isObjectEmpty, TokenHelper } from "../helpers";
import Navbar from "./common/navbar";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "../store/store";
import "./styles.scss";
import { StudyPage } from "./study-page";
import { fetchAllWords } from "../store/actions/words";
import { LessonsPage } from "./lessons-page";
import { Order } from "./order";
import {
  SoundAlertError,
  SoundAlertSuccess,
} from "./common/hoc/sounds/alert-success-sound";
import { DictionaryPage } from "./dictionary-page";
import { DictionaryPageSecond } from "./dictionary-page-2";

export const App = () => {
  const dispatch = useDispatch();
  let history = useHistory();

  const { user, toasts, redirect, isAuth } = useSelector((state) => ({
    user: state.profile.user,
    toasts: state.app.toasts,
    redirect: state.app.redirect,
    isAuth: state.auth.isAuth,
  }));
  const hasToken = TokenHelper.checkOnExists();
  const hasUser = !!user;

  React.useEffect(() => {
    if (hasToken) {
      dispatch({ type: actionTypes.CHECK_AUTH_STATUS });
    }
  }, [hasToken, dispatch]);

  //fetch settings
  React.useEffect(() => {
    dispatch({ type: actionTypes.FETCH_ALL_SETTINGS_PROPERTIES_ASYNC });
  }, []);

  React.useEffect(() => {
    if (isAuth && !isObjectEmpty(user)) {
      dispatch(fetchAllWords({ noImage: false, total: 100000 }));
    }
  }, [isAuth, user]);

  React.useEffect(() => {
    if (redirect) {
      history.push(redirect);
      dispatch(clearRedirect());
    }
  }, [redirect]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const removeAlert = (id) => {
    dispatch(removeToast(id));
  };

  React.useEffect(() => {
    if (toasts?.length > 0) {
      setTimeout(() => {
        removeAlert(toasts[0].id);
      }, 2000);
    }
  }, [dispatch, removeAlert, toasts]);

  if (!hasUser && hasToken) {
    return <h3>Loading...</h3>;
  }

  const renderAlerts = () => {
    if (toasts) {
      return toasts.map((el) => {
        return el.type === alertTypes.SUCCESS ? (
          <SoundAlertSuccess
            key={el.id}
            message={el.message}
            type={el.type}
            closable
            showIcon
            onClose={() => removeAlert(el.id)}
          />
        ) : (
          <SoundAlertError
            key={el.id}
            message={el.message}
            type={el.type}
            closable
            showIcon
            onClose={() => removeAlert(el.id)}
          />
        );
      });
    }
  };
  return (
    <div style={{ height: "100vh", width: "100%", backgroundColor: "white" }}>
      <Navbar />
      <div style={{ position: "absolute", right: 0, width: "40%" }}>
        {renderAlerts()}
      </div>
      <PersistGate loading={<Loader />} persistor={persistor}>
        <Switch>
          <PrivateRoute exact path={appRoute.BASE} component={MainPage} />
          <PrivateRoute exact path={appRoute.PROMO} component={Promo} />
          <PrivateRoute exact path={appRoute.ORDER} component={Order} />
          <PublicRoute exact path={[appRoute.RESET_PASSWORD, appRoute.RESET_PASSWORD_REDIRECT]} component={ResetPasswordPage} />
          <PublicRoute exact path={[appRoute.LOGIN, appRoute.REGISTRATION]} component={Login} />
          <PublicRoute exact path="/ref/:id" component={Login}/>
          <PrivateRoute exact path={appRoute.WORD_CATALOG} component={ContentPage} />
          <PrivateRoute exact path={appRoute.IDIOMS_PAGE} component={IdiomsPage} />
          <PrivateRoute exact path={appRoute.WORD} component={WordPage} />
          <PrivateRoute exact path={appRoute.IDIOM} component={IdiomPage} />
          <PrivateRoute exact path={appRoute.STUDY} component={StudyPage} />
          <PrivateRoute exact path={appRoute.LESSONS} component={LessonsPage} />
          <PrivateRoute exact path={appRoute.DICTIONARY} component={DictionaryPageSecond} />
          <AdminRoute exact path={appRoute.ADMIN} component={AdminPanelPage} />
          <PublicRoute exact path={appRoute.ANY} component={NotFoundPage} />
        </Switch>
      </PersistGate>
    </div>
  );
};
