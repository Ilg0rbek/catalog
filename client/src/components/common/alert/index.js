import { Alert } from "antd";
import * as React from "react";
import { useSelector } from "react-redux";
import { removeToast } from "../../../store/actions/app";
import { dispatch } from "../../../store/store";

const AlertComponent = () => {
  const { toasts } = useSelector((state) => ({
    toasts: state.app.toasts,
  }));
  const removeAlert = (id) => {
    dispatch(removeToast(id));
  };
  React.useEffect(() => {
    if (toasts.length > 0) {
      setTimeout(() => {
        removeAlert(toasts[0].id);
      }, 2000);
    }
  }, [dispatch, removeAlert, toasts]);
  // eslint-disable-next-line react-hooks/exhaustive-deps

  const renderAlerts = () => {
    toasts.map((el) => {
      return (
        <Alert
          key={el.id}
          message="Warning Text Warning Text Warning TextW arning Text Warning Text Warning TextWarning Text"
          type="error"
          closable
          showIcon
          onClose={() => removeAlert(el.id)}
        />
      );
    });
  };
  return <div>{renderAlerts()}</div>;
};

export default AlertComponent;
