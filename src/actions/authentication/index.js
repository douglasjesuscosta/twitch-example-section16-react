
import { SIGN_IN_REQUEST, SIGN_OUT_REQUEST, LOGIN_ERROR, CHANGE_AUTH } from './types'

export const sign_in_request = () => ({ type: SIGN_IN_REQUEST});

export const sign_out_request = () => ({ type: SIGN_OUT_REQUEST });

export const login_error = () => ({ type: LOGIN_ERROR });

export const change_auth = (isAuthenticated, userId) => ({
  type: CHANGE_AUTH,
  data: {
    isAuthenticated,
    userId
  }
});

export const verify_authentication = () => dispatch => {
  window.gapi.load("client:auth2", () => {
    window.gapi.client
      .init({
        clientId:
          "KEY",
        scope: "email"
      })
      .then(() => {
        let auth = window.gapi.auth2.getAuthInstance();
        
        let isAuthenticated = auth.isSignedIn.get();
        let userId = isAuthenticated ? auth.currentUser.get().getId() : '';

        dispatch(change_auth(isAuthenticated, userId));

        auth.isSignedIn.listen(() => {

          isAuthenticated = auth.isSignedIn.get()
          userId = isAuthenticated ? auth.currentUser.get().getId() : '';

          dispatch(change_auth(isAuthenticated, userId));
        });
      });
  });
};

export const try_to_sign_in = () => dispatch => {
  let auth = window.gapi.auth2.getAuthInstance();
  auth.signIn();

  dispatch(sign_in_request());

  auth.isSignedIn.listen(() => {

    let isAuthenticated = auth.isSignedIn.get()
    let userId = isAuthenticated ? auth.currentUser.get().getId() : '';

    dispatch(change_auth(isAuthenticated, userId));
  });
};

export const try_to_sign_out = () => dispatch => {
  let auth = window.gapi.auth2.getAuthInstance();
  auth.signOut();

  dispatch(sign_out_request());

  auth.isSignedIn.listen(() => {

    let isAuthenticated = auth.isSignedIn.get();
    let userId = isAuthenticated ? auth.currentUser.get().getId() : '';

    dispatch(change_auth(isAuthenticated, userId));
  });
};
