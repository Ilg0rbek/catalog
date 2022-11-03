import { useDispatch } from "react-redux";
import { actionTypes, ButtonSize } from "../../common/enum";
import styles from "./styles.module.css";
import GoogleLogin from 'react-google-login';
import GoogleSmallIcon from "../../assets/images/google-small-icon";
import dotenv from "dotenv";
import {SoundButton} from "../../components/common/hoc/sounds/tap-ui-sound"
 
dotenv.config();

const GoogleAuthBtn = ({ referer, useText }) => {
  const dispatch = useDispatch();

  const auth = (email) => {
    dispatch({
      type: actionTypes.GOOGLE,
      payload: { email, referer },
    })
  }

  const failure = (response) => {
    console.log(response);
  }

  const success = (response) => {
    const email = response?.profileObj?.email
    if (email) {
      auth(email)
    }
  }

  return (
    <GoogleLogin
      clientId={process.env.REACT_APP_GOOGLE_ID}
      render={renderProps => (
        <SoundButton
        type="primary"
        size={ButtonSize.MIDDLE}
        onClick={renderProps.onClick}
        className={styles.button}
      >
        <GoogleSmallIcon />
        {useText && (
          <span>Войти через Google+</span>
        )}
      </SoundButton>
      )}
      buttonText="Login"
      onSuccess={success}
      onFailure={failure}
      cookiePolicy={'single_host_origin'}
  />
  )
}

export default GoogleAuthBtn